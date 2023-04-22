import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

function NavTopBar() {
    const navigate = useNavigate();

    return (
        <>
            <Nav>
                <Button onClick={() => navigate('/')}>MetaClass</Button>
                <BButton onClick={() => navigate('/signin')}>로그인</BButton>
                <BBButton onClick={() => navigate('/signup')}>회원가입</BBButton>
            </Nav>
        </>
    );
}

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 60px;
    background-color: rgba(50, 50, 50, 0.5);
`;

const Button = styled.button`
    position: absolute;
    left: 0.5%;
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-family: 'QuicksandBold';
    color: ${(props) => props.color};
    color: rgba(200, 200, 200, 1);
    font-size: 45px;
`;

const BButton = styled.button`
    position: absolute;
    margin-top: 17px;
    right: 5%;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0);
    font-family: 'QuicksandBold';
    color: ${(props) => props.color};
    color: rgba(200, 200, 200, 1);
    font-size: 15px;
`;

const BBButton = styled.button`
    position: absolute;
    margin-top: 17px;
    right: 1%;
    cursor: pointer;
    border: 1px solid white;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0);
    font-family: 'QuicksandBold';
    color: ${(props) => props.color};
    color: rgba(200, 200, 200, 1);
    font-size: 15px;
`;
export default NavTopBar;