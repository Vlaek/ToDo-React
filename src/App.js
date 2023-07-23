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
                    text: 'Clack Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, a.'
                },
                {
                    id: 2,
                    title: 'Title 1',
                    text: 'Be Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, a.'
                },
                {
                    id: 3,
                    title: 'Task 3',
                    text: 'Dite Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ea fugiat, et qui id placeat iure voluptatum cupiditate. Similique aspernatur laborum, optio, nostrum delectus natus fuga culpa nemo quod dignissimos nesciunt laboriosam. Architecto officia necessitatibus corporis ut libero et harum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ea fugiat, et qui id placeat iure voluptatum cupiditate. Similique aspernatur laborum, optio, nostrum delectus natus fuga culpa nemo quod dignissimos nesciunt laboriosam. Architecto officia necessitatibus corporis ut libero et harum!'
                },
                {
                    id: 4,
                    title: 'Title 2',
                    text: 'A Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, a.'
                },
            ],
            modalActive: false,
            filter: {
                sort: "",
                query: ""
            }
        }

        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.setModalActive = this.setModalActive.bind(this);

        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
    }

    render() {
        const filteredTasks = this.setFilterTasks();

        return (
            <div>
                <Header 
                    setActive={this.setModalActive}
                    filter={filteredTasks}
                    setFilter={this.handleQueryChange}
                    setSort={this.handleSortChange}
                />
                <TaskList 
                    tasks={filteredTasks} 
                    editTask={this.editTask}
                    deleteTask={this.deleteTask}
                />
                <Modal 
                    active={this.state.modalActive} 
                    setActive={this.setModalActive} 
                    title={"Добавить задачу"} 
                    modalType={"Добавить"} 
                    addTask={this.addTask}
                />
            </div>
        )
    }

    handleSortChange(event) {
        if (!event.target.value)
            event.target.value = ""
        const newFilter = { ...this.state.filter, sort: event.target.value };
        this.setState({ filter: newFilter });
    }

    handleQueryChange(event) {
        if (!event.target.value)
            event.target.value = ""
        const newFilter = { ...this.state.filter, query: event.target.value };
        this.setState({ filter: newFilter });
    }

    setFilterTasks() {
        const { tasks, filter } = this.state;
        if (!filter.query && !filter.sort) {
            return tasks;
        }
        const filteredTasks = tasks.filter(task => 
            task.title.toLowerCase().includes(filter.query.toLowerCase()))
        if (!filter.sort) {
            return filteredTasks;
        } else {
            return [...filteredTasks].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
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