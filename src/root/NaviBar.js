import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function NaviBar() {
    //CSS in JS
    const Button = styled.button`
        &.main {
            margin-top: 30px;
            margin-bottom: 30px; 
            cursor: pointer;
            border: none;
            background-color: rgba(0, 0, 0, 0);
            font-family: 'Nanum Gothic', sans-serif;
            font-size: 50px;
            font-weight: bold;
            color: white;
        }

        &.page {
            margin-left: 10px;
            margin-right: 10px;
            cursor: pointer;
            border: none;
            padding: 5px;
            border-top: 2px solid white;
            border-bottom: 2px solid white;
            background-color: rgba(0, 0, 0, 0);
            font-family: 'Nanum Gothic', sans-serif;
            font-size: 20px;
            font-weight: bold;
            color: white;
        }

        &.page:hover {
            border-color: darkgray;
            color: darkgray;
        }

        &.page:active {
            position: relative;
            top: 2px;
        }

        &.account {
            position: absolute;
            top: 15px;
            right: 20px;
        }
    `;

    //Java Script
    const navigate = useNavigate();

    //React JSX
    return (
        <div>
            <Button className='main' onClick={() => navigate('/')}>MetaClass</Button>
            <Button className='page' onClick={() => navigate('/word')}>단어학습</Button>
            <br />
        </div>
    );
}

export default NaviBar;