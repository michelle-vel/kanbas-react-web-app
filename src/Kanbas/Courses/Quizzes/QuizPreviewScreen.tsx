import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as quizzesClient from "../Quizzes/client"; // Ensure correct path
import { useSelector } from "react-redux";
import * as answersClient from "./answersClient"; // Ensure correct path

export default function QuizPreviewScreen() {
  const [questions, setQuestions] = useState<any[]>([]); // Store questions fetched from the API
  const [answers, setAnswers] = useState<any>({}); // Store user's answers
  const { qid, cid } = useParams(); // Fetch quiz and course IDs from URL params
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Fetch the quiz questions for the given quiz ID
  const fetchQuestions = async () => {
    try {
      const questionsData = await quizzesClient.findQuestionsForQuiz(qid as string);
      setQuestions(questionsData);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]); // Refetch questions if the quiz ID changes

  const handleBackClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`); // Navigate back to quiz details
  };

  // Handle input changes for answers (radio buttons or text areas)
  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    try {
      let totalScore = 0;
      const currAnswers = Object.entries(answers).map(([questionId, answer]) => {
        // Find the question by ID
        const question = questions.find((q) => q._id === questionId);
  
        // Initialize the score for this answer
        let points = question?.points || 0;
  
        // Check if it's not a long answer and if the answer is correct
        if (question?.type !== "Long Answer" && answer === question.correctChoice) {
          totalScore += points; // Add points to total score if correct
        }
  
        // Return the answer object to be sent to the backend
        return {
          question: questionId,
          quiz: qid,
          user: currentUser._id,
          answer,
          points,
        };
      });
  
      // Send answers to the server
      await answersClient.createAnswers(currAnswers);
      
      alert(`Answers submitted successfully! Your total score is: ${totalScore}`);
      
      // Navigate to quiz page
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Failed to submit answers:", error);
      alert("Failed to submit answers.");
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Quiz</h3>
          {currentUser.role === "FACULTY" && (

          <button
            className="btn btn-outline-secondary mt-2"
            onClick={handleBackClick}
          >
            Back to Quiz Details
          </button>
          )}
        </div>
      </div>

      {/* Display questions */}
      <div className="quiz-questions">
        {questions.length === 0 ? (
          <p>Loading questions...</p> // Show loading text while fetching questions
        ) : (
          questions.map((question) => (
            <div key={question._id} className="question-card mb-4 p-3 border rounded">
              <h5>{question.title}</h5>
              <p><strong>Question:</strong> {question.question}</p>
              <p><strong>Points:</strong> {question.points}</p>

              {question.type === "Multiple Choice" && (
                <div className="options">
                  <div className="form-check">
                    {question.choices?.map((choice: string, index: number) => (
                      <div key={index} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${question._id}`}
                          id={`option-${question._id}-${index}`}
                          checked={answers[question._id] === choice}
                          onChange={() => handleAnswerChange(question._id, choice)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`option-${question._id}-${index}`}
                        >
                          {choice}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {question.type === "True/False" && (
                <div className="options">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question._id}`}
                      id={`option-true-${question._id}`}
                      checked={answers[question._id] === "True"}
                      onChange={() => handleAnswerChange(question._id, "True")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option-true-${question._id}`}
                    >
                      True
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question._id}`}
                      id={`option-false-${question._id}`}
                      checked={answers[question._id] === "False"}
                      onChange={() => handleAnswerChange(question._id, "False")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`option-false-${question._id}`}
                    >
                      False
                    </label>
                  </div>
                </div>
              )}

              {question.type === "Long Answer" && (
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Write your answer here..."
                    value={answers[question._id] || ""}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Submit Button */}
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
