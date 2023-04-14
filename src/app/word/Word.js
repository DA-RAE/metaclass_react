import '../../style.css';
import { useState } from 'react';
import { getDate } from '../../func'

function Word() {
  const row = { num: '', language: '', level: '', chapter: '', gubun: '', kl: '', cl: '', el: '', rl: '', regdate: '' };
  const [rowMain, setRowMain] = useState(row);
  const [rowArr, setRowArr] = useState([row]);

  function rtnNewArr(arr, index, value) {
    const newArr = [...arr];
    newArr[index] = value;
    return newArr;
  }

  function toEng(value) {
    return (value.replace(/[^a-zA-Z]/g, ''));
  }

  function toNum(value) {
    return (value.replace(/[^0-9]/g, ''));
  }

  function insertRow() {
    const message =
    `    번호 : ${rowMain.num}
    언어 : ${rowMain.language}
    레벨 : ${rowMain.level}
    단원 : ${rowMain.chapter}
    구분 : ${rowMain.gubun}
    한국어 : ${rowMain.kl}
    중국어 : ${rowMain.cl}
    영어 : ${rowMain.el}
    러시아어 : ${rowMain.rl}
    갱신일자 : ${rowMain.regdate}`;
    if (window.confirm(message)) {

    }
  }

  function resetRow() {
    setRowMain(row);
  }

  function updateRow(index) {
    const message =
    `    번호 : ${rowArr[index].num}
    언어 : ${rowArr[index].language}
    레벨 : ${rowArr[index].level}
    단원 : ${rowArr[index].chapter}
    구분 : ${rowArr[index].gubun}
    한국어 : ${rowArr[index].kl}
    중국어 : ${rowArr[index].cl}
    영어 : ${rowArr[index].el}
    러시아어 : ${rowArr[index].rl}
    갱신일자 : ${rowArr[index].regdate}`;
    if (window.confirm(message)) {

    }
  }

  function deleteRow(index) {
    const message =
    `    번호 : ${rowArr[index].num}
    언어 : ${rowArr[index].language}
    레벨 : ${rowArr[index].level}
    단원 : ${rowArr[index].chapter}
    구분 : ${rowArr[index].gubun}
    한국어 : ${rowArr[index].kl}
    중국어 : ${rowArr[index].cl}
    영어 : ${rowArr[index].el}
    러시아어 : ${rowArr[index].rl}
    갱신일자 : ${rowArr[index].regdate}`;
    if (window.confirm(message)) {

    }
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
            <th><span>{rowMain.num}</span></th>
            <th><input className='input25px' value={rowMain.language} onInput={(event) => setRowMain({ ...rowMain, language: toEng(event.target.value) })} maxLength={2} /></th>
            <th><input className='input25px' value={rowMain.level} onInput={(event) => setRowMain({ ...rowMain, level: toNum(event.target.value) })} maxLength={1} /></th>
            <th><input className='input25px' value={rowMain.chapter} onInput={(event) => setRowMain({ ...rowMain, chapter: toNum(event.target.value) })} maxLength={2} /></th>
            <th><input className='input25px' value={rowMain.gubun} onInput={(event) => setRowMain({ ...rowMain, gubun: toNum(event.target.value) })} maxLength={1} /></th>
            <th><input className='input150px' value={rowMain.kl} onInput={(event) => setRowMain({ ...rowMain, kl: event.target.value })} maxLength={50} /></th>
            <th><input className='input150px' value={rowMain.cl} onInput={(event) => setRowMain({ ...rowMain, cl: event.target.value })} maxLength={50} /></th>
            <th><input className='input150px' value={rowMain.el} onInput={(event) => setRowMain({ ...rowMain, el: event.target.value })} maxLength={50} /></th>
            <th><input className='input150px' value={rowMain.rl} onInput={(event) => setRowMain({ ...rowMain, rl: event.target.value })} maxLength={50} /></th>
            <th><span>{rowMain.regdate}</span></th>
            <th><button className='insertButton' onClick={insertRow}>추가</button></th>
            <th><button className='deleteButton' onClick={resetRow}>리셋</button></th>
          </tr>
        </thead>
        <tbody>
          {rowArr.map((value, index) =>
            <tr>
              <th><span>{value.num}</span></th>
              <th><input className='input25px' value={value.language} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, language: toEng(event.target.value) }))} maxLength={2} /></th>
              <th><input className='input25px' value={value.level} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, level: toNum(event.target.value) }))} maxLength={1} /></th>
              <th><input className='input25px' value={value.chapter} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, chapter: toNum(event.target.value) }))} maxLength={2} /></th>
              <th><input className='input25px' value={value.gubun} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, gubun: toNum(event.target.value) }))} maxLength={1} /></th>
              <th><input className='input150px' value={value.kl} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, kl: event.target.value }))} maxLength={50} /></th>
              <th><input className='input150px' value={value.cl} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, cl: event.target.value }))} maxLength={50} /></th>
              <th><input className='input150px' value={value.el} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, el: event.target.value }))} maxLength={50} /></th>
              <th><input className='input150px' value={value.rl} onInput={(event) => setRowArr(rtnNewArr(rowArr, index, { ...value, rl: event.target.value }))} maxLength={50} /></th>
              <th><span>{value.regdate}</span></th>
              <th><button className='updateButton' onClick={() => updateRow(index)}>수정</button></th>
              <th><button className='deleteButton' onClick={() => deleteRow(index)}>삭제</button></th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Word;