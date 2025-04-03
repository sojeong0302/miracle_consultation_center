import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './page/Home.js';
import Write from './page/Write.js';
import Answer from './page/Answer.js';
import WriteList from './page/WriteList.js';
import View from './page/View.js';

function App() {
    return (
        <div className='App'>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/write' element={<Write />} />
                    <Route path='/answer/:code' element={<Answer />} />
                    <Route path='/view/:code' element={<View />} />
                    <Route path='/writeList' element={<WriteList />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
