import React, { useState } from "react";
import { StarsReview } from "./StarsReview";

export const LeaveAReview: React.FC<{}> = () => {
  const [starInput, setStarInput] = useState(0);

  function starValue(value: number) {
    setStarInput(value);
  }

  return (
    <div className="dropdown" style={{ cursor: "pointers" }}>
      <h5 className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown">
        Leave a review?
      </h5>
      <ul id="submitReviewRating" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li>
          <button onClick={() => starValue(0)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(0.5)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(1)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(1.5)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(2)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(2.5)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(3)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(3.5)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(4)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(4.5)} className="dropdown-item"></button>
        </li>
        <li>
          <button onClick={() => starValue(5)} className="dropdown-item"></button>
        </li>
      </ul>
      <StarsReview rating={starInput} size={32} />
    </div>
  );
};
