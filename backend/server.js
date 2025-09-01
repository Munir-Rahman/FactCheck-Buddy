import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import nodemailer from "nodemailer"; // make sure this is imported at top
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(express.json());

// OpenAI setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// ================== Chatbot Route ==================
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ reply: "Message is required." });

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are FactCheck Buddy, provide accurate verified information." },
        { role: "user", content: message },
      ],
      max_tokens: 200,
    });

    const reply = completion.data.choices[0].message?.content || "I don't know the answer.";
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.json({ reply: "❌ Something went wrong. Try again later." });
  }
});

// Load local fact-checked claims dataset (JSON file)
const DATA_FILE = path.join(__dirname, "factchecked.json");
let factCheckedClaims = [];

// Load dataset at startup
if (fs.existsSync(DATA_FILE)) {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  factCheckedClaims = JSON.parse(raw);
  console.log(`✅ Loaded ${factCheckedClaims.length} fact-checked claims`);
} else {
  console.log("⚠️ factchecked.json not found. Please add some claims.");
}

// API: Check claim against local dataset
app.post("/api/check-claim", (req, res) => {
  const { claim } = req.body;

  if (!claim || claim.trim() === "") {
    return res.status(400).json({ error: "Claim text is required" });
  }

  // Search local dataset
  const match = factCheckedClaims.find(c =>
    c.text.toLowerCase().includes(claim.toLowerCase())
  );

  if (match) {
    return res.json({
      verdict: match.verdict,         // true / false / unverified
      confidence: match.confidence,   // e.g., 0.85
      description: match.description,
      sources: match.sources
    });
  }

  // If not found in dataset, return "not found"
  return res.json({ verdict: "unverified", description: "Claim not found in database.", sources: [] });
});

// 🔑 NYT API Key
const NYT_API_KEY = process.env.NYT_API_KEY;

// 📰 Route: /news/:section
app.get("/news/:section", async (req, res) => {
  try {
    const section = req.params.section || "home"; // Default section = home
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${NYT_API_KEY}`;

    const response = await axios.get(url);

    // Format articles (only first 20)
    const articles = response.data.results.slice(0, 20).map((item) => ({
      title: item.title,
      publishedAt: item.published_date,
      description: item.abstract,
      url: item.url,
      source: "New York Times",
      image:
        item.multimedia && item.multimedia.length > 0
          ? item.multimedia[0].url
          : null,
    }));

    res.json(articles);
  } catch (error) {
    console.error("❌ Error fetching news:", error.message);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// ================== CONTACT FORM ROUTE ==================

app.post("/send-contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({ success: false, error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password, no spaces
      },
    });

    const mailOptions = {
      from: `"FactCheck Buddy Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `📩 New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    // 🔹 Send email with callback to catch detailed error
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Nodemailer Error Details:", err); // 👈 This will show exact reason
        return res.json({ success: false, error: err.message });
      } else {
        console.log("✅ Email sent:", info.response);
        return res.json({ success: true });
      }
    });
  } catch (err) {
    console.error("❌ Server Exception:", err);
    res.json({ success: false, error: err.message });
  }
});

// ================== FEEDBACK FORM ==================
app.post("/send-feedback", async (req, res) => {
  const { rating, feedbackText, email } = req.body;

  if (!rating || !feedbackText || !email) {
    return res.json({ success: false, error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: `"FactCheck Buddy Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      subject: `⭐ New Feedback Received`,
      text: `Rating: ${rating}/5\nEmail: ${email}\nFeedback:\n${feedbackText}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Nodemailer Error:", err);
        return res.json({ success: false, error: err.message });
      } else {
        console.log("✅ Feedback Email sent:", info.response);
        return res.json({ success: true });
      }
    });
  } catch (err) {
    console.error("❌ Server Exception:", err);
    res.json({ success: false, error: err.message });
  }
});



// Root check
app.get("/", (req, res) => {
  res.send("✅ NYT FactCheck-Buddy Backend is running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
