import React, { useState } from 'react';
import {Howler, Howl} from "howler"

const Quiz = ({ question, options, correctAnswer, onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerState, setAnswerState] = useState(null);

  var wrong = new Howl({
    src: ["/src/assets/sounds/wronganswer.mp3"],
    html: true
  });

  var correct = new Howl({
    src: ["/src/assets/sounds/correctanswer.mp3"],
    html: true
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === correctAnswer) {
      setAnswerState('correct');
      correct.play();
    } else {
      setAnswerState('incorrect');
      wrong.play();
    }
  };



  return (
    <div className="fixed inset-0 bg-blue-900 bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-700">
          {question}
        </h2>
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`w-full py-2 px-4 rounded-md text-white transition-colors duration-300 ${
                selectedOption === option
                  ? answerState === 'correct'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : 'bg-teal-500 hover:bg-teal-600'
              }`}
              disabled={selectedOption}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Quiz;
