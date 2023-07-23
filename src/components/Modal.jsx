import React, {useRef} from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'

const Modal = ({active, setActive, title, task, modalType, addTask, editTask}) => {
    const newTask = {
        title: task ? task.title : "",
        text: task ? task.text : "",
    };

    const formRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        formRef.current.reset();
    };

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive()}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">{title ? title : ""}</div>
                    <IoCloseCircleSharp 
                        className='task__btn-delete' 
                        onClick={() => setActive()}
                    />
                </div>
                <form className="modal__body" onSubmit={handleSubmit} ref={formRef}>
                    <div className="modal__item">
                        <label className='modal__label' htmlFor="name">Название</label>
                        <input className='modal__input' type="text" placeholder='Название...' id='name' defaultValue={task ? task.title : ""} onChange={(e) => newTask.title = e.target.value}/>
                    </div>
                    <div className="modal__item">
                        <label className='modal__label' htmlFor="text">Текст</label>
                        <textarea className='modal__textarea' type="text" placeholder='Текст...' id='text' defaultValue={task ? task.text : ""} onChange={(e) => newTask.text = e.target.value}></textarea>
                    </div>
                    <div className="modal__footer">
                        <button type='button' className="modal__btn-add" onClick={() => {
                                formRef.current.reset();
                                if (addTask) {
                                    addTask(newTask)
                                } else if (editTask) {
                                    newTask.id = task.id
                                    editTask(newTask)
                                }
                            }
                        }>{modalType}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal