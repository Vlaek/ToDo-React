import React, {useState, useRef, useEffect} from 'react'
import { IoCloseCircleSharp } from 'react-icons/io5'

const Modal = ({active, setActive, task, addTask}) => {
    const newTask = {
        title: task ? task.title : "",
        text: task ? task.text : "",
    };

    const [title, setTitle] = useState('');
    const [titleDirty, setTitleDirty] = useState(false);
    const [titleError, setTitleError] = useState('Название не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        formRef.current.reset();
    };

    const handleTitleHandler = (e) => {
        if (e.target.value.length && e.target.value.length > 100) {
            setTitleError('Название задачи должно быть меньше 100 символов')
        } else if (!e.target.value.length) {
            setTitleError('Название не может быть пустым')
        } else {
            setTitleError("")
            setTitle(e.target.value);
        }
    }

    useEffect(() => {
        if (titleError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
        if (task && active) {
            setFormValid(true)
        }
    }, [titleError, active, task])

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive()}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">{task ? "Изменить задачу" : "Добавить задачу"}</div>
                    <IoCloseCircleSharp 
                        className='task__btn-delete' 
                        onClick={() => setActive()}
                    />
                </div>
                <form className="modal__body" onSubmit={handleSubmit} ref={formRef}>
                    <div className="modal__item">
                        {(titleDirty && titleError) 
                            ? 
                            <label className='modal__label error' htmlFor="title" id="label-name">{titleError}</label>
                            :
                            <label className='modal__label' htmlFor="title" id="label-name">Название*</label>
                        }
                        <input
                            onBlur={() => setTitleDirty(true)} 
                            className='modal__input' 
                            type="text" 
                            id='title'
                            placeholder='Название...'
                            defaultValue={task ? task.title : ""} 
                            onChange={(e) => handleTitleHandler(e) }
                        />
                    </div>
                    <div className="modal__item">
                        <label className='modal__label' htmlFor="text">Текст</label>
                        <textarea 
                            className='modal__textarea' 
                            type="text" 
                            id='text'
                            placeholder='Текст...'
                            defaultValue={task ? task.text : ""}
                            onChange={(e) => newTask.text = e.target.value }
                        ></textarea>
                    </div>
                    <div className="modal__footer">
                        <button disabled={!formValid} type='button' className="modal__btn-add" onClick={() => {
                                formRef.current.reset();
                                newTask.title = title;
                                if (!task) {
                                    addTask(newTask)
                                } else {
                                    newTask.id = task.id
                                    addTask(newTask)
                                }
                            }
                        }>{task ? "Изменить" : "Добавить"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal