import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function ButtonMain() {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => navigate('/main')}>MetaClass</Button>
        </>
    );
}

const Button = styled.button`
    position: absolute;
    left: 20px;
    margin-top: -10px;
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-family: 'DongleBold';
    font-size: 70px;
    font-weight: bold;
`;

export default ButtonMain;