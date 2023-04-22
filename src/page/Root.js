import NotFound from './NotFound';
import Signin from './Signin';
import Signup from './Signup';
import Main from './Main';
import Word from './Word';
import Speak from './Speak';
import Grade from './Grade';
import Ingame from './Ingame';
import NavTopBar from '../component/NavTopBar';
import NanumGothicBold from '../resource/NanumGothic-Bold.ttf';
import QuicksandBold from '../resource/Quicksand-Bold.ttf';
import Favicon from '../resource/favicon.ico';
import Background from '../resource/background.jpg';
import { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

function Root() {
    return (
        <>
            <GlobalStyle />
            <NavTopBar />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/main' element={<Main />} />
                <Route path='/word' element={<Word />} />
                <Route path='/speak' element={<Speak />} />
                <Route path='/grade' element={<Grade />} />
                <Route path='/ingame' element={<Ingame />} />
            </Routes>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
    @font-face {
        src: url(${NanumGothicBold});
        font-family: 'NanumGothicBold';
    }

    @font-face {
        src: url(${QuicksandBold});
        font-family: 'QuicksandBold';
    }

    head {
        link[rel='icon'] {
            href: ${Favicon};
            type: 'image/x-icon';
        }
    }

    body {
        background-image: url(${Background});
        text-align: center;
        font-family: 'NanumGothicBold';
        color: white;
        font-size: 15px;
    }
`;

export default Root;