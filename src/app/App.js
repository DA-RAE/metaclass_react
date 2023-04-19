import '../resource/style.css';
import Main from './main/Main';
import Word from './word/Word';
import AccountModal from './accountModal/AccountModal';
import NotFound from './notfound/NotFound';
import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {
    const [modalShow, setModalShow] = useState(false);

    const navigate = useNavigate();

    function mainButton() {
        navigate('/');
    }

    return (
        <>
            <button className='mainButton' onClick={mainButton}>MetaClass</button>
            <AccountModal show={modalShow} onHide={() => setModalShow(false)} />
            <br />

            <Routes>
                <Route path='/*' element={<NotFound />} />
                <Route path='/' element={<Main />} />
                <Route path='/index' element={<Main />} />
                <Route path='/index.html' element={<Main />} />
                <Route path='/main' element={<Main />} />
                <Route path='/word' element={<Word />} />
            </Routes>
        </>
    );
}

export default App;