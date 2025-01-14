import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Register from '../pages/Register/Register';
import {LogIn} from '../pages/LogIn/LogIn';
import Manuscript from '../pages/Home/Manuscript-writing';
import Plan from '../pages/Plan';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LogIn />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Plan' element={<Plan />} />
                <Route path='/Manuscript' element={<Manuscript />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
