import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './page/Main';
import Word from './page/Word';
import Speak from './page/Speak';
import Member from './page/Member';
import Grade from './page/Grade';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/word' element={<Word />}></Route>
        <Route path='/speak' element={<Speak />}></Route>
        <Route path='/member' element={<Member />}></Route>
        <Route path='/grade' element={<Grade />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);