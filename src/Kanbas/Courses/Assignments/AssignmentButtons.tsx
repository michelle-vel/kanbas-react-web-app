import { FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentButtons() {
  const navigate = useNavigate();
  const { cid } = useParams();

  const handleAddClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

  return (
    <div id="wd-assignment-buttons" className="text-nowrap">
      <button
        id="wd-assignment"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={handleAddClick}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-assignment-group"
          className="btn btn-lg btn-secondary"
          type="button"
        >
          <FaPlus />
          Group
        </button>
      </div>
    </div>
  );
}