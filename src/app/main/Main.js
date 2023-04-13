import '../../style.css';
import { useNavigate } from 'react-router-dom';

function Main() {
  const navigate = useNavigate();
  
  function wordButton() {
    navigate('/word');
  }
  function speakButton() {
    navigate('/speak');
  }
  function memberButton() {
    navigate('/member');
  }
  function gradeButton() {
    navigate('/grade');
  }

  return (
    <>
      <title>MetaClass 관리자 페이지</title>
      <button className='pageButton' onClick={wordButton}>단어학습</button>
      <button className='pageButton' onClick={speakButton}>회화연습</button>
      <button className='pageButton' onClick={memberButton}>회원관리</button>
      <button className='pageButton' onClick={gradeButton}>성적관리</button>
    </>
  );
}

export default Main;