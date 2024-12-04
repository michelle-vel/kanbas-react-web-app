import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import {
  deleteAssignment as deleteAssignmentAction,
  setAssignments,
} from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import SearchBar from "./SearchBar";
import AssignmentButtons from "./AssignmentButtons";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);

  const assignments =
    useSelector((state: any) => state.assignmentsReducer.assignments) || [];
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchAssignments = async () => {
    try {
      const assignments = await coursesClient.findAssignmentsForCourse(
        cid as string
      );
      dispatch(setAssignments(assignments));
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const removeAssignment = async (assignmentId: string) => {
    try {
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignmentAction(assignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleDeleteClick = (assignment: any) => {
    setAssignmentToDelete(assignment);
    setShowDialog(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      removeAssignment(assignmentToDelete._id);
    }
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setAssignmentToDelete(null);
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid, dispatch]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group w-50">
          <SearchBar />
        </div>

        {currentUser.role === "FACULTY" && (
          <div className="d-flex">
            <AssignmentButtons />
          </div>
        )}
      </div>

      <ul className="list-group rounded-0" id="wd-modules">
        <li
          className="list-group-item p-0"
          style={{ borderLeft: "5px solid #00a651" }}
        >
          <div className="wd-title p-3 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoMdArrowDropdown className="me-2" />
              <h3 id="wd-assignments-title">ASSIGNMENTS</h3>
            </div>
            <div
              id="wd-assignments-title"
              className="d-flex align-items-center p-2"
            >
              <span className="badge bg-light text-dark me-2">
                {assignments.length} Assignments
              </span>
              <IoEllipsisVertical />
            </div>
          </div>

          <ul className="wd-assignment-list list-group rounded-0">
            {assignments.map((assignment: any) => (
              <li
                key={assignment._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link
                  to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                >
                  {assignment.title}
                </Link>
                {currentUser.role === "FACULTY" && (
                  <FaTrash
                    className="text-danger cursor-pointer"
                    onClick={() => handleDeleteClick(assignment)}
                  />
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>

      {showDialog && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this assignment?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}