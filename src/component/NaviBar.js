import ButtonMain from "./ButtonMain";
import styled from "styled-components";

function NaviBar() {
    return (
        <div>
            <Nav>
                <ButtonMain>MetaClass</ButtonMain>
            </Nav>
        </div>
    );
}

const Button = styled.button`
    &.page {
    margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
        border: none;
        padding: 5px;
        border-top: 2px solid white;
        border-bottom: 2px solid white;
        background-color: rgba(0, 0, 0, 0);
        font-size: 20px;
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

const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: black;
    z-index: 9999;
`;

export default NaviBar;