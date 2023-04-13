import '../style.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './main/Main';
import Word from './word/Word';
import Speak from './speak/Speak';
import Member from './member/Member';
import Grade from './grade/Grade';
import NotFound from './notfound/NotFound'

function App() {
    const navigate = useNavigate();
    
    function mainButton() {
        navigate('/');
    }

    return (
        <>
            <button className='mainButton' onClick={mainButton}>MetaClass</button>
            <br />

            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/index' element={<Main />} />
                <Route path='/index.html' element={<Main />} />
                <Route path='/main' element={<Main />} />
                <Route path='/word' element={<Word />} />
                <Route path='/speak' element={<Speak />} />
                <Route path='/member' element={<Member />} />
                <Route path='/grade' element={<Grade />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;