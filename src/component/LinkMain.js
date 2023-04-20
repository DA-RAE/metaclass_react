import styled from 'styled-components';
import { Link } from 'react-router-dom';

function LinkMain() {
    return (
        <>
            <LinkS to='/main'>MetaClass</LinkS>
        </>
    );
}

const LinkS = styled(Link)`
    position: absolute;
    top: 5px;
    left: 15px;
    text-decoration: none;
    font-family: 'QuicksandBold';
    color: black;
    font-size: 40px;
`;

export default LinkMain;