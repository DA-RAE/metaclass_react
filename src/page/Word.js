import '../css/style.css';
import { useNavigate } from 'react-router-dom';

function Word() {
  const navigate = useNavigate();

  function mainButton() {
    navigate('/');
  }

  return (
    <>
      <title>단어학습</title>
      <button className='mainButton' onClick={mainButton}>MetaClass</button>
      <br />
    </>
  );
}

export default Word;