import NotFound from './NotFound';
import Main from './Main';
import Word from './Word';
import Speak from './Speak';
import Grade from './Grade';
import Ingame from './Ingame';
import NaviBar from '../component/NaviBar';
import NanumGothicBold from '../resource/NanumGothic-Bold.ttf';
import DongleBold from '../resource/Dongle-Bold.ttf';
import Favicon from '../resource/favicon.ico';
import Background from '../resource/background.jpg';
import { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

function Root() {
    return (
        <div>
            <GlobalStyle />
            <NaviBar />

            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/*' element={<NotFound />} />
                <Route path='/main' element={<Main />} />
                <Route path='/word' element={<Word />} />
                <Route path='/speak' element={<Speak />} />
                <Route path='/grade' element={<Grade />} />
                <Route path='/ingame' element={<Ingame />} />
            </Routes>
        </div>
    );
}

const GlobalStyle = createGlobalStyle`
    @font-face {
        src: url(${NanumGothicBold});
        font-family: 'NanumGothicBold';
    }

    @font-face {
        src: url(${DongleBold});
        font-family: 'DongleBold';
    }

    head {
        link[rel='icon'] {
            href: ${Favicon};
            type: 'image/x-icon';
        }
    }

    body {
        background-image: url(${Background});
        font-family: 'NanumGothicBold';
        font-size: 15px;
        font-weight: bold;
        color: white;
        text-align: center;
    }
`;

export default Root;