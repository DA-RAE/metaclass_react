import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SigninForm() {
  const navigate = useNavigate();
  const phpHost = 'http://localhost';
  const phpUrl = phpHost + '/php/signin/insert.php';
  const column = { id: '', password: '' };
  const [user, setUser] = useState(column);

  function handleInputUser(event) {
    let value = event.target.value;
    if (event.target.pattern == '^[a-zA-Z0-9]*$')
      value = value.replace(/[^a-zA-Z0-9]/g, "");
    setUser((prevState) => ({ ...prevState, [event.target.name]: value, }));
  }

  async function submit() {
    if (user.id.length < 1 ||
      user.password.length < 1)
      alert('각 항목은 필수 입력사항입니다');
    else {
      const value = { ...user };
      const result = await post(phpUrl, value);
      if (result === 'SUCCESS') {
        navigate('/');
      }
      else if (result === 'FAIL')
        alert('로그인에 실패하였습니다');
    }
  }

  async function post(url, value) {
    const data = new URLSearchParams(value);
    const response = await fetch(url, { method: 'POST', body: data });
    const result = await response.json();
    return result;
  }

  return (
    <>
      <Container>
        <Box>
          <h1>로 그 인</h1>
          <Span>아이디 : </Span>
          <Input name='id' value={user.id} onChange={handleInputUser} width='330px' minLength={1} maxLength={13} pattern='^[a-zA-Z0-9]*$' required placeholder='아이디를 입력해주세요' />
          <br />
          <br />
          <br />
          <Span>비밀번호 : </Span>
          <Input name='password' value={user.password} onChange={handleInputUser} width='330px' minLength={1} maxLength={13} required type='password' placeholder='비밀번호를 입력해주세요' />
          <br />
          <br />
          <br />
          <Button onClick={submit} color='white'>확 인</Button>
          <br />
          <Button onClick={() => navigate('/')} color='white'>취 소</Button>
        </Box>
      </Container>
    </>
  );
}

const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
  background-color: rgba(0, 0, 0, 0);
  font-family: 'NanumGothicBold';
  color: white;
  font-size: 15px;

  &:focus {
    border-color: white;
  }

  &:invalid {
    border-color: red;
  }
`;

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0);
  font-family: 'NanumGothicBold';
  color: ${(props) => props.color};
  font-size: 20px;

  &:active {
      position: relative;
      top: 1px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 400px;
  height: 370px;
  border: 1px solid white;
  border-radius: 20px;
  padding: 50px;
`;

const Span = styled.label`
  text-align: left;
  margin-bottom: 10px;
`;

export default SigninForm;