import {useState} from 'react';
import './TaskCard.css'
import {ACTIONS} from './Modal.js';

function TaskCard (props) {
    const {task, dispatch, mode: propMode, author} = props
    const [mode, setMode] = useState(propMode) 
    let render


    const handleAddTask = (e) => {
        e.preventDefault()
        props.dispatch({ type: ACTIONS.ADD_TASK, payload: {
            author,
            title: e.target[0].value,
            startDate: e.target[1].value}})
    }

    const handleEditTask = (e) => {
        e.preventDefault()
        props.dispatch({ type: ACTIONS.EDIT_TASK, payload: {
            id: task.id,
            title: e.target[0].value,
            startDate: e.target[1].value}})

        setMode('display')
        
    }

    if(mode === 'edit' || mode === 'add') {
        render = 
        <form onSubmit={mode === 'edit' ? handleEditTask : handleAddTask}>
                <input id='title' minLength="1" maxLength="100" placeholder='Task' />
                <input type="date" id='startDate' placeholder='Start Date' />
                <button type='submit'>{mode} task</button>
        </form>
    }

    if(mode === 'display'){
        render = [ 
        <div className='info-section'>
            <span>Task: {task?.title}</span>
            <span>Start Date:{task?.startDate}</span>
            <span>Author: {task?.author}</span>
        </div>,

        <div className='button-section'>
            <button className='buttons' onClick={() => setMode('edit')}> Edit </button>
            <button className='buttons' onClick={() => dispatch({type: ACTIONS.REMOVE_TASK, payload: {id: task?.id}})}> Delete </button>
            {task?.complete ?
                (<span className='completed'> &#9989; {task?.endDate}</span>) :
                (<button className='buttons' onClick={() => dispatch({type: ACTIONS.COMPLETE_TASK, payload: {id: task?.id}})}>
                    Complete </button>)}
        </div>]
    }


    return (
        <li className="card">
            {render}
        </li>
    )
        
}

export default TaskCard;