import React, {useEffect, useState} from "react";
import DashboardRouter from "../components/DashboardRouter";
import DarkModeLogo from '../assets/dark-mode-logo.jpg'

const Questionnaire = () => {
  // Create state to track index, we will use this to move through our questions array
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Store answers from client
  const [answers, setAnswers] = useState([]);

  useEffect(()=> {
    if(currentQuestion == questions.length){
      async function fetchData(){
        try {
          const response = await fetch('http://localhost:2121/dashboard/questionnaire', {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({type: answers[0], sport: answers[1], league: answers[2], preference: answers[3]})
          })
        } catch (error) {
          console.log(error)
        }
      } 
      fetchData()
    }
  }, [currentQuestion])

  const questions = [
    {
      text: "Are you a coach or parent?",
      options: ["Coach", "Parent"],
    },
    {
      text: "What sport would you like to add?",
      options: [
        "Hockey",
        "Baseball", 
        "Softball", 
        "Football", 
        "Soccer", 
        "Lacrosse", 
        "Volleyball",
        "Bowling",
        "Basketball"
      ],
    },
    {
      text: "Select your team type.",
      options: [
        "Travel",
        "Rec/Local",
        "School"
      ]
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
    return <DashboardRouter />
  }

  // Grab current question, this is updated every time we select an answer, onClick
  const current = questions[currentQuestion];

  return (
    <div className="main-dark-container questionnaire-container">
      <div className="dark-mode-logo-container">
        <img id='dark-mode-logo' src={DarkModeLogo} alt='dark mode logo'/>
      </div>
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