import React, { useState, useRef, useEffect, FC } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IAddTask, IEditTask, ISetModal, ISetModalActive, ITask } from "./types/types";

interface ModalProps {
    task: ITask | null;
    showModal: boolean;
    setShowModal: ISetModal;
    editTask: IEditTask;
    addTask: IAddTask;
}

interface FormRefType {
    reset: () => void;
}

interface INewTask {
    id?: number;
    title: string;
    text: string;
}

const Modal: FC<ModalProps> = ({ showModal, setShowModal, task, editTask, addTask }) => {
    const newTask = {
        title: task ? task.title : "",
        text: task ? task.text : "",
    } as ITask;

    const [title, setTitle] = useState("");
    const [titleDirty, setTitleDirty] = useState(false);
    const [titleError, setTitleError] = useState("Название не может быть пустым");
    const [formValid, setFormValid] = useState(false);

    const formRef = useRef<FormRefType | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current !== null) formRef.current.reset();
    };

    const handleTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length && e.target.value.length > 100) {
            setTitleError("Название задачи должно быть меньше 100 символов");
        } else if (!e.target.value.length) {
            setTitleError("Название не может быть пустым");
        } else {
            setTitleError("");
            setTitle(e.target.value);
        }
    };

    useEffect(() => {
        if (titleError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
        if (task && showModal) {
            setFormValid(true);
        }
    }, [titleError, showModal, task]);

    useEffect(() => {
        setTitle(task ? task.title : "");
    }, [task]);

    return (
        <div className={showModal ? "modal active" : "modal"} onClick={() => setShowModal(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <div className="modal__title">
                        {task ? "Изменить задачу" : "Добавить задачу"}
                    </div>
                    <IoCloseCircleSharp
                        className="task__btn-delete"
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <form
                    className="modal__body"
                    onSubmit={handleSubmit}
                    ref={(node) => (formRef.current = node)}
                >
                    <div className="modal__item">
                        {titleDirty && titleError ? (
                            <label className="modal__label error" htmlFor="title" id="label-name">
                                {titleError}
                            </label>
                        ) : (
                            <label className="modal__label" htmlFor="title" id="label-name">
                                Название*
                            </label>
                        )}
                        <input
                            onBlur={() => setTitleDirty(true)}
                            className="modal__input"
                            type="text"
                            id="title"
                            placeholder="Название..."
                            defaultValue={task ? task.title : ""}
                            onChange={(e) => handleTitleHandler(e)}
                        />
                    </div>
                    <div className="modal__item">
                        <label className="modal__label" htmlFor="text">
                            Текст
                        </label>
                        <textarea
                            className="modal__textarea"
                            id="text"
                            placeholder="Текст..."
                            defaultValue={task ? task.text : ""}
                            onChange={(e) => (newTask.text = e.target.value)}
                        ></textarea>
                    </div>
                    <div className="modal__footer">
                        <button
                            disabled={!formValid}
                            type="button"
                            className="modal__btn-add"
                            onClick={() => {
                                if (formRef.current !== null) formRef.current.reset();
                                newTask.title = title;
                                if (!task) {
                                    addTask(newTask);
                                } else {
                                    newTask.id = task.id;
                                    editTask(newTask, task.id);
                                }
                                setShowModal(false);
                            }}
                        >
                            {task ? "Изменить" : "Добавить"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
