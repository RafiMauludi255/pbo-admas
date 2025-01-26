import React from "react";

export default function Agenda({ agenda }) {
  return (
    <div>
      <h3>Agenda</h3>
      <div className="data">
        <p>{agenda}</p>
      </div>
    </div>
  );
}
