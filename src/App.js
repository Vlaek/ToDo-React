import React, { Component } from 'react'
import Header from './components/Header';
import Modal from './components/Modal';
import TaskList from './components/TaskList';

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tasks: [
                {
                    id: 1,
                    title: 'Task 1',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, a.'
                },
                {
                    id: 2,
                    title: 'Task 2',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, a.'
                },
                {
                    id: 3,
                    title: 'Task 3',
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ea fugiat, et qui id placeat iure voluptatum cupiditate. Similique aspernatur laborum, optio, nostrum delectus natus fuga culpa nemo quod dignissimos nesciunt laboriosam. Architecto officia necessitatibus corporis ut libero et harum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ea fugiat, et qui id placeat iure voluptatum cupiditate. Similique aspernatur laborum, optio, nostrum delectus natus fuga culpa nemo quod dignissimos nesciunt laboriosam. Architecto officia necessitatibus corporis ut libero et harum!'
                },
            ],
            modalActive: false
        }

        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.setModalActive = this.setModalActive.bind(this);
    }

    render() {
        return (
            <div>
                <Header setActive={this.setModalActive}/>
                <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.editTask}/>
                <Modal active={this.state.modalActive} setActive={this.setModalActive} title={"Добавить задачу"} modalType={"Добавить"} addTask={this.addTask}/>
            </div>
        )
    }

    addTask(task) {
        const id = this.state.tasks.length + 1;
        this.setState({ tasks: [...this.state.tasks, {id, ...task}] })
    }

    editTask(task) {
        let allTasks = this.state.tasks;
        allTasks[task.id - 1] = task;

        this.setState({tasks: []}, () => {
            this.setState({tasks: [...allTasks]})
        })
    }

    deleteTask(id) {
        this.setState({
            tasks: this.state.tasks.filter((task) => task.id !== id)
        })
    }

    setModalActive() {
        this.setState({modalActive: !this.state.modalActive})
    }
}

export default App;
