import styled from 'styled-components';
import { useEffect, useState } from 'react';

function IngameTable() {
  useEffect(() => {
    selectRow();
  }, []);

  const phpHost = 'http://localhost';
  const phpUrl = {
    select: phpHost + '/php/grade/select.php',
    insert: phpHost + '/php/grade/insert.php',
    update: phpHost + '/php/grade/update.php',
    delete: phpHost + '/php/grade/delete.php'
  };
  const column = { id: '', irum: '', game: 0, chapter: 0, mid: 0, final: 0, total: 0, rank: 0 };
  const [rowm, setRowm] = useState(column);
  const [rows, setRows] = useState([]);

  function handleInputRowm(event) {
    let value = event.target.value;
    if (event.target.pattern == '^[0-9]*$')
      value = value.replace(/[^0-9]/g, "");
    else if (event.target.pattern == '^[a-zA-Z]*$')
      value = value.replace(/[^A-Za-z]/g, "");
    setRowm((prevState) => ({ ...prevState, [event.target.name]: value }));
  }

  function handleInputRows(event, index) {
    let value = event.target.value;
    if (event.target.pattern == '^[0-9]*$')
      value = value.replace(/[^0-9]/g, "");
    else if (event.target.pattern == '^[a-zA-Z]*$')
      value = value.replace(/[^A-Za-z]/g, "");
    setRows((prevState) => [...prevState].map((v, i) => i === index ? ({ ...prevState[index], [event.target.name]: value, btnOpt: true }) : v));
  }

  async function selectRow() {
    const result = await post(phpUrl.select, null);
    if (result !== '') {
      setRows(result.map((row) => ({ ...row, btnOpt: false })));
      setRowm(column);
    }
  }

  async function insertRow() {
    if (rowm.id < 1 ||
      rowm.irum < 1 ||
      rowm.game < 1 ||
      rowm.chapter < 1 ||
      rowm.mid < 1 ||
      rowm.final < 1 ||
      rowm.total < 1 ||
      rowm.rank < 1)
      alert('각 항목은 필수 입력사항입니다');
    else {
      const value = { ...rowm };
      const result = await post(phpUrl.insert, value);
      if (result === 'SUCCESS') {
        setRows((prevState) => [...prevState, { ...value, btnOpt: false }]);
        setRowm(column);
      }
    }
  }

  async function updateRow(index) {
    if (rows[index].irum < 1 ||
      rows[index].game < 1 ||
      rows[index].chapter < 1 ||
      rows[index].mid < 1 ||
      rows[index].final < 1 ||
      rows[index].total < 1 ||
      rows[index].rank < 1)
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
    const data = new FormData(value);
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
          <Th>게임</Th>
          <Th>단원</Th>
          <Th>중간</Th>
          <Th>최종</Th>
          <Th>합계</Th>
          <Th>순위</Th>
          <Th></Th>
        </tr>
        <tr>
          <Th><Input name='id' value={rowm.id} onChange={handleInputRowm} width='100px' minLength={1} maxLength={13} pattern='^[a-zA-Z0-9]*$' required /></Th>
          <Th><Input name='irum' value={rowm.irum} onChange={handleInputRowm} width='100px' minLength={1} maxLength={10} required /></Th>
          <Th><Input name='game' value={rowm.game} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='chapter' value={rowm.chapter} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='mid' value={rowm.mid} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='final' value={rowm.final} onChange={handleInputRowm} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='total' value={rowm.total} onChange={handleInputRowm} width='30px' minLength={1} maxLength={5} pattern='^[0-9]*$' required /></Th>
          <Th><Input name='rank' value={rowm.rank} onChange={handleInputRowm} width='30px' minLength={1} maxLength={5} pattern='^[0-9]*$' required /></Th>
          <Th><Button onClick={insertRow} color='cyan'>추가</Button></Th>
        </tr>
        {rows.map((row, index) =>
          <tr>
            <Th>{row.id}</Th>
            <Th><Input name='irum' value={row.irum} onChange={(event) => handleInputRows(event, index)} width='100px' minLength={1} maxLength={10} required /></Th>
            <Th><Input name='game' value={row.game} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='chapter' value={row.chapter} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='mid' value={row.mid} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='final' value={row.final} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={3} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='total' value={row.total} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={5} pattern='^[0-9]*$' required /></Th>
            <Th><Input name='rank' value={row.rank} onChange={(event) => handleInputRows(event, index)} width='30px' minLength={1} maxLength={5} pattern='^[0-9]*$' required /></Th>
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