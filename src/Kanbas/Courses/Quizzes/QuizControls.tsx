// @ts-nocheck

import { FaPlus } from "react-icons/fa6";
import QuizEditor from "./QuizEditor";

export default function QuizzesControls({
  quizTitle,
  setQuizTitle,
}: {
  quizTitle: string;
  setQuizTitle: (title: string) => void;
}) {
  return (
    <div id="wd-quizzes-controls" className="text-nowrap">
      <button
        id="wd-add-quiz-btn"
        className="btn btn-lg btn-danger me-1"
        data-bs-toggle="modal"
        data-bs-target="#wd-add-quiz-dialog"
      >
        <FaPlus className="me-2" />
        Quiz
      </button>
      <QuizEditor
        dialogTitle="Add Quiz"
        quizTitle={quizTitle}
        setQuizTitle={setQuizTitle}
      />
    </div>
  );
}