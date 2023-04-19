import styled from "styled-components";

function NaviBar() {
    // CSS-in-JS
    const Button = styled.button`
        &.main {
            position: absolute;
            left: 20px;
            margin-top: 10px;
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

    const Nav = styled.nav`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        background-color: black;
        z-index: 9999;
    `;

    // JavaScript


    // JSX
    return (
        <div>
            <Nav>
                <Button className="main">MetaClass</Button>
            </Nav>
        </div>
    );
}

export default NaviBar;