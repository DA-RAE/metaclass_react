import '../../resource/style.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  
  function wordButton() {
    navigate('/word');
  }

  return (
    <>
      <title>MetaClass 관리자 페이지</title>
      <button className='pageButton' onClick={wordButton}>단어학습</button>
    </>
  );
}

export default Main;