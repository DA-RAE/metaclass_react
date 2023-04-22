import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const navigate = useNavigate();
  const phpHost = 'http://localhost';
  const phpUrl = phpHost + '/php/signup/insert.php';
  const column = { id: '', password: '', email: '', irum: '', nickname: '', date: '' };
  const [user, setUser] = useState(column);

  function handleInputUser(event) {
    let value = event.target.value;
    if (event.target.pattern == '^[a-zA-Z0-9]*$')
      value = value.replace(/[^a-zA-Z0-9]/g, "");
    else if (event.target.pattern == '^[a-zA-Z0-9@.]*$')
      value = value.replace(/[^a-zA-Z0-9@.]/g, "");
    setUser((prevState) => ({ ...prevState, [event.target.name]: value, }));
  }

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
  }

  async function submit() {
    if (user.id.length < 1 ||
      user.password.length < 1 ||
      user.email.length < 1 ||
      user.irum.length < 1 ||
      user.nickname.length < 1)
      alert('각 항목은 필수 입력사항입니다');
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email))
      alert('형식에 맞지 않는 이메일입니다');
    else {
      const value = { ...user, date: getDate() };
      const result = await post(phpUrl.insert, value);
      if (result === 'SUCCESS') {
        alert('회원가입이 정상적으로 처리되었습니다');
        navigate('/');
      }
      else if (result === 'DUPLICATION')
        alert('중복된 아이디입니다');
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
          <h1>회 원 가 입</h1>
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
          <Span>이메일 : </Span>
          <Input name='email' value={user.email} onChange={handleInputUser} width='330px' minLength={1} maxLength={13} pattern='^[a-zA-Z0-9@.]*$' required placeholder='이메일을 입력해주세요' />
          <br />
          <br />
          <br />
          <Span>이름 :</Span>
          <Input name='irum' value={user.irum} onChange={handleInputUser} width='330px' minLength={1} maxLength={13} required placeholder='이름을 입력해주세요' />
          <br />
          <br />
          <br />
          <Span>닉네임 : </Span>
          <Input name='nickname' value={user.nickname} onChange={handleInputUser} width='330px' minLength={1} maxLength={13} required placeholder='닉네임을 입력해주세요' />
          <br />
          <br />
          <br />
          <Button onClick={() => submit()} color='white'>확 인</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
  height: 650px;
  border: 1px solid white;
  border-radius: 20px;
  padding: 50px;
`;

const Span = styled.label`
  text-align: left;
  margin-bottom: 10px;
`;

export default SignupForm;