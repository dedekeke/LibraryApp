import React, { useState } from "react";
import MessageModel from "../../../models/MessageModel";

export const AdminMessage: React.FC<{ message: MessageModel }> = (props, keys) => {
  const [displayWarning, setDisplayWarning] = useState(false);
  const [response, setResponse] = useState("");

  return (
    <div key={props.message.id}>
      <div className="card mt-2 shadow p-3 bg-body rounded">
        <h5>
          Case #{props.message.id}: {props.message.title}
        </h5>
        <h6>{props.message.userEmail}</h6>
        <p>{props.message.question}</p>
        <hr />
        <div>
          <h5>Response</h5>
          <form action="PUT">
            {displayWarning && (
              <div className="alert alert-danger" role="alert">
                All field must be filled out
              </div>
            )}
            <div className="col-md-12 mb-3">
              <label className="form-label">Description </label>
              <textarea
                id="formControlTextArea1"
                rows={3}
                className="form-control"
                onChange={(e) => setResponse(e.target.value)}
                value={response}
              />
            </div>
            <div><button className="btn btn-primary mt-3" type="button">Submit</button></div>
          </form>
        </div>
      </div>
    </div>
  );
};
