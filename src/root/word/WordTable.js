import styled from 'styled-components';
import { useEffect, useState } from 'react';

function WordTable() {
  //CSS in JS
  const Table = styled.table`
    margin-left: auto;
    margin-right: auto;
    border-top: 1px solid white;
    border-collapse: collapse;
    padding: 10px;
  `;

  const Th = styled.th`
    border-bottom: 1px solid white;
    padding: 10px;
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 15px;
    font-weight: bold;
    color: white;
  `;

  const Input = styled.input`
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
    background-color: rgba(0, 0, 0, 0);
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 15px;
    font-weight: bold;
    color: white;

    &.w25px {
      width: 25px;
    }

    &.w150px {
      width: 150px;
    }

    &:focus {
      border-color: white;
    }
  `;

  const Button = styled.button`
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 15px;
    font-weight: bold;

    &.insert {
      color: cyan;
    }

    &.update {
      color: lightgreen;
    }

    &.delete {
      color: lightcoral;
    }

    &:active {
      position: relative;
      top: 1px;
    }
  `;

  //Java Script
  useEffect(() => {
    selectRow();
  }, []);

  const column = { no: 0, language: '', level: '', chapter: '', gubun: '', kl: '', cl: '', el: '', rl: '', date: '' };
  const [rowMain, setRowMain] = useState(column);
  const [rows, setRows] = useState([]);
  
  function toEng(value) {
    return value.replace(/[^a-zA-Z]/g, '');
  }

  function toNum(value) {
    return value.replace(/[^0-9]/g, '');
  }

  function newArr(index, value) {
    return [...rows].map((v, i) => i === index ? value : v);
  }

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
  }

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
          .then(() => setRows(newArr(index, { ...row, btnOpt: false })));
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

  //React JSX
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th>번호</Th>
            <Th>언어</Th>
            <Th>레벨</Th>
            <Th>단원</Th>
            <Th>구분</Th>
            <Th>한국어</Th>
            <Th>중국어</Th>
            <Th>영어</Th>
            <Th>러시아어</Th>
            <Th>갱신일자</Th>
            <Th></Th>
          </tr>
          <tr>
            <Th><span>{rowMain.no}</span></Th>
            <Th><Input className='w25px' value={rowMain.language} onInput={(event) => setRowMain({ ...rowMain, language: toEng(event.target.value) })} maxLength={2} /></Th>
            <Th><Input className='w25px' value={rowMain.level} onInput={(event) => setRowMain({ ...rowMain, level: toNum(event.target.value) })} maxLength={1} /></Th>
            <Th><Input className='w25px' value={rowMain.chapter} onInput={(event) => setRowMain({ ...rowMain, chapter: toNum(event.target.value) })} maxLength={2} /></Th>
            <Th><Input className='w25px' value={rowMain.gubun} onInput={(event) => setRowMain({ ...rowMain, gubun: toNum(event.target.value) })} maxLength={1} /></Th>
            <Th><Input className='w150px' value={rowMain.kl} onInput={(event) => setRowMain({ ...rowMain, kl: event.target.value })} maxLength={50} /></Th>
            <Th><Input className='w150px' value={rowMain.cl} onInput={(event) => setRowMain({ ...rowMain, cl: event.target.value })} maxLength={50} /></Th>
            <Th><Input className='w150px' value={rowMain.el} onInput={(event) => setRowMain({ ...rowMain, el: event.target.value })} maxLength={50} /></Th>
            <Th><Input className='w150px' value={rowMain.rl} onInput={(event) => setRowMain({ ...rowMain, rl: event.target.value })} maxLength={50} /></Th>
            <Th><span>{rowMain.date}</span></Th>
            <Th><Button className='insert' onClick={insertRow}>추가</Button></Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((rowMap, index) =>
            <tr>
              <Th><span>{rowMap.no}</span></Th>
              <Th><Input className='w25px' value={rowMap.language} onInput={(event) => setRows(newArr(index, { ...rowMap, language: toEng(event.target.value), btnOpt: true }))} maxLength={2} /></Th>
              <Th><Input className='w25px' value={rowMap.level} onInput={(event) => setRows(newArr(index, { ...rowMap, level: toNum(event.target.value), btnOpt: true }))} maxLength={1} /></Th>
              <Th><Input className='w25px' value={rowMap.chapter} onInput={(event) => setRows(newArr(index, { ...rowMap, chapter: toNum(event.target.value), btnOpt: true }))} maxLength={2} /></Th>
              <Th><Input className='w25px' value={rowMap.gubun} onInput={(event) => setRows(newArr(index, { ...rowMap, gubun: toNum(event.target.value), btnOpt: true }))} maxLength={1} /></Th>
              <Th><Input className='w150px' value={rowMap.kl} onInput={(event) => setRows(newArr(index, { ...rowMap, kl: event.target.value, btnOpt: true }))} maxLength={50} /></Th>
              <Th><Input className='w150px' value={rowMap.cl} onInput={(event) => setRows(newArr(index, { ...rowMap, cl: event.target.value, btnOpt: true }))} maxLength={50} /></Th>
              <Th><Input className='w150px' value={rowMap.el} onInput={(event) => setRows(newArr(index, { ...rowMap, el: event.target.value, btnOpt: true }))} maxLength={50} /></Th>
              <Th><Input className='w150px' value={rowMap.rl} onInput={(event) => setRows(newArr(index, { ...rowMap, rl: event.target.value, btnOpt: true }))} maxLength={50} /></Th>
              <Th><span>{rowMap.date}</span></Th>
              <Th><Button className={rowMap.btnOpt ? 'updete' : 'delete'} onClick={rowMap.btnOpt ? () => updateRow(index) : () => deleteRow(index)}>{rowMap.btnOpt ? '수정' : '삭제'}</Button></Th>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default WordTable;