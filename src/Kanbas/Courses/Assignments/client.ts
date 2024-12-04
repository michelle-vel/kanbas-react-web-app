import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateAssignment = async (assignment: any) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};



// export const createAssignmentForCourse = async (
//   courseId: string,
//   newAssignment: {
//     title: string;
//     description: string;
//     points: number;
//     dueDate: string;
//     availableFromDate: string;
//     availableUntilDate: string;
//   }
// ) => {
//   try {
//     const { data } = await axiosWithCredentials.post(
//       `${REMOTE_SERVER}/api/courses/${courseId}/assignments`, // Corrected URL path
//       newAssignment
//     );
//     return data;
//   } catch (error) {
//     console.error("Error creating assignment:", error);
//     throw error;
//   }
// };
