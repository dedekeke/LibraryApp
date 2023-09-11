import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";
import MessageModel from "../../../models/MessageModel";

const PostNewMessage = () => {
  const { authState } = useOktaAuth();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [displayWarning, setdisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  async function submitNewQuestion() {
    const url = "http://localhost:8080/api/messages/secure/add/message";
    if (authState?.isAuthenticated && title != "" && question != "") {
      const messageRequestModel: MessageModel = new MessageModel(
        title,
        question
      );
      const requestOption = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(messageRequestModel),
      };
      const submitNewQuestionResponse = await fetch(url, requestOption);
      if (!submitNewQuestionResponse.ok) {
        throw new Error("Something went wrong!");
      }
      setTitle("");
      setQuestion("");
      setdisplayWarning(false);
      setDisplaySuccess(true);
    } else {
      setdisplayWarning(true);
      setDisplaySuccess(false);
    }
  }

  return (
    <div className="card mt-3">
      <div className="card-header">Ask question to the Librarian</div>
      <div className="card-body">
        <form method="POST">
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              All field must be filled out
            </div>
          )}
          {displaySuccess && (
            <div className="alert alert-success" role="alert">
              Question added successfully
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
            {/* TO-DO */}
            <textarea
              id="FormControlTextarea1"
              className="form-control"
              rows={3}
              onChange={(e) => setQuestion(e.target.value)}
              value={question}
            ></textarea>
          </div>
          <div>
            <button
              className="btn btn-primary mt-3"
              onClick={submitNewQuestion}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewMessage;
