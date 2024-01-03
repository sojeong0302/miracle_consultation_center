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
    },
    {
      id: 2,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 1,
    },
    {
      id: 3,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 1,
    },
    {
      id: 4,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 1,
    },
    {
      id: 5,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 1,
    },
    {
      id: 6,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 0,
    },
    {
      id: 7,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 0,
    },
    {
      id: 8,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 0,
    },
    {
      id: 9,
      nickName: "소정",
      date: "2023-01-01",
      content: "mock1",
      isChecked: 0,
    },
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write" element={<Write />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/view" element={<View />} />
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
