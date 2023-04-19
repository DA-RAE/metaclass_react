import NotFound from './NotFound';
import NaviBar from './NaviBar';
import Main from './main/Main';
import Word from './word/Word';
import { Routes, Route } from 'react-router-dom';

function Root() {
    // JSX
    return (
        <div>
            <NaviBar />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <h1>d</h1>
            <br />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/main' element={<Main />} />
                <Route path='/word' element={<Word />} />
            </Routes>
        </div>
    );
}

export default Root;