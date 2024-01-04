import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./page/Home.js";
import Write from "./page/Write.js";
import Answer from "./page/Answer.js";
import WriteList from "./page/WriteList.js";
import View from "./page/View.js";

function App() {
  const mockData = [
    {
      id: 1,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 0,
      code: "A35YYRR",
    },
    {
      id: 2,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 1,
      code: "EFI4TFJI",
    },
    {
      id: 3,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 1,
      code: "FI4F9D",
    },
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/answer/:code" element={<Answer />} />
          <Route path="/view/:code" element={<View />} />
          <Route
            path="/writeList"
            element={<WriteList mockData={mockData} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
