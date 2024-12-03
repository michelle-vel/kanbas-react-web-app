import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChevronDown } from 'react-icons/fa';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as db from "../../Database";
import { useDispatch, useSelector } from "react-redux";
import {
  addAssignment as addAssignmentAction,
  updateAssignment as updateAssignmentAction,
} from "./reducer";
import * as assignmentsClient from "./client";


export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    assignment ? assignment.availableFrom : ""
  );
  const [availableUntil, setAvailableUntil] = useState(
    assignment ? assignment.availableUntil : ""
  );

  const isNewAssignment = !assignment;
  
  const handleSave = async () => {
    const updatedAssignment = {
      _id: aid || new Date().getTime().toString(),
      title,
      description,
      points,
      dueDate,
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
      <h6 className="fw-bold">Assignment Name</h6>
      <input
        id="wd-name"
        value={assignment.title}
        className="form-control mb-3"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        id="wd-description"
        className="form-control mb-4"
        rows={5}
        value={assignment.description}
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
            value={assignment.points}
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
          <select id="wd-group" className="form-control" value={assignment.group} disabled>
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
            value={assignment.displayGradeAs}
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
            value={assignment.submissionType}
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
            value={assignment.assignTo}
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
            value={assignment.dueDate}
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
            value={assignment.availableFrom}
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
            value={assignment.availableUntil}
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

    </div>
  );
}








// export default function AssignmentEditor() {
//   return (
//     <div id="wd-assignments-editor" className="container mt-4">
//       <h6 className="fw-bold">Assignment Name</h6>
//       <input id="wd-name" value="A1" className="form-control mb-3" />
      
//       <textarea id="wd-description" className="form-control mb-4" rows={5}>
//         The assignment is available online. 
        
//         Submit a link to the landing page of your Web application running on Netlify. 
//         The landing page should include the following: 
//         Your full name and section 
//         Links to each of the lab assignments 
//         Link to the Kanbas application 
//         Links to all relevant source code repositories 
//         The Kanbas application should include a link to navigate back to the landing page.
//       </textarea>

//       {/* Points Row */}
//       <div className="row mb-3 align-items-center">
//         <div className="col-md-3 text-end">
//           <label htmlFor="wd-points" className="form-label">Points</label>
//         </div>
//         <div className="col-md-6">
//           <input id="wd-points" value={100} className="form-control" />
//         </div>
//       </div>

//       {/* Assignment Group Row */}
//       <div className="row mb-3 align-items-center">
//         <div className="col-md-3 text-end">
//           <label htmlFor="wd-group" className="form-label">Assignment Group</label>
//         </div>
//         <div className="col-md-6 position-relative">
//           <select id="wd-group" className="form-control">
//             <option value="assignments">ASSIGNMENTS</option>
//             </select>
//             <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3"></i>
//           </div>
//       </div>

//       {/* Display Grade as Row */}
//       <div className="row mb-3 align-items-center">
//         <div className="col-md-3 text-end">
//           <label htmlFor="wd-display-grade-as" className="form-label">Display Grade as</label>
//         </div>
//         <div className="col-md-6 position-relative">
//           <select id="wd-display-grade-as" className="form-control">
//             <option value="percentage">Percentage</option>
//           </select>
//           <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-3"></i>
//         </div>
//       </div>

//       {/* Submission Type Row */}
//       <div className="row mb-3 align-items-top">
//         <div className="col-md-3 text-end">
//           <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
//         </div>

//         <div className="col-md-6">
//         <div className="card">
//         <div className="card-body">

//         <div className="position-relative">
//           <select id="wd-submission-type" className="form-control">
//             <option value="online">Online</option>
//           </select>
//           <i className="bi bi-chevron-down position-absolute top-50 end-0 translate-middle-y me-2"></i>
//           </div>

//       {/* Online Entry Options */}
//       <div className="row mb-3">
//           <label className="form-label fw-bold">Online Entry Options</label>
//         <div className="col-md-6">
//           <div className="form-check">
//             <input type="checkbox" id="wd-text-entry" className="form-check-input" />
//             <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
//           </div>
//           <div className="form-check">
//             <input type="checkbox" id="wd-website-url" className="form-check-input" />
//             <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
//           </div>
//           <div className="form-check">
//             <input type="checkbox" id="wd-media-recordings" className="form-check-input" />
//             <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
//           </div>
//           <div className="form-check">
//             <input type="checkbox" id="wd-student-annotation" className="form-check-input" />
//             <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
//           </div>
//           <div className="form-check">
//             <input type="checkbox" id="wd-file-upload" className="form-check-input" />
//             <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
//           </div>
//         </div>
//       </div>
//       </div>
//       </div>
//     </div>
//     </div>
    


//       {/* Assign Row */}
//       <div className="row mb-3 align-items-top">
//         <div className="col-md-3 text-end">
//           <label htmlFor="wd-assign-to" className="form-label">Assign</label>
//         </div>

//         <div className="col-md-6">
        
//         <div className="card">
//         <div className="card-body">
//         <label className="form-label fw-bold">Assign To</label>

//           <input id="wd-assign-to" value="Everyone" className="form-control" />
//           <br/>

//       {/* Due Date Row */}
//       <div className="row mb-3 align-items-center">
//           <label htmlFor="wd-due-date" className="form-label fw-bold">Due</label>
//           <input type="date" id="wd-due-date" value="2024-05-13" className="form-control" />
//       </div>

//       {/* Available From & Until Row */}
//       <div className="row mb-3 align-items-center">

//         <div className="col-md-5 text-left">
//           <label htmlFor="wd-available-from" className="form-label fw-bold">Available from</label>
//         <div>
//           <input type="date" id="wd-available-from" value="2024-05-06" className="form-control" />
//         </div>
//         </div>

//         <div className="col-md-5 text-left">
//           <label htmlFor="wd-available-until" className="form-label fw-bold">Until</label>
//         <div>
//           <input type="date" id="wd-available-until" value="2024-05-20" className="form-control" />
//       </div>
//       </div>
//       </div>

//       </div>


//       </div>
//       </div>

//       </div>

//       <hr />

//       <div className="d-flex justify-content-end">
//         <button type="button" className="btn btn-secondary me-2">Cancel</button>
//         <button type="submit" className="btn btn-danger">Save</button>
//       </div>
//     </div>
//   );
// }