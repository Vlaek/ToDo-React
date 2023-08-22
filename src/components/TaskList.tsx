import React, { FC } from "react";
import TaskItem from "./TaskItem";
import { IDeleteTask, IEditTask, ISetModalActive, ITask } from "./types/types";

interface TasksProps {
    tasks: ITask[];
    deleteTask: IDeleteTask;
    setModalActive: ISetModalActive;
}

const Tasks: FC<TasksProps> = ({ tasks, deleteTask, setModalActive }) => {
    if (!tasks.length) {
        return (
            <div className="not-tasks">
                <h1 className="not-tasks__title">Нет задач! :(</h1>
            </div>
        );
    }
    return (
        <div className="task__list">
            {tasks.map((task, index) => (
                <TaskItem
                    task={task}
                    number={index + 1}
                    key={task.id}
                    deleteTask={deleteTask}
                    setModalActive={setModalActive}
                />
            ))}
        </div>
    );
};

export default Tasks;
