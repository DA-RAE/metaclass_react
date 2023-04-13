import '../../style.css';
import { useState } from 'react';
import { getDate } from '../../func'

function Word() {
  let date = getDate();

  const [languageInput, setLanguageInput] = useState('');
  const [levelInput, setLevelInput] = useState('');
  const [chapterInput, setChapterInput] = useState('');
  const [gubunInput, setGubunInput] = useState('');

  function languageInputReplace(event) {
    const replace = event.target.value.replace(/[^a-zA-Z]/g, '');
    setLanguageInput(replace);
  }
  function levelInputReplace(event) {
    const replace = event.target.value.replace(/[^0-9]/g, '');
    setLevelInput(replace);
  }
  function chapterInputReplace(event) {
    const replace = event.target.value.replace(/[^0-9]/g, '');
    setChapterInput(replace);
  }
  function gubunInputReplace(event) {
    const replace = event.target.value.replace(/[^0-9]/g, '');
    setGubunInput(replace);
  }

  return (
    <>
      <title>단어학습</title>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>언어</th>
            <th>레벨</th>
            <th>단원</th>
            <th>구분</th>
            <th>한국어</th>
            <th>중국어</th>
            <th>영어</th>
            <th>러시아어</th>
            <th>갱신일자</th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th><span>000</span></th>
            <th><input className='input25px' value={languageInput} onInput={languageInputReplace} /></th>
            <th><input className='input25px' value={levelInput} onInput={levelInputReplace} /></th>
            <th><input className='input25px' value={chapterInput} onInput={chapterInputReplace} /></th>
            <th><input className='input100px' value={gubunInput} onInput={gubunInputReplace} /></th>
            <th><input className='input100px' /></th>
            <th><input className='input100px' /></th>
            <th><input className='input100px' /></th>
            <th><input className='input100px' /></th>
            <th><span>{date}</span></th>
            <th><button className='insertButton'>추가</button></th>
            <th><button className='insertButton'>추가</button></th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </>
  );
}

export default Word;