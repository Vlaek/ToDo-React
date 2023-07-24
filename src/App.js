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
                    title: "Task 1",
                    text: "Complete the first task"
                },
                {
                    id: 2,
                    title: "Task 2",
                    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. At harum laborum labore ea sit veritatis! Rem labore totam eius animi nostrum praesentium quo quos! Veniam aliquam excepturi quaerat modi culpa."
                },
                {
                    id: 3,
                    title: "Title 3",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, obcaecati veniam necessitatibus harum dicta deleniti voluptate similique doloremque consectetur! Ullam iure reprehenderit laboriosam neque blanditiis exercitationem quos laborum. Cumque, necessitatibus deserunt vel mollitia eveniet delectus, distinctio voluptates odit non aspernatur ipsum, illum suscipit quia numquam in. Harum corporis excepturi mollitia?"
                },
                {
                    id: 4,
                    title: "Task 4",
                    text: "Make progress on the fourth task"
                },
                {
                    id: 5,
                    title: "Title 5",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, obcaecati veniam necessitatibus harum dicta deleniti voluptate similique doloremque consectetur! Ullam iure reprehenderit laboriosam neque blanditiis exercitationem quos laborum. Cumque, necessitatibus deserunt vel mollitia eveniet delectus, distinctio voluptates odit non aspernatur ipsum, illum suscipit quia numquam in. Harum corporis excepturi mollitia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, obcaecati veniam necessitatibus harum dicta deleniti voluptate similique doloremque consectetur! Ullam iure reprehenderit laboriosam neque blanditiis exercitationem quos laborum. Cumque, necessitatibus deserunt vel mollitia eveniet delectus, distinctio voluptates odit non aspernatur ipsum, illum suscipit quia numquam in. Harum corporis excepturi mollitia?"
                },
                {
                    id: 6,
                    title: "Task 6",
                    text: "Take a break from the sixth task"
                },
                {
                    id: 7,
                    title: "Title 7",
                    text: "Get feedback on the seventh task"
                },
                {
                    id: 8,
                    title: "Task 8",
                    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, obcaecati veniam necessitatibus harum dicta deleniti voluptate similique doloremque consectetur! Ullam iure reprehenderit laboriosam neque blanditiis exercitationem quos laborum. Cumque, necessitatibus deserunt vel mollitia eveniet delectus, distinctio voluptates odit non aspernatur ipsum, illum suscipit quia numquam in. Harum corporis excepturi mollitia?"
                },
                {
                    id: 9,
                    title: "Title 9",
                    text: "Submit the ninth task for review"
                },
                {
                    id: 10,
                    title: "Task 10",
                    text: "Celebrate completing the final task"
                }
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