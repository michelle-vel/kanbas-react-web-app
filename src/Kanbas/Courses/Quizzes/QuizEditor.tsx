// @ts-nocheck

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuiz as addQuizAction,
  updateQuiz as updateQuizAction,
  setQuizzes,
} from "./reducer";
import * as quizzesClient from "./client";
import * as coursesClient from "../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const quizzes =
    useSelector((state: any) => state.quizzesReducer.quizzes) || [];
  const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);

  const [name, setName] = useState(existingQuiz ? existingQuiz.name : "New Quiz");
  const [description, setDescription] = useState(
    existingQuiz ? existingQuiz.description : ""
  );
  const [points, setPoints] = useState(existingQuiz ? existingQuiz.points : 0);
  const [status, setStatus] = useState(
    existingQuiz ? existingQuiz.status : "Draft"
  );
  const [dueDate, setDueDate] = useState(
    existingQuiz ? existingQuiz.dueDate : ""
  );
  const [availableFrom, setAvailableFrom] = useState(
    existingQuiz ? existingQuiz.availableFromDate : ""
  );
  const [availableUntil, setAvailableUntil] = useState(
    existingQuiz ? existingQuiz.availableUntilDate : ""
  );
  const [shuffleAnswers, setShuffleAnswers] = useState(
    existingQuiz ? existingQuiz.shuffleAnswers : false
  );
  const [timeLimit, setTimeLimit] = useState(
    existingQuiz ? existingQuiz.timeLimit : ""
  );
  const [multipleAttempts, setMultipleAttempts] = useState(
    existingQuiz ? existingQuiz.multipleAttempts : false
  );
  const handleNavigateToQuestions = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid || "new"}/Questions`);
  };

  const isNewQuiz = !existingQuiz;

  const handleSave = async () => {
    const updatedQuiz = {
      _id: qid || new Date().getTime().toString(),
      name,
      description,
      points,
      status,
      dueDate,
      availableFromDate: availableFrom,
      availableUntilDate: availableUntil,
      shuffleAnswers,
      timeLimit,
      multipleAttempts,
      course: cid,
    };

    try {
      if (isNewQuiz) {
        const createdQuiz = await coursesClient.createQuizForCourse(
          cid!,
          updatedQuiz
        );
        dispatch(addQuizAction(createdQuiz));
      } else {
        const updated = await quizzesClient.updateQuiz(updatedQuiz);
        dispatch(updateQuizAction(updated));
      }
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div className="container mt-4">
      <form>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleNavigateToQuestions}
        >
          Edit Questions
        </button>
        <div className="mb-3">
          <label htmlFor="quizName" className="form-label">
            Quiz Name
          </label>
          <input
            type="text"
            className="form-control"
            id="quizName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quizDescription" className="form-label">
            Quiz Instructions
          </label>
          <textarea
            className="form-control"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter quiz instructions"
          />
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="quizPoints" className="form-label">
              Points
            </label>
            <input
              type="number"
              className="form-control"
              id="quizPoints"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="quizStatus" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="quizStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="availableFrom" className="form-label">
              Available From
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="availableFrom"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="availableUntil" className="form-label">
              Available Until
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="availableUntil"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </div>
        </div>

        <fieldset className="border p-3 mb-4">
          <legend>Options</legend>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="shuffleAnswers"
              checked={shuffleAnswers}
              onChange={(e) => setShuffleAnswers(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="multipleAttempts"
              checked={multipleAttempts}
              onChange={(e) => setMultipleAttempts(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="multipleAttempts">
              Allow Multiple Attempts
            </label>
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <label htmlFor="timeLimit" className="form-label">
                Time Limit (Minutes)
              </label>
              <input
                type="number"
                className="form-control"
                id="timeLimit"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
              />
            </div>
          </div>
        </fieldset>

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