import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ANSWERS_API = `${REMOTE_SERVER}/api/answers`;
const axiosWithCredentials = axios.create({ withCredentials: true });

/**
 * Create answers for a quiz submission.
 * @param {Array} answers - Array of answer objects.
 * Each answer object should include `question`, `quiz`, `user`, and `answer` fields.
 * @returns {Promise} - Resolves to the created answers.
 */
export const createAnswers = async (answers: any) => {
  const { data } = await axiosWithCredentials.post(`${ANSWERS_API}`, { answers });
  return data;
};

/**
 * Fetch answers for a specific quiz.
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise} - Resolves to the list of answers for the quiz.
 */
export const findAnswersForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/quiz/${quizId}`);
  return data;
};

/**
 * Fetch answers submitted by a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise} - Resolves to the list of answers for the user.
 */
export const findAnswersByUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${ANSWERS_API}/user/${userId}`);
  return data;
};

/**
 * Update an answer by ID.
 * @param {string} answerId - The ID of the answer to update.
 * @param {Object} answerUpdates - The fields to update in the answer.
 * @returns {Promise} - Resolves to a success message.
 */
export const updateAnswer = async (answerId: string, answerUpdates: any) => {
  const { data } = await axiosWithCredentials.put(`${ANSWERS_API}/${answerId}`, answerUpdates);
  return data;
};

/**
 * Delete an answer by ID.
 * @param {string} answerId - The ID of the answer to delete.
 * @returns {Promise} - Resolves to a success message.
 */
export const deleteAnswer = async (answerId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ANSWERS_API}/${answerId}`);
  return data;
};

/**
 * Delete all answers for a specific quiz.
 * @param {string} quizId - The ID of the quiz.
 * @returns {Promise} - Resolves to a success message.
 */
export const deleteAnswersForQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ANSWERS_API}/quiz/${quizId}`);
  return data;
};
