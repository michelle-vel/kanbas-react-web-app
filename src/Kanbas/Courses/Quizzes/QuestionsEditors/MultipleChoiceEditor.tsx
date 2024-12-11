import React, { useState } from "react";

interface MultipleChoiceEditorProps {
  onSave: (question: any) => void;
  onCancel: () => void;
  initialData?: {
    title: string;
    points: number;
    question: string;
    choices: string[];
    correctChoice: number | null;
  };
}

export default function MultipleChoiceEditor({
  onSave,
  onCancel,
  initialData,
}: MultipleChoiceEditorProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [points, setPoints] = useState(initialData?.points || 0);
  const [question, setQuestion] = useState(initialData?.question || "");
  const [choices, setChoices] = useState<string[]>(
    initialData?.choices || [""]
  );
  const [correctChoice, setCorrectChoice] = useState<number | null>(
    initialData?.correctChoice ?? null
  );

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleRemoveChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
    if (correctChoice === index) setCorrectChoice(null);
  };

  const handleSave = () => {
    if (correctChoice === null) {
      alert("Please select a correct choice.");
      return;
    }

    const newQuestion = {
      type: "Multiple Choice",
      title,
      points,
      question,
      choices,
      correctChoice,
    };
    onSave(newQuestion);
  };

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Multiple Choice Question</h5>
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
                id="title"
                className="form-control"
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
                id="points"
                className="form-control"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="question" className="form-label">
                Question
              </label>
              <textarea
                id="question"
                className="form-control"
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Choices</label>
              {choices.map((choice, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={choice}
                    onChange={(e) =>
                      setChoices(
                        choices.map((c, i) =>
                          i === index ? e.target.value : c
                        )
                      )
                    }
                  />
                  <input
                    type="radio"
                    name="correctChoice"
                    checked={correctChoice === index}
                    onChange={() => setCorrectChoice(index)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger ms-2"
                    onClick={() => handleRemoveChoice(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={handleAddChoice}
              >
                Add Choice
              </button>
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
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}