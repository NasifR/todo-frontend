import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskList from "./components/TaskList";
import ApiLinks from "./components/ApiLinks";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/api-links" element={<ApiLinks />} />
    </Routes>
  </BrowserRouter>
);

export default App;
