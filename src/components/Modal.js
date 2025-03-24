import './Modal.css';
import {useState, useReducer} from 'react';
import TaskCard from './TaskCard';

export const ACTIONS = {
    ADD_TASK: 'add-task',
    REMOVE_TASK: 'remove-task',
    EDIT_TASK: 'edit-task',
    COMPLETE_TASK: 'complete-task'
    
}

function reducer (taskList, action) {
    switch (action.type) {
        case ACTIONS.ADD_TASK:
            return [...taskList, addTask(action.payload)]
        
        case ACTIONS.REMOVE_TASK:
            return taskList.filter( task => task.id !== action.payload.id)

        case ACTIONS.EDIT_TASK:
            return taskList.map(task => {
                    const newTask = action.payload
                    if(task.id === newTask.id) {
                      return {...task, title: newTask.title, startDate: newTask.startDate}  
                    }
                    return task
                })

        case ACTIONS.COMPLETE_TASK:
            return taskList.map(task => {
                const dateNow = new Date(Date.now())
                const startDate = new Date(task.startDate)

                if(task.id === action.payload.id && dateNow.getTime() > startDate.getTime()) {
                    const formattedDate = dateNow.toString().slice(0, 16)

                    return {...task, complete: !task.complete, endDate: formattedDate}
                }

                return task          
            })
        

    }
}

function addTask(task) {
    return { ...task, id: Date.now(), complete: false}
}


function Modal (props) {
    const [taskList, dispatch] = useReducer(reducer, [])
    const [filter, setFilter] = useState('all')
    const {isOpen, author} = props

    return isOpen && (
    <div className="modal">
        {taskList?.length > 0 ?
            (<p>Hey {author} this is your task list:</p>) :
            (<p>Hey {author} let's add yout first task!</p>)
        }
        <TaskCard mode="add" author={author} dispatch={dispatch}/>
        <label>
            Filter:
            <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
            >
                <option value='all'>All Tasks</option>
                <option value='completed'>Completed Tasks</option>
                <option value='wip'>In progress Tasks</option>
            </select>
        </label>
        
        {taskList?.length > 0 &&
        (<ul className='list'>
            {taskList.map((el) => 
            { const taskCard = <TaskCard key={el?.id} task={el} mode={'display'} dispatch={dispatch}/>
                if(filter === 'completed') {
                    return el.complete && taskCard
                }
                if(filter === 'wip') {
                    return !el.complete && taskCard
                }
                else{return taskCard}            
        }
            )}
        </ul>)}
    </div>)
}


export default Modal;

