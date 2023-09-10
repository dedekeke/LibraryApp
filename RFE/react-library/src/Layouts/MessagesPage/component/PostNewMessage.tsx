import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";

const PostNewMessage = () => {
  const { authState } = useOktaAuth();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displayWarning, setdisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  return (
    <div className="card mt-3">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Question added successfully
        </div>
      )}
      <div className="card-header">Ask question to the Librarian</div>
      <div className="card-body">
        <form method="POST">
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              All field must be filled out
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="FormControlInput1"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Question</label>
            <textarea
              id="FormControlTextarea1"
              className="form-control"
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            ></textarea>
          </div>
          <div>
            <button className="btn btn-primary mt-3">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewMessage;
