import { type RouteConfig, index, route } from "@react-router/dev/routes";
import type { Route } from "./+types/root";

export function meta() {
  return [
    { title: "FactCheck-Buddy" },
    { name: "description", content: "Welcome to FactCheck Buddy" },
  ];
}

export default [
    index("routes/home/index.tsx"),
    route('about','./routes/About/index.tsx'),
    route('news','./routes/Breaking-News/index.tsx'),
    route('Dashboard','./routes/Dashboard/index.tsx'),
    route('Chatbot','./routes/Chatbot/index.tsx'),
    route('claim','./routes/claim/index.tsx'),
    route('Contact','./routes/Contact/index.tsx'),
    route('feedback','./routes/FeedBack/index.tsx'),
    route('image-checker','./routes/Image-Checker/index.tsx'),
    route('Textclaim','./routes/Claim-Text/index.tsx'),
    route('exam','./routes/Exam/index.tsx'),
    route('image-exam','./routes/Image-Exam/index.tsx'),
    route('lessons','./routes/Lessons/index.tsx'),
    route('news-exam','./routes/News-Exam/index.tsx'),
    route('Facknewslessons','./routes/Lessons/Facknewslessons.tsx'),
    route('DeepFackImageslessons','./routes/Lessons/DeepFackImages-lessons.tsx'),
    route('NewsEasylesson','./routes/News-lessons/Easylesson.tsx'),
    route('NewsMidlesson', './routes/News-lessons/Midumlesson.tsx'),
    route('NewsHardlesson', './routes/News-lessons/Hardlesson.tsx'),
    route('EasyImage','./routes/Image-lessons/EasyImage.tsx'),
    route('MidImage', './routes/Image-lessons/MidumImage.tsx'),
    route('HardImage', './routes/Image-lessons/HardImage.tsx'),
    route('EasyImageExam','./routes/Image-Exam/EasyImage-Exam.tsx'),
    route('MidImageExam', './routes/Image-Exam/MidImage-Exam.tsx'),
    route('HardImageExam', './routes/Image-Exam/HardImage-Exam.tsx'),
    route('EasyNewsExam','./routes/News-Exam/EasyNews-Exam.tsx'),
    route('MidNewsExam', './routes/News-Exam/MidNews-Exam.tsx'),
    route('HardNewsExam', './routes/News-Exam/HardNews-Exam.tsx'),
    route('howtouse','./routes/Howtouse/index.tsx'),
    route('Game','./routes/Game/Game.tsx'),
    route('SplashScreen ','./component/SplashScreen.tsx'),
] satisfies RouteConfig;
