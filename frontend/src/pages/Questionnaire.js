import React, {useState} from "react";
import Dashboard from "./Dashboard";
import DarkModeLogo from '../assets/dark-mode-logo.jpg'

const Questionnaire = () => {
  // Create state to track index, we will use this to move through our questions array
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Store answers from client
  const [answers, setAnswers] = useState([]);
  console.log(answers)

  const questions = [
    {
      text: "Are you a coach or parent?",
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
    {
      text: "Do you prefer dark mode or light mode? Don't worry, you can change this later.",
      options: ["Dark", "Light"]
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
    <div className="main-dark-container questionnaire-container">
      <img class='dark-mode-logo' src={DarkModeLogo} alt='dark mode logp'/>
      <h3 className="questionnaire-heading">Ready to get started?</h3>
      <span className="question-tracker">Question {currentQuestion+1}/{questions.length}</span>
        <div className="dark-inner-container question-container">
          <p className="question">{current.text}</p>
          {current.options.map((option) => (
            <>
              <button onClick={() => handleAnswer(option)}>{option}</button>
            </>
          ))}
        </div>
    </div>
  );
};


export default Questionnaire