import '../../style.css';
import { useEffect, useState } from 'react';
import { toEng, toNum, newArr, getDate } from '../../function'

function Word() {
  useEffect(() => {
    selectRow();
  }, []);

  const column = { no: 0, language: '', level: '', chapter: '', gubun: '', kl: '', cl: '', el: '', rl: '', date: '' };
  const [rowMain, setRowMain] = useState(column);
  const [rows, setRows] = useState([]);

  function message(index) {
    if (index == null) {
      return (
        `번호 : ${rowMain.no}\n` +
        `언어 : ${rowMain.language}\n` +
        `레벨 : ${rowMain.level}\n` +
        `단원 : ${rowMain.chapter}\n` +
        `구분 : ${rowMain.gubun}\n` +
        `한국어 : ${rowMain.kl}\n` +
        `중국어 : ${rowMain.cl}\n` +
        `영어 : ${rowMain.el}\n` +
        `러시아어 : ${rowMain.rl}\n` +
        `갱신일자 : ${rowMain.date}`);
    }
    else {
      return (
        `번호 : ${rows[index].no}\n` +
        `언어 : ${rows[index].language}\n` +
        `레벨 : ${rows[index].level}\n` +
        `단원 : ${rows[index].chapter}\n` +
        `구분 : ${rows[index].gubun}\n` +
        `한국어 : ${rows[index].kl}\n` +
        `중국어 : ${rows[index].cl}\n` +
        `영어 : ${rows[index].el}\n` +
        `러시아어 : ${rows[index].rl}\n` +
        `갱신일자 : ${rows[index].date}`);
    }
  }

  function initializeRowMain() {
    fetch('http://localhost/php/word/autoIncre.php', { method: 'POST' })
      .then((respons) => respons.json())
      .then((result) => setRowMain({ ...column, no: result, date: getDate() }));
  }

  function selectRow() {
    fetch('http://localhost/php/word/select.php', { method: 'POST' })
      .then((respons) => respons.json())
      .then((result) => setRows(result.map((row) => ({ ...row, btnOpt: false }))))
      .then(() => initializeRowMain());
  }

  function insertRow() {
    let alertMsg = '';
    if (rowMain.language.length < 2) alertMsg += `'언어' 값은 2자 이상이어야 합니다.\n\n`;
    if (rowMain.level.length < 1) alertMsg += `'레벨' 값은 1자 이상이어야 합니다.\n\n`;
    if (rowMain.chapter.length < 2) alertMsg += `'단원' 값은 2자 이상이어야 합니다.\n\n`;
    if (rowMain.gubun.length < 1) alertMsg += `'구분' 값은 1자 이상이어야 합니다.\n\n`;
    if (alertMsg !== '') {
      alertMsg = alertMsg.slice(0, -2);
      alert(alertMsg);
    }
    else {
      if (window.confirm(message(null))) {
        const row = { ...rowMain };
        const data = new URLSearchParams(row);
        fetch('http://localhost/php/word/insert.php', { method: 'POST', body: data })
          .then(() => setRows([...rows, { ...row, btnOpt: false }]))
          .then(() => initializeRowMain());
      }
    }
  }

  function updateRow(index) {
    let alertMsg = '';
    if (rows[index].language.length < 2) alertMsg += `'언어' 값은 2자 이상이어야 합니다.\n\n`;
    if (rows[index].level.length < 1) alertMsg += `'레벨' 값은 1자 이상이어야 합니다.\n\n`;
    if (rows[index].chapter.length < 2) alertMsg += `'단원' 값은 2자 이상이어야 합니다.\n\n`;
    if (rows[index].gubun.length < 1) alertMsg += `'구분' 값은 1자 이상이어야 합니다.\n\n`;
    if (alertMsg !== '') {
      alertMsg = alertMsg.slice(0, -2);
      alert(alertMsg);
    }
    else {
      if (window.confirm(message(index))) {
        const row = { ...rows[index] };
        const data = new URLSearchParams(row);
        fetch('http://localhost/php/word/update.php', { method: 'POST', body: data })
          .then(() => setRows(newArr(rows, index, { ...row, btnOpt: false })));
      }
    }
  }

  function deleteRow(index) {
    if (window.confirm(message(index))) {
      const row = { ...rows[index] };
      const data = new URLSearchParams(row);
      fetch('http://localhost/php/word/delete.php', { method: 'POST', body: data })
        .then(() => setRows(rows.filter((_, i) => i !== index)));
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
          </tr>
          <tr>
            <th><span>{rowMain.no}</span></th>
            <th><input className='input25px' value={rowMain.language} onInput={(event) => setRowMain({ ...rowMain, language: toEng(event.target.value) })} maxLength={2} /></th>
            <th><input className='input25px' value={rowMain.level} onInput={(event) => setRowMain({ ...rowMain, level: toNum(event.target.value) })} maxLength={1} /></th>
            <th><input className='input25px' value={rowMain.chapter} onInput={(event) => setRowMain({ ...rowMain, chapter: toNum(event.target.value) })} maxLength={2} /></th>
            <th><input className='input25px' value={rowMain.gubun} onInput={(event) => setRowMain({ ...rowMain, gubun: toNum(event.target.value) })} maxLength={1} /></th>
            <th><input className='input150px' value={rowMain.kl} onInput={(event) => setRowMain({ ...rowMain, kl: event.target.value })} maxLength={50} /></th>
            <th><input className='input150px' value={rowMain.cl} onInput={(event) => setRowMain({ ...rowMain, cl: event.target.value })} maxLength={50} /></th>
            <th><input className='input150px' value={rowMain.el} onInput={(event) => setRowMain({ ...rowMain, el: event.target.value })} maxLength={50} /></th>
            <th><input className='input150px' value={rowMain.rl} onInput={(event) => setRowMain({ ...rowMain, rl: event.target.value })} maxLength={50} /></th>
            <th><span>{rowMain.date}</span></th>
            <th><button className='insertButton' onClick={insertRow}>추가</button></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((rowMap, index) =>
            <tr>
              <th><span>{rowMap.no}</span></th>
              <th><input className='input25px' value={rowMap.language} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, language: toEng(event.target.value), btnOpt: true }))} maxLength={2} /></th>
              <th><input className='input25px' value={rowMap.level} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, level: toNum(event.target.value), btnOpt: true }))} maxLength={1} /></th>
              <th><input className='input25px' value={rowMap.chapter} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, chapter: toNum(event.target.value), btnOpt: true }))} maxLength={2} /></th>
              <th><input className='input25px' value={rowMap.gubun} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, gubun: toNum(event.target.value), btnOpt: true }))} maxLength={1} /></th>
              <th><input className='input150px' value={rowMap.kl} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, kl: event.target.value, btnOpt: true }))} maxLength={50} /></th>
              <th><input className='input150px' value={rowMap.cl} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, cl: event.target.value, btnOpt: true }))} maxLength={50} /></th>
              <th><input className='input150px' value={rowMap.el} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, el: event.target.value, btnOpt: true }))} maxLength={50} /></th>
              <th><input className='input150px' value={rowMap.rl} onInput={(event) => setRows(newArr(rows, index, { ...rowMap, rl: event.target.value, btnOpt: true }))} maxLength={50} /></th>
              <th><span>{rowMap.date}</span></th>
              <th><button className={rowMap.btnOpt ? 'updateButton' : 'deleteButton'} onClick={rowMap.btnOpt ? () => updateRow(index) : () => deleteRow(index)}>{rowMap.btnOpt ? '수정' : '삭제'}</button></th>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Word;