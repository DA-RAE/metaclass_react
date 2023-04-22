import styled from 'styled-components';
import { useEffect, useState } from 'react';

function IngameTable() {
  useEffect(() => {
    selectRow();
  }, []);

  const phpHost = 'http://localhost';
  const phpUrl = {
    select: phpHost + '/php/ingame/select.php',
    insert: phpHost + '/php/ingame/insert.php',
    update: phpHost + '/php/ingame/update.php',
    delete: phpHost + '/php/ingame/delete.php'
  };
  const column = { id: '', irum: '', game1: '', game2: '', game3: '', game4: '', game5: '', game6: '', game7: '', total: '', avg: '' };
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
    setRowm((prevState) => ({ ...prevState, total: getTotal({ ...prevState, [event.target.name]: value }) }));
    setRowm((prevState) => ({ ...prevState, avg: getAvg({ ...prevState, [event.target.name]: value }) }));
  }

  function handleInputRows(event, index) {
    let value = event.target.value;
    if (event.target.pattern == '^[0-9]*$')
      value = value.replace(/[^0-9]/g, "");
    else if (event.target.pattern == '^[a-zA-Z]*$')
      value = value.replace(/[^A-Za-z]/g, "");
    else if (event.target.pattern == '^[a-zA-Z0-9]*$')
      value = value.replace(/[^A-Za-z0-9]/g, "");
    setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...prevState[index], [event.target.name]: value, btnOpt: true }) : v));
    setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...prevState[index], total: getTotal({ ...prevState[index], [event.target.name]: value }) }) : v));
    setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...prevState[index], avg: getAvg({ ...prevState[index], [event.target.name]: value }) }) : v));
  }

  function getTotal(row) {
    return (parseInt(row.game1) + parseInt(row.game2) + parseInt(row.game3) + parseInt(row.game4) + parseInt(row.game5) + parseInt(row.game6) + parseInt(row.game7)).toString();
  }

  function getAvg(row) {
    return parseInt(getTotal(row) / 7).toString();
  }

  async function selectRow() {
    const result = await post(phpUrl.select, null);
    if (result !== '')
      setRows(result.map((row) => ({ ...row, btnOpt: false })));
    setRowm(column);
  }

  async function insertRow() {
    if (rows.some(row => row.id === rowm.id))
      alert('중복된 아이디입니다')
    else if (rowm.id.length < 1 ||
      rowm.irum.length < 1 ||
      rowm.game1.length < 1 ||
      rowm.game2.length < 1 ||
      rowm.game3.length < 1 ||
      rowm.game4.length < 1 ||
      rowm.game5.length < 1 ||
      rowm.game6.length < 1 ||
      rowm.game7.length < 1)
      alert('각 항목은 필수 입력사항입니다');
    else {
      const value = { ...rowm };
      const result = await post(phpUrl.insert, value);
      if (result === 'SUCCESS') {
        setRows((prevState) => [...prevState, { ...value, total: getTotal(value), avg: getAvg(value), btnOpt: false }]);
        setRowm(column);
      }
    }
  }

  async function updateRow(index) {
    if (rows[index].irum.length < 1 ||
      rows[index].game1.length < 1 ||
      rows[index].game2.length < 1 ||
      rows[index].game3.length < 1 ||
      rows[index].game4.length < 1 ||
      rows[index].game5.length < 1 ||
      rows[index].game6.length < 1 ||
      rows[index].game7.length < 1)
      alert('각 항목은 필수 입력사항입니다');
    else {
      const value = { ...rows[index] };
      const result = await post(phpUrl.update, value);
      if (result === 'SUCCESS')
        setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...value, total: getTotal(value), avg: getAvg(value), btnOpt: false }) : v));
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
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Table>
        <tr>
          <Th>ID</Th>
          <Th>이름</Th>
          <Th>게임1</Th>
          <Th>게임2</Th>
          <Th>게임3</Th>
          <Th>게임4</Th>
          <Th>게임5</Th>
          <Th>게임6</Th>
          <Th>게임7</Th>
          <Th>합계</Th>
          <Th>평균</Th>
          <Th></Th>
        </tr>
        <tr>
          <Th><Input name='id' value={rowm.id} onChange={handleInputRowm} width='100px' minLength={1} maxLength={13} pattern='^[a-zA-Z0-9]*$' required /></Th>
          <Th><Input name='irum' value={rowm.irum} onChange={handleInputRowm} width='100px' minLength={1} maxLength={10} required /></Th>
          <Th><Input name='game1' value={rowm.game1} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='game2' value={rowm.game2} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='game3' value={rowm.game3} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='game4' value={rowm.game4} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='game5' value={rowm.game5} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='game6' value={rowm.game6} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='game7' value={rowm.game7} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th>{rowm.total}</Th>
          <Th>{rowm.avg}</Th>
          <Th><Button onClick={insertRow} color='cyan'>추가</Button></Th>
        </tr>
        {rows.map((row, index) =>
          <tr>
            <Th>{row.id}</Th>
            <Th><Input name='irum' value={row.irum} onChange={(event) => handleInputRows(event, index)} width='100px' minLength={1} maxLength={10} required /></Th>
            <Th><Input name='game1' value={row.game1} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='game2' value={row.game2} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='game3' value={row.game3} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='game4' value={row.game4} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='game5' value={row.game5} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='game6' value={row.game6} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='game7' value={row.game7} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th>{row.total}</Th>
            <Th>{row.avg}</Th>
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

export default IngameTable;