import React from 'react';

const projectInfo = [
  {
    title: "What is FactCheck Buddy?",
    content: `FactCheck Buddy is an AI-powered platform designed to promote media literacy and combat misinformation, fake news, and deepfakes. 
    It helps users verify claims, analyze news, and detect misleading content using advanced AI tools. 
    This project aims to educate and empower youth to critically evaluate online information, aligning with UNESCO's Media Literacy objectives.`
  },
  {
    title: "Our Mission",
    content: `Our mission is to strengthen media literacy among young people and provide tools to verify news, detect fake images/videos, and understand credible sources. 
    FactCheck Buddy aims to reduce the spread of misinformation and foster critical thinking.`
  },
  {
    title: "Why Choose FactCheck Buddy?",
    content: `FactCheck Buddy combines user-friendly interfaces, AI-powered verification tools, and educational lessons to help users discern real information from fake. 
    It also provides quizzes and lessons to train users in fact-checking skills, making media literacy practical and engaging.`
  }
];

const teamMembers = [
  {
    name: "Munir Rahman Rahmani",
    role: "Team Leader – Full-Stack Web Developer and Database Developer, High School Graduate Student",
    img: "./Munir_Rahman.jpg",
    description: `Munir Rahman Rahmani is the founder and team leader of FactCheck Buddy, an AI-powered platform promoting media literacy and combating misinformation. 
He leads the project’s development and design, specializing in full-stack web development, database management, and AI integration to create practical tools for verifying news and educational content. 
Munir is committed to using technology to empower youth with critical thinking and media literacy skills.`
  },
  {
    name: "Zabihullah",
    role: "Content Contributor - Computer Science 2nd Year Student at Benawa University",
    img: "./zabih.jpg",
    description: `Provided key lessons and insights on fake news, helping shape the educational content of the FactCheck Buddy project.`
  },
  {
    name: "Khalil Rahman",
    role: "Multimedia Contributor - Engineering 3rd Year Student at Kandahar University",
    img: "./Khalil.png",
    description: `Created videos and recorded presentations for the FactCheck Buddy project, helping to visually communicate the project’s features and lessons.`
  }
];

export default function About() {
  return (
    <div className="flex flex-col items-center w-full p-6 bg-white text-gray-700">

      {/* Page Title */}
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-600">
        About FactCheck Buddy
      </h2>

      {/* Project Info Section */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-7xl mb-14">
        {projectInfo.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-gray-50 p-8 rounded-2xl shadow-md border hover:shadow-xl transition duration-300"
          >
            <h3 className="text-xl font-bold text-blue-600 mb-4 border-b pb-2">{item.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{item.content}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <h2 className="text-3xl font-extrabold text-center mb-10 text-green-600">
        Meet Our Team
      </h2>

      <div className="grid md:grid-cols-3 gap-10 w-full max-w-7xl">
        {teamMembers.map((member, idx) => (
          <div 
            key={idx} 
            className="bg-gray-50 rounded-2xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col"
          >
            <div className="w-full h-64 aspect-w-4 aspect-h-3 overflow-hidden rounded-t-2xl">
              <img src={member.img} alt={member.name} className="w-full h-full object-cover object-center"/>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-blue-600">{member.name}</h3>
              <p className="text-green-600 font-medium mb-4">{member.role}</p>
              <p className="text-gray-600 text-base leading-relaxed">{member.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-gray-500 text-sm text-center max-w-2xl">
        &copy; 2025 <span className="font-semibold text-blue-600">FactCheck Buddy</span>. 
        All rights reserved. This project is part of the <span className="font-semibold text-green-600">UNESCO Youth Hackathon for Media Literacy</span>.
      </div>
    </div>
  );
}
