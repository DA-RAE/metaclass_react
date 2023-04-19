import NotFound from './NotFound';
import NaviBar from './NaviBar';
import Main from './main/Main';
import Word from './word/Word';
import { Routes, Route } from 'react-router-dom';

function Root() {
    //React JSX
    return (
        <div>
            <NaviBar />
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