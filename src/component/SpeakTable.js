import styled from 'styled-components';
import { useEffect, useState } from 'react';

function SpeakTable() {
  useEffect(() => {
    selectRow();
  }, []);

  const phpHost = 'http://localhost';
  const phpUrl = {
    autoIncre: phpHost + '/php/speak/autoIncre.php',
    select: phpHost + '/php/speak/select.php',
    insert: phpHost + '/php/speak/insert.php',
    update: phpHost + '/php/speak/update.php',
    delete: phpHost + '/php/speak/delete.php'
  };
  const column = { no: '', language: '', level: '', chapter: '', gubun: '', id: '', kl: '', cl: '', el: '', rl: '', date: '' };
  const [rowm, setRowm] = useState(column);
  const [rows, setRows] = useState([]);

  function handleInputRowm(event) {
    let value = event.target.value;
    if (event.target.pattern == '^[0-9]*$')
      value = value.replace(/[^0-9]/g, "");
    else if (event.target.pattern == '^[a-zA-Z]*$')
      value = value.replace(/[^A-Za-z]/g, "");
    else if (event.target.pattern == '^[a-zA-Z0-9]*$')
      value = value.replace(/[^A-Za-z0-9]/g, "");
      setRowm((prevState) => ({ ...prevState, [event.target.name]: value, }));
      setRowm((prevState) => ({ ...prevState, id: getId({ ...prevState, [event.target.name]: value, date: getDate() }) }));
  }

  function handleInputRows(event, index) {
    let value = event.target.value;
    if (event.target.pattern == '^[0-9]*$')
      value = value.replace(/[^0-9]/g, "");
    else if (event.target.pattern == '^[a-zA-Z]*$')
      value = value.replace(/[^A-Za-z]/g, "");
    else if (event.target.pattern == '^[a-zA-Z0-9]*$')
      value = value.replace(/[^A-Za-z0-9]/g, "");
      setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...prevState[index], [event.target.name]: value, date: getDate(), btnOpt: true }) : v));
      setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...prevState[index], id: getId({ ...prevState[index], [event.target.name]: value }) }) : v));
  }

  function getId(row) {
    return row.no.toString().padStart(3, '0') + row.language + row.level + row.chapter + row.gubun;
  }

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
  }

  async function initializeRowm() {
    const result = await post(phpUrl.autoIncre, null);
    if (result !== '')
      setRowm({ ...column, no: result, date: getDate() });
  }

  async function selectRow() {
    const result = await post(phpUrl.select, null);
    if (result !== '') {
      setRows(result.map((row) => ({ ...row, btnOpt: false })));
      initializeRowm();
    }
  }

  async function insertRow() {
    if (rowm.language.length < 2 ||
      rowm.level.length < 1 ||
      rowm.chapter.length < 2 ||
      rowm.gubun.length < 1 ||
      rowm.kl.length < 1 ||
      rowm.cl.length < 1 ||
      rowm.el.length < 1 ||
      rowm.rl.length < 1)
      alert('각 항목은 필수 입력사항입니다');
    else {
      const value = { ...rowm };
      const result = await post(phpUrl.insert, value);
      if (result === 'SUCCESS') {
        setRows((prevState) => [...prevState, { ...value, btnOpt: false }]);
        initializeRowm();
      }
    }
  }

  async function updateRow(index) {
    if (rows[index].language.length < 2 ||
      rows[index].level.length < 1 ||
      rows[index].chapter.length < 2 ||
      rows[index].gubun.length < 1 ||
      rows[index].kl.length < 1 ||
      rows[index].cl.length < 1 ||
      rows[index].el.length < 1 ||
      rows[index].rl.length < 1)
      alert('각 항목은 필수 입력사항입니다');
    else {
      const value = { ...rows[index] };
      const result = await post(phpUrl.update, value);
      if (result === 'SUCCESS')
        setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...value, btnOpt: false }) : v));
    }
  }

  async function deleteRow(index) {
    const value = { ...rows[index] };
    const result = await post(phpUrl.delete, value);
    if (result === 'SUCCESS')
      setRows((prevState) => prevState.filter((_, i) => i !== index));
  }

  async function post(url, value) {
    const data = new URLSearchParams(value);
    const response = await fetch(url, { method: 'POST', body: data });
    const result = await response.json();
    return result;
  }

  return (
    <>
      <Table>
        <tr>
          <Th>번호</Th>
          <Th>언어</Th>
          <Th>레벨</Th>
          <Th>단원</Th>
          <Th>구분</Th>
          <Th>키 값</Th>
          <Th>한국어</Th>
          <Th>중국어</Th>
          <Th>영어</Th>
          <Th>러시아어</Th>
          <Th>갱신일자</Th>
          <Th></Th>
        </tr>
        <tr>
          <Th>{rowm.no}</Th>
          <Th><Input name='language' value={rowm.language} onChange={handleInputRowm} width='25px' minLength={2} maxLength={2} pattern='^[a-zA-Z]*$' required /></Th>
          <Th><Input name='level' value={rowm.level} onChange={handleInputRowm} width='25px' minLength={1} maxLength={1} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='chapter' value={rowm.chapter} onChange={handleInputRowm} width='25px' minLength={2} maxLength={2} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='gubun' value={rowm.gubun} onChange={handleInputRowm} width='25px' minLength={1} maxLength={1} pattern='^[0-9]*$' required /></Th>
          <Th>{rowm.id}</Th>
          <Th><Input name='kl' value={rowm.kl} onChange={handleInputRowm} width='150px' minLength={1} maxLength={200} required /></Th>
          <Th><Input name='cl' value={rowm.cl} onChange={handleInputRowm} width='150px' minLength={1} maxLength={200} required /></Th>
          <Th><Input name='el' value={rowm.el} onChange={handleInputRowm} width='150px' minLength={1} maxLength={200} required /></Th>
          <Th><Input name='rl' value={rowm.rl} onChange={handleInputRowm} width='150px' minLength={1} maxLength={200} required /></Th>
          <Th>{rowm.date}</Th>
          <Th><Button onClick={insertRow} color='cyan'>추가</Button></Th>
        </tr>
        {rows.map((row, index) =>
          <tr>
            <Th>{row.no}</Th>
            <Th><Input name='language' value={row.language} onChange={(event) => handleInputRows(event, index)} width='25px' minLength={2} maxLength={2} pattern='^[a-zA-Z]*$' required /></Th>
            <Th><Input name='level' value={row.level} onChange={(event) => handleInputRows(event, index)} width='25px' minLength={1} maxLength={1} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='chapter' value={row.chapter} onChange={(event) => handleInputRows(event, index)} width='25px' minLength={2} maxLength={2} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='gubun' value={row.gubun} onChange={(event) => handleInputRows(event, index)} width='25px' minLength={1} maxLength={1} pattern='^[0-9]*$' required /></Th>
            <Th>{row.id}</Th>
            <Th><Input name='kl' value={row.kl} onChange={(event) => handleInputRows(event, index)} width='150px' minLength={1} maxLength={200} required /></Th>
            <Th><Input name='cl' value={row.cl} onChange={(event) => handleInputRows(event, index)} width='150px' minLength={1} maxLength={200} required /></Th>
            <Th><Input name='el' value={row.el} onChange={(event) => handleInputRows(event, index)} width='150px' minLength={1} maxLength={200} required /></Th>
            <Th><Input name='rl' value={row.rl} onChange={(event) => handleInputRows(event, index)} width='150px' minLength={1} maxLength={200} required /></Th>
            <Th>{row.date}</Th>
            <Th><Button onClick={row.btnOpt ? () => updateRow(index) : () => deleteRow(index)} color={row.btnOpt ? 'lightgreen' : 'red'}>{row.btnOpt ? '수정' : '삭제'}</Button></Th>
          </tr>
        )}
      </Table>
    </>
  );
}

const Input = styled.input`
    width: ${(props) => props.width};
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
    cursor: pointer;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-family: 'NanumGothicBold';
    color: ${(props) => props.color};
    font-size: 15px;

    &:active {
        position: relative;
        top: 1px;
    }
`;

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
`;

export default SpeakTable;