import '../../style.css';
import { useState } from 'react';
import { toEng, toNum, getNewArr, getDate, fetchPost } from '../../function'

function Word() {
  const column = { num: '', language: '', level: '', chapter: '', gubun: '', kl: '', cl: '', el: '', rl: '', regdate: '' };
  const [rowMain, setRowMain] = useState(column);
  const [rowArr, setRowArr] = useState([]);

  function insertRow() {
    const message =
      `번호 : ${rowMain.num}\n` +
      `언어 : ${rowMain.language}\n` +
      `레벨 : ${rowMain.level}\n` +
      `단원 : ${rowMain.chapter}\n` +
      `구분 : ${rowMain.gubun}\n` +
      `한국어 : ${rowMain.kl}\n` +
      `중국어 : ${rowMain.cl}\n` +
      `영어 : ${rowMain.el}\n` +
      `러시아어 : ${rowMain.rl}\n` +
      `갱신일자 : ${rowMain.regdate}`;
    if (window.confirm(message)) {
      const data = 
      //fetchPost('http://localhost/php/insert.php', '');
      const newArr = [...rowArr];
      newArr.push(rowMain);
      setRowArr(newArr);
      resetRow();
    }
  }

  function resetRow() {
    setRowMain(column);
  }

  function updateRow(index) {
    const message =
      `번호 : ${rowArr[index].num}\n` +
      `언어 : ${rowArr[index].language}\n` +
      `레벨 : ${rowArr[index].level}\n` +
      `단원 : ${rowArr[index].chapter}\n` +
      `구분 : ${rowArr[index].gubun}\n` +
      `한국어 : ${rowArr[index].kl}\n` +
      `중국어 : ${rowArr[index].cl}\n` +
      `영어 : ${rowArr[index].el}\n` +
      `러시아어 : ${rowArr[index].rl}\n` +
      `갱신일자 : ${rowArr[index].regdate}`;
    if (window.confirm(message)) {

    }
  }

  function deleteRow(index) {
    const message =
      `번호 : ${rowArr[index].num}\n` +
      `언어 : ${rowArr[index].language}\n` +
      `레벨 : ${rowArr[index].level}\n` +
      `단원 : ${rowArr[index].chapter}\n` +
      `구분 : ${rowArr[index].gubun}\n` +
      `한국어 : ${rowArr[index].kl}\n` +
      `중국어 : ${rowArr[index].cl}\n` +
      `영어 : ${rowArr[index].el}\n` +
      `러시아어 : ${rowArr[index].rl}\n` +
      `갱신일자 : ${rowArr[index].regdate}`;
    if (window.confirm(message)) {
      const newArr = [...rowArr];
      newArr.splice(index, 1);
      setRowArr(newArr);
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
          {rowArr.map((rowMap, index) =>
            <tr>
              <th><span>{rowMap.num}</span></th>
              <th><input className='input25px' value={rowMap.language} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, language: toEng(event.target.value) }))} maxLength={2} /></th>
              <th><input className='input25px' value={rowMap.level} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, level: toNum(event.target.value) }))} maxLength={1} /></th>
              <th><input className='input25px' value={rowMap.chapter} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, chapter: toNum(event.target.value) }))} maxLength={2} /></th>
              <th><input className='input25px' value={rowMap.gubun} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, gubun: toNum(event.target.value) }))} maxLength={1} /></th>
              <th><input className='input150px' value={rowMap.kl} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, kl: event.target.value }))} maxLength={50} /></th>
              <th><input className='input150px' value={rowMap.cl} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, cl: event.target.value }))} maxLength={50} /></th>
              <th><input className='input150px' value={rowMap.el} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, el: event.target.value }))} maxLength={50} /></th>
              <th><input className='input150px' value={rowMap.rl} onInput={(event) => setRowArr(getNewArr(rowArr, index, { ...rowMap, rl: event.target.value }))} maxLength={50} /></th>
              <th><span>{rowMap.regdate}</span></th>
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