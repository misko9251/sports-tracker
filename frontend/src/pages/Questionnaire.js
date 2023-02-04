import React from 'react'

function Questionnaire() {
  return (
    <div>Questionnaire</div>
  )
}

export default Questionnaire

// import React, { useState } from "react";
// import Dashboard from "./Dashboard";

// const Questionnaire = () => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState([]);

//   const questions = [
//     {
//       text: "Are you a coach or parent?",
//       options: ["Coach", "Parent"],
//     },
//     {
//       text: "What sport would you like to add?",
//       options: ["Basketball", "Soccer", "Baseball", "Other"],
//     },
//   ];

//   const handleAnswer = (answer) => {
//     setAnswers([...answers, answer]);
//     setCurrentQuestion(currentQuestion + 1);
//   };

//   if (currentQuestion === questions.length) {
//     return <Dashboard />;
//   }

//   const current = questions[currentQuestion];

//   return (
//     <div>
//       <p>{current.text}</p>
//       {current.options.map((option) => (
//         <button onClick={() => handleAnswer(option)}>{option}</button>
//       ))}
//     </div>
//   );
// };