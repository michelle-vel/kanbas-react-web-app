import React, { useState } from "react";

interface TrueFalseEditorProps {
  onSave: (question: any) => void;
  onCancel: () => void;
  initialData?: {
    title: string;
    points: number;
    question: string;
    correctChoice: string;
  };
}

export default function TrueFalseEditor({
  onSave,
  onCancel,
  initialData,
}: TrueFalseEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [points, setPoints] = useState<number>(initialData?.points || 0);
  const [question, setQuestion] = useState(initialData?.question || "");
  const [isTrue, setIsTrue] = useState<boolean>(
    initialData?.correctChoice === "True" || true
  );

  const handleSave = () => {
    const newQuestion = {
      type: "True/False",
      title,
      points,
      question,
      correctChoice: isTrue ? "True" : "False",
    };
    onSave(newQuestion);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">True/False Question Editor</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="points" className="form-label">
                Points
              </label>
              <input
                type="number"
                className="form-control"
                id="points"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question
              </label>
              <textarea
                className="form-control"
                id="question"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correct Answer</label>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="trueFalse"
                    id="true"
                    checked={isTrue}
                    onChange={() => setIsTrue(true)}
                  />
                  <label className="form-check-label" htmlFor="true">
                    True
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="trueFalse"
                    id="false"
                    checked={!isTrue}
                    onChange={() => setIsTrue(false)}
                  />
                  <label className="form-check-label" htmlFor="false">
                    False
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}