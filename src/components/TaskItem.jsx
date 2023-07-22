import React, {useState} from 'react'
import { IoCloseCircleSharp, IoHammerSharp } from 'react-icons/io5'
import Modal from './Modal'

const TaskItem = ({task, number, deleteTask, editTask}) => {

    const [modalActive, setModalActive] = useState(false);

    return (
        <div className='task'>
            <div className="task__header">
                <div className="task__title">{number}. {task.title}</div>
                <div>
                    <IoHammerSharp className='task__btn-edit' onClick={() => setModalActive(true)}/>
                    <IoCloseCircleSharp className='task__btn-delete' onClick={() => deleteTask(task.id)}/>
                </div>
            </div>
            <div className="task__body">
                <div className="task__text">{task.text}</div>
            </div>
            <Modal active={modalActive} setActive={setModalActive} title={"Изменить задачу"} task={task} modalType={"Изменить"} editTask={editTask}/>
        </div>
    )
}

export default TaskItem