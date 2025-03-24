import {useState} from 'react';
import './App.css';
import Modal from './components/Modal.js'

function App() {

  const [openModal, setOpenModal] = useState(false)
  const [author, setAuthor] = useState('')

  const handleAuthorChange = (e) => {    
    setTimeout(()=> {
      setAuthor(e.target.value)
    }, '500')
  }

  const handleModalList = () => {
    setOpenModal(true)
  }

  const active = author?.length > 0

  return (
    <div className={'App'}>
      <Modal isOpen={openModal} author={author}/>
      <h1>Welcome to your to do list!</h1>
      <h2>Please tell us your name to start organizing your tasks:</h2>
      <input
         onChange={(e) => handleAuthorChange(e)}
      />
      {<button className={active ? 'active' : 'inactive'} onClick={() => handleModalList()}>See Tasks</button>}
    </div>
  );
}

export default App;
