import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './page/Home.js';
import Write from './page/Write.js';
import Answer from './page/Answer.js';
import WriteList from './page/WriteList.js';
import View from './page/View.js';
//임시 커밋
function App() {
    const [mockData, setMockData] = useState([
        {
            id: 1,
            nickName: '소정',
            date: '2023-01-01',
            content: 'mock1',
            isChecked: 1,
            code: 'A35YYRR',
            answer: '답장',
        },
        {
            id: 2,
            nickName: '소정',
            date: '2023-01-01',
            content: 'mock1',
            isChecked: 1,
            code: 'EFI4TFJI',
            answer: '답장임',
        },
        {
            id: 3,
            nickName: '소정',
            date: '2023-01-01',
            content: 'mock1',
            isChecked: 0,
            code: 'FI4F9D',
            answer: null,
        },
    ]);

    const handleCreateNewData = (newData) => {
        setMockData((prevData) => {
            const lastId = prevData.length > 0 ? prevData[prevData.length - 1].id : 0;
            const updatedData = [
                ...prevData,
                {
                    ...newData,
                    id: lastId + 1,
                },
            ];
            return updatedData;
        });
    };

    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home mockData={mockData} />} />
                    <Route path='/write' element={<Write onCreateNewData={handleCreateNewData} />} />
                    <Route path='/answer/:code' element={<Answer mockData={mockData} />} />
                    <Route path='/view/:code' element={<View mockData={mockData} setMockData={setMockData} />} />

                    <Route path='/writeList' element={<WriteList mockData={mockData} />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
