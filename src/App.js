import "./App.css";
import WriteList from "./page/WriteList.js";

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
      <WriteList mockData={mockData} />
    </div>
  );
}
export default App;
