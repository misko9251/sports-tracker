import React, {useState} from "react";
import Dashboard from "./Dashboard";

const Questionnaire = () => {
  // Create state to track index, we will use this to move through our questions array
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Store answers from client
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      text: "Welcome! Are you a coach or parent?",
      options: ["Coach", "Parent"],
    },
    {
      text: "What sport would you like to add?",
      options: [
        "Baseball", 
        "Softball", 
        "Football", 
        "Soccer", 
        "Lacrosse", 
        "Volleyball",
        "Bowling"
      ],
    },
  ];

  // When btn is clicked, pass answer as param so we can update our answers array
  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    // Add + 1 to current question state
    setCurrentQuestion(currentQuestion + 1);
  };

  // If no more questions remain, load the Dashboard
  if (currentQuestion === questions.length) {
    return <Dashboard />;
  }

  // Grab current question, this is updated every time we select an answer, onClick
  const current = questions[currentQuestion];

  return (
    <div>

      <p>{current.text}</p>
      {current.options.map((option) => (
        <>
          <button onClick={() => handleAnswer(option)}>{option}</button>
        </>
      ))}
      
    </div>
  );
};

export default Questionnaire