import { useOktaAuth } from "@okta/okta-react";
import React, { useState } from "react";

export const AddNewBook = () => {
  const { authState } = useOktaAuth();
  // New book
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [copies, setCopies] = useState(0);
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  function categoryField(value: string) {
    setCategory(value);
  }
  return (
    <div className="container mt-5 mb-5">
      {displaySuccess && (
        <div className="alert alert-success" role="alert">
          Book added successfully.
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger" role="alert">
          All field must be filled out.
        </div>
      )}
      <div className="card">
        <div className="card-header">Add a new book</div>
        <div className="card-body">
          <form method="POST">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  required
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
