import LinkMain from "./LinkMain";
import NavLinkPage from "./NavLinkPage";
import styled from "styled-components";

function NavTopBar() {
    return (
        <>
            <Nav>
                <LinkMain>MetaClass</LinkMain>
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
    background-color: black;
`;

export default NavTopBar;