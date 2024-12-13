import { useParams, useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuizzesControls from "./QuizControls";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import { quizzes as quizzesData } from "../../Database";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { BsRocket } from "react-icons/bs";
import axios from "axios";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState("");
  const [activeContextMenu, setActiveContextMenu] = useState<string | null>(
    null
  );
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes) || [];
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const isStudent = currentUser?.role === "STUDENT";  // Check if user is a student

    const fetchQuizzes = async () => {
      try {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };


  useEffect(() => {
    fetchQuizzes();
  }, [cid, dispatch]);



  const isFaculty = currentUser?.role === "FACULTY";

  const handleEditQuiz = (quizId: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}`);
  };

  const handleAddQuizClick = async () => {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  };

  const handleTogglePublish = (quiz: any) => {
    const updatedQuiz = {
      ...quiz,
      status: quiz.status === "Published" ? "Draft" : "Published",
    };
    dispatch(updateQuiz(updatedQuiz));
  };

  const toggleContextMenu = (quizId: string) => {
    setActiveContextMenu(activeContextMenu === quizId ? null : quizId);
  };

  // Handle navigation to the Quiz Preview screen (for students)
  const handleTakeQuiz = (quizId: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/preview`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Search for Quiz"
          className="form-control w-25"
        />
        {isFaculty && (
          <button className="btn btn-danger" onClick={handleAddQuizClick}>
            + New Quiz
          </button>
        )}
      </div>

      <ul className="list-group rounded-0">
        <li className="list-group-item p-0">
          <div
            className="p-3 bg-light d-flex justify-content-between align-items-center"
            style={{ borderLeft: "5px solid #00a651" }}
          >
            <div className="d-flex align-items-center">
              <h5 className="mb-0">Assignment Quizzes</h5>
            </div>
          </div>

          <ul className="list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li
                key={quiz._id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{ borderLeft: "5px solid #00a651" }}
              >
                <div className="d-flex align-items-center">
                  <BsRocket className="me-3 fs-5 text-success" />
                  <div>
                    <h6
                      className="mb-1 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/Kanbas/Courses/${cid}/QuizDetails/${quiz._id}`
                        )
                      }
                      style={{ textDecoration: "underline", color: "blue" }}
                    >
                      {quiz.name}
                    </h6>

                    <small className="text-muted">
                      {quiz.status} | Due {quiz.dueDate} | {quiz.points} pts |{" "}
                      {quiz.questions} Questions
                    </small>
                  </div>
                                                  {/* Conditionally render "Take Quiz" button for students */}
                  {/* this should be included but doesnt work && quiz.status === "Published" */}
                  {isStudent && (
                  <button
                    className="btn btn-primary ms-3"
                    onClick={() => handleTakeQuiz(quiz._id)}
                  >
                    Take Quiz
                  </button>
                )}

                </div>

                {isFaculty && (
                <div className="d-flex align-items-center position-relative">
                  <FaCheckCircle className="text-success me-3 fs-5" />
                  <div className="dropdown">
                    <IoEllipsisVertical
                      className="fs-5 cursor-pointer"
                      id={`dropdownMenuButton-${quiz._id}`}
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby={`dropdownMenuButton-${quiz._id}`}
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleEditQuiz(quiz._id)}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleTogglePublish(quiz)}
                        >
                          {quiz.status === "Published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => handleDeleteQuiz(quiz._id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}