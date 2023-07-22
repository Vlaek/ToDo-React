import React from 'react'
import TaskItem from './TaskItem'

const Tasks = ({tasks, deleteTask, editTask}) => {
    if (!tasks.length) {
        return (
            <div className='not-tasks'>
                <h1 className='not-tasks__title'>Нет задач! :(</h1>
            </div>
        )
    }

    return (
        <div>
            {tasks.map((task, index) => 
                <TaskItem task={task} number={index + 1} key={task.id} deleteTask={deleteTask} editTask={editTask}/>
            )}
        </div>
    )

}

export default Tasks