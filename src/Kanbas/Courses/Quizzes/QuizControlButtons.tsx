import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControlButtons({
  quizId,
  deleteQuiz,
  editQuiz,
}: {
  quizId: string;
  deleteQuiz: (quizId: string) => void;
  editQuiz: (quizId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        onClick={() => editQuiz(quizId)}
        className="text-primary me-3"
      />
      <FaTrash
        onClick={() => deleteQuiz(quizId)}
        className="text-danger me-2"
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}