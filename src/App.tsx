import { FC, useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import TaskList from "./components/TaskList";
import { IFilter, ITask, Option } from "./types/types";
import { data } from "./data";

const App: FC = () => {
    const getFromLocalStorage = (key: string) => {
        const value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return [];
    };

    const [tasks, setTasks] = useState<ITask[]>(getFromLocalStorage("tasks"));
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState<IFilter>({
        sort: "",
        query: "",
    });
    const [fullTask, setFullTask] = useState<ITask | null>(null);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleSortChange = (option: Option) => {
        setFilter({ ...filter, sort: option.value });
    };

    const handleQueryChange = (event: any) => {
        if (!event.target.value) event.target.value = "";
        setFilter({ ...filter, query: event.target.value });
    };

    const setFilterTasks = () => {
        if (!filter.query && !filter.sort) {
            return tasks;
        }
        const filteredTasks = tasks.filter((task) =>
            task.title.toLowerCase().includes(filter.query.toLowerCase())
        );
        if (!filter.sort) {
            return filteredTasks;
        } else {
            return [...filteredTasks].sort((a, b) =>
                String(a[filter.sort]).localeCompare(String(b[filter.sort]))
            );
        }
    };

    const addTask = (task: ITask) => {
        setTasks([...tasks, { ...task, id: tasks.length + 1 }]);
    };

    const editTask = (updatedTask: ITask, id: number) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...updatedTask, id };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const setModalActive = (task: ITask | null) => {
        setFullTask(task);
        setShowModal(!showModal);
    };

    const filteredTasks = setFilterTasks();

    return (
        <div>
            <Header
                setModalActive={setModalActive}
                setFilter={handleQueryChange}
                setSort={handleSortChange}
            />
            <TaskList
                tasks={filteredTasks}
                deleteTask={deleteTask}
                setModalActive={setModalActive}
            />
            <Modal
                task={fullTask}
                showModal={showModal}
                editTask={editTask}
                addTask={addTask}
                setShowModal={setShowModal}
            />
        </div>
    );
};

export default App;
