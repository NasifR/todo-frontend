import React from "react";

const ApiLinks = () => (
  <div>
    <h2>API Endpoints</h2>
    <ul>
      <li><a href={`${process.env.REACT_APP_API_URL}/tasks`} target="_blank" rel="noreferrer">View Tasks</a></li>
    </ul>
  </div>
);

export default ApiLinks;
