import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
    assignments: assignments,
  };
  const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
      addAssignment: (state, { payload: assignment }) => {
        const newAssignment = {
          _id: assignment._id,
          title: assignment.title,
          course: assignment.course,
          description: assignment.description,
          points: assignment.points,
          group: assignment.group,
          displayGradeAs: assignment.displayGradeAs,
          submissionType: assignment.submissionType,
          assignTo: assignment.assignTo,
          dueDate: assignment.dueDate,
          availableFrom: assignment.availableFrom,
          availableUntil: assignment.availableUntil,
        };
        state.assignments = [...state.assignments, newAssignment];
      },
      deleteAssignment: (state, { payload: assignmentId }) => {
        state.assignments = state.assignments.filter(
          (a) => a._id !== assignmentId
        );
      },
      updateAssignment: (state, { payload: assignment }) => {
        state.assignments = state.assignments.map((a: any) =>
          a._id === assignment._id ? assignment : a
        ) as any;
      },
  
    },
  });
  
  export const { addAssignment, deleteAssignment, updateAssignment,  } =
    assignmentsSlice.actions;
  export default assignmentsSlice.reducer;
  