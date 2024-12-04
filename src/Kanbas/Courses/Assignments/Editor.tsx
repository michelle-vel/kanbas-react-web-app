import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment as addAssignmentAction,
  updateAssignment as updateAssignmentAction,
  setAssignments,
} from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments =
    useSelector((state: any) => state.assignmentsReducer.assignments) || [];

  const assignment = assignments.find(
    (assignment: any) => assignment._id === aid
  );

  const [title, setTitle] = useState(
    assignment ? assignment.title : ""
  );
  const [description, setDescription] = useState(
    assignment ? assignment.description : ""
  );
  const [points, setPoints] = useState(
    assignment ? assignment.points : 0
  );
  const [dueDate, setDueDate] = useState(
    assignment ? assignment.dueDate : ""
  );
  const [availableFrom, setAvailableFrom] = useState(
    assignment ? assignment.availableFromDate : ""
  );
  const [availableUntil, setAvailableUntil] = useState(
    assignment ? assignment.availableUntilDate : ""
  );

  const [group, setGroup] = useState(
    assignment ? assignment.group : "ASSIGNMENTS"
  );

  const [displayGradeAs, setDisplayGradeAs] = useState(
    assignment ? assignment.displayGradeAs : "percentage"
  );

  const [submissionType, setSubmissionType] = useState(
    assignment ? assignment.submissionType : "online"
  );

  const [assignTo, setAssignTo] = useState(
    assignment ? assignment.assignTo : "Everyone"
  );





  const isNewAssignment = !assignment;

  const handleSave = async () => {
    const updatedAssignment = {
      _id: aid || new Date().getTime().toString(),
      title,
      description,
      points,
      dueDate,
      group,
      displayGradeAs,
      submissionType,
      assignTo,
      availableFromDate: availableFrom,
      availableUntilDate: availableUntil,
      course: cid,
    };

    try {
      if (isNewAssignment) {
        const createdAssignment =
          await assignmentsClient.createAssignmentForCourse(
            cid!,
            updatedAssignment
          );
        dispatch(addAssignmentAction(createdAssignment));
      } else {
        const updated = await assignmentsClient.updateAssignment(
          updatedAssignment
        );
        dispatch(updateAssignmentAction(updated));
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };



  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <form>

      <h6 className="fw-bold">Assignment Name</h6>
      <input
        id="wd-name"
        value={title}
        className="form-control mb-3"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        id="wd-description"
        className="form-control mb-4"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Points Row */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col-md-6">
          <input
            id="wd-points"
            type="number"
            value={points}
            className="form-control"
            onChange={(e) => setPoints(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Assignment Group Row */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-group" className="form-label">
            Assignment Group
          </label>
        </div>
        <div className="col-md-6 position-relative">
          <select id="wd-group" className="form-control" value={group} disabled>
            <option value="assignments">ASSIGNMENTS</option>
          </select>
        </div>
      </div>

      {/* Display Grade as Row */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-display-grade-as" className="form-label">
            Display Grade as
          </label>
        </div>
        <div className="col-md-6 position-relative">
          <select
            id="wd-display-grade-as"
            className="form-control"
            value={displayGradeAs}
            disabled
          >
            <option value="percentage">Percentage</option>
          </select>
        </div>
      </div>

      {/* Submission Type Row */}
      <div className="row mb-3 align-items-top">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-submission-type" className="form-label">
            Submission Type
          </label>
        </div>
        <div className="col-md-6">
          <select
            id="wd-submission-type"
            className="form-control"
            value={submissionType}
            disabled
          >
            <option value="online">Online</option>
          </select>
        </div>
      </div>

      {/* Assign Row */}
      <div className="row mb-3 align-items-top">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-assign-to" className="form-label">
            Assign To
          </label>
        </div>
        <div className="col-md-6">
          <input
            id="wd-assign-to"
            value={assignTo}
            className="form-control"
            readOnly
          />
        </div>
      </div>

      {/* Due Date Row */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-due-date" className="form-label">
            Due Date
          </label>
        </div>
        <div className="col-md-6">
          <input
            type="date"
            id="wd-due-date"
            value={dueDate}
            className="form-control"
            onChange={(e) => setDueDate(e.target.value)}
            />
        </div>
      </div>

      {/* Available From & Until Row */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-5">
          <label htmlFor="wd-available-from" className="form-label">
            Available From
          </label>
          <input
            type="date"
            id="wd-available-from"
            value={availableFrom}
            className="form-control"
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="wd-available-until" className="form-label">
            Available Until
          </label>
          <input
            type="date"
            id="wd-available-until"
            value={availableUntil}
            className="form-control"
            onChange={(e) => setAvailableUntil(e.target.value)}
          />
        </div>
      </div>

      <hr />

        {/* Cancel and Save Buttons
        <div className="d-flex justify-content-end" onClick={(handleCancel)}>
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-2">
            Cancel
          </Link>
          <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">
            Save
          </Link>
        </div> */}

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-secondary me-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={handleSave}>
            Save
          </button>
        </div>
        </form>

    </div>
  );
}






