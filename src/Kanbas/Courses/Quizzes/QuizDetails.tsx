import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();

  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const currentUser = useSelector(
    (state: any) => state.accountReducer.currentUser
  );

  const quiz = quizzes.find((q: any) => q._id === qid);

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  const isFaculty = currentUser?.role === "FACULTY";

  const handleEditClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const handlePreviewClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleBackClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button className="btn btn-outline-secondary" onClick={handleBackClick}>
          Back to Quizzes
        </button>
        <h3>{quiz.name}</h3>
        {isFaculty && (
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={handlePreviewClick}
            >
              Preview
            </button>
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="card p-4">
        <h5 className="mb-3">Quiz Properties</h5>
        <table className="table">
          <tbody>
            <tr>
              <th>Quiz Type</th>
              <td>{quiz.type || "Graded Quiz"}</td>
            </tr>
            <tr>
              <th>Points</th>
              <td>{quiz.points || 0}</td>
            </tr>
            <tr>
              <th>Assignment Group</th>
              <td>{quiz.assignmentGroup || "Quizzes"}</td>
            </tr>
            <tr>
              <th>Shuffle Answers</th>
              <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Time Limit</th>
              <td>{quiz.timeLimit || "20 Minutes"}</td>
            </tr>
            <tr>
              <th>Multiple Attempts</th>
              <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Show Correct Answers</th>
              <td>{quiz.showCorrectAnswers || "Immediately"}</td>
            </tr>
            <tr>
              <th>Access Code</th>
              <td>{quiz.accessCode || "None"}</td>
            </tr>
            <tr>
              <th>One Question at a Time</th>
              <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Webcam Required</th>
              <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Lock Questions After Answering</th>
              <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th>Due Date</th>
              <td>{quiz.dueDate || "Not Set"}</td>
            </tr>
            <tr>
              <th>Available From</th>
              <td>{quiz.availableFromDate || "Not Set"}</td>
            </tr>
            <tr>
              <th>Until Date</th>
              <td>{quiz.availableUntilDate || "Not Set"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}