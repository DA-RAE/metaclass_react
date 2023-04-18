import '../style.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from './notfound/NotFound'
import Main from './main/Main';
import Login from './login/Login';
import Word from './word/Word';

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