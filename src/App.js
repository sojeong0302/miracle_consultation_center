import "./App.css";
import WriteList from "./page/WriteList.js";

function App() {
  const mockData = [
    {
      id: 1,
      nickName: "소정",
      date: new date().getTime(),
      content: "mock1",
      isChecked: 0,
    },
  ];
  return (
    <div className="App">
      <WriteList />
    </div>
  );
}
export default App;
