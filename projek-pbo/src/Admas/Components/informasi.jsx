import React from "react";

import { useEffect } from "react";

export default function Informasi({ informasi }) {

  
  return (
    <div>
      <h3>Informasi</h3>
      <div className="data">
        <p>{informasi}</p>
      </div>
    </div>
  );
}
