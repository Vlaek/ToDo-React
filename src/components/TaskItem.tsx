import { useState, useRef, FC } from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import { IDeleteTask, ISetModalActive, ITask } from "../types/types";

interface TaskItemProps {
    task: ITask;
    number: number;
    deleteTask: IDeleteTask;
    setModalActive: ISetModalActive;
}

const TaskItem: FC<TaskItemProps> = ({ task, number, deleteTask, setModalActive }) => {
    const [show, setShow] = useState(true);
    const myRef = useRef(null);

    return (
        <div>
            <CSSTransition in={show} timeout={300} classNames="alert" nodeRef={myRef} unmountOnExit>
                <div className="task" ref={myRef}>
                    <div className="task__header">
                        <div className="task__title">
                            {number}. {task.title}
                        </div>
                        <div>
                            <IoHammerSharp
                                className="task__btn-edit"
                                onClick={() => setModalActive(task)}
                            />
                            <IoCloseCircleSharp
                                className="task__btn-delete"
                                onClick={() => {
                                    setShow(false);
                                    setTimeout(() => {
                                        deleteTask(task.id);
                                    }, 300);
                                }}
                            />
                        </div>
                    </div>
                    <div className="task__body">
                        <div className="task__text">{task.text}</div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default TaskItem;
