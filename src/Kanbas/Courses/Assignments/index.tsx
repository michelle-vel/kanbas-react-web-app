import { AiOutlineFileText, AiOutlinePlus } from "react-icons/ai";
import { BsGripVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import "./styles.css"
import { useNavigate, useParams } from "react-router";
import * as db from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import AssignmentEditor from "./Editor";
import { FaTrash } from "react-icons/fa";
import {
  addAssignment as addAssignmentAction,
  deleteAssignment as deleteAssignmentAction, setAssignments,
} from "./reducer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as assignmentsClient from "./client";
import * as coursesClient from "../client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleAddAssignmentClick = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments/new`);
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid, dispatch]);



  return (
    <div id="wd-assignments">
      {/* Search and Action Buttons */}
      <div className="d-flex justify-content-between mb-3">
        <div className="input-group w-50">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="wd-search-assignment form-control"
            placeholder="Search..."
          />
        <div>
          <button className="wd-add-assignment-group btn btn-outline-secondary me-2">
            <AiOutlinePlus /> Group
          </button>
          <button className="wd-add-assignment btn btn-danger">
            <AiOutlinePlus /> Assignment
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <ul className="wd-assignment-list list-group rounded-0">
            <li className="list-group-item p-3 mb-5 border-gray">
              <div className="d-flex justify-content-between align-items-center bg-secondary p-3">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <span className="fw-bold">ASSIGNMENTS</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-light text-dark rounded-pill mx-2 px-3">
                    40% of Total
                  </span>
                  <IoEllipsisVertical className="fs-4" />
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
        </div>
    );
  }