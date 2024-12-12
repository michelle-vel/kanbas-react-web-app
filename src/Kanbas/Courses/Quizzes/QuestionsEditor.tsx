import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MultipleChoiceEditor from "./QuestionsEditors/MultipleChoiceEditor";
import TrueFalseEditor from "./QuestionsEditors/TrueFalseEditor";
import LongAnswerEditor from "./QuestionsEditors/LongAnswerEditor";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import questionsData from "../../Database/questions.json";
import * as questionsClient from "./QuestionsEditors/client"
import * as quizzesClient from "../Quizzes/client";

export default function QuestionsEditor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<string>("Multiple Choice");
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<any | null>(null);
  const { qid, cid } = useParams();
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSaveQuestion = async (newQuestion: any) => {
    try {
      if (editingQuestion) {
        const updatedQuestion = await questionsClient.updateQuestion({
          ...editingQuestion,
          ...newQuestion,
        });
        setQuestions(
          questions.map((q) =>
            q._id === editingQuestion._id ? updatedQuestion : q
          )
        );
      } else {
        const createdQuestion = await quizzesClient.createQuestionForQuiz(qid as string, newQuestion);
        console.log('Created Question:', createdQuestion);
        setQuestions([...questions, createdQuestion]);
      }
      setIsModalOpen(false);
      setEditingQuestion(null);
    } catch (error) {
      console.error("Failed to save question:", error);
    }
  };


  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
    setSelectedQuestionType(question.type);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = async (_id: string) => {
    try {
      await questionsClient.deleteQuestion(_id);
      setQuestions(questions.filter((q) => q._id !== _id));
    } catch (error) {
      console.error("Failed to delete question:", error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
      setQuestions(questions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };


  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  const handleBackClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3>Questions Editor</h3>
          <button
            className="btn btn-outline-secondary mt-2"
            onClick={handleBackClick}
          >
            Back to Quiz Details
          </button>
        </div>
        <div className="d-flex align-items-center">
          <select
            className="form-select me-2"
            style={{ width: "200px" }}
            value={selectedQuestionType}
            onChange={(e) => setSelectedQuestionType(e.target.value)}
          >
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="True/False">True/False</option>
            <option value="Long Answer">Long Answer</option>
          </select>
          <button className="btn btn-primary" onClick={handleOpenModal}>
            + New Question
          </button>
        </div>
      </div>
      <ul className="list-group">
        {questions.map((question) => (
          <li
            key={question._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{question.title}</h5>
              <p>{question.question}</p>
              <p>
                <strong>Points:</strong> {question.points}
              </p>
              <p>
                <strong>Type:</strong> {question.type}
              </p>
            </div>
            <div>
              <FaPencilAlt
                className="text-primary me-3 cursor-pointer"
                onClick={() => handleEditQuestion(question)}
              />
              <FaTrash
                className="text-danger cursor-pointer"
                onClick={() => handleDeleteQuestion(question._id)}
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Modals */}
      {isModalOpen && selectedQuestionType === "Multiple Choice" && (
        <MultipleChoiceEditor
          onSave={(newQuestion: any) =>
            handleSaveQuestion({ ...newQuestion, quizId: qid })
          }
          onCancel={handleCloseModal}
          initialData={editingQuestion}
        />
      )}
      {isModalOpen && selectedQuestionType === "True/False" && (
        <TrueFalseEditor
          onSave={(newQuestion: any) =>
            handleSaveQuestion({ ...newQuestion, quizId: qid })
          }
          onCancel={handleCloseModal}
          initialData={editingQuestion}
        />
      )}
      {isModalOpen && selectedQuestionType === "Long Answer" && (
        <LongAnswerEditor
          onSave={(newQuestion: any) =>
            handleSaveQuestion({ ...newQuestion, quizId: qid })
          }
          onCancel={handleCloseModal}
          initialData={editingQuestion}
        />
      )}
    </div>
  );
}