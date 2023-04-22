import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate()
  return (
    <>
      <title>MetaClass</title>
      <Button onClick={() => navigate('/word')}>단어학습</Button>
      <Button onClick={() => navigate('/speak')}>회화연습</Button>
      <Button onClick={() => navigate('/grade')}>성적관리</Button>
      <Button onClick={() => navigate('/ingame')}>인게임</Button>
    </>
  );
}

const Button = styled.button`
  cursor: pointer;
  margin-left: 15px;
  margin-right: 15px;
  padding: 5px;
  width: 100px;
  border: none;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  background-color: rgba(0, 0, 0, 0);
  font-family: 'NanumGothicBold';
  color: white;
  font-size: 20px;

  &:hover {
    color: gray;
    border-color: gray;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;

export default Main;