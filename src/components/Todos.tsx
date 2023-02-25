import { useEffect, useState } from "react";
import TodoService, { ITodo } from "../services/TodoService";

function UserLists() {
    const defaultData: ITodo = { task: '' }
    const [todo, setTodo] = useState<ITodo>(defaultData);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const todoService = new TodoService();

    useEffect(() => {
        getData();
    }, []);

    const save = async () => {
        try {
            if (todo.id !== undefined && todo.id !== '') {
                await todoService.update(todo);
            } else {
                await todoService.add(todo);
            }
            setTodo(defaultData);
            await getData();
        } catch (ex) {
            window.alert("Something error. Please try again later.");
        }
    }

    const getData = async () => {
        const data = await todoService.getAll();
        console.log(data);
        setTodos(data);
    }

    const remove = async (todo: ITodo) => {
        if (window.confirm("Are you sure want to delete this data?")) {
            await todoService.remove(todo);
            await getData();
        }
    }

    return (
        <div className="min-h-screen flex flex-col justify-center justify-items-center bg-gradient-to-r from-slate-200 to-gray-200 text-gray-800 dark:text-white dark:from-slate-900 dark:to-gray-800">
            <div className="flex flex-col items-center px-6 py-8 mt-8 mx-auto md:h-screen lg:py-0  w-full max-w-lg">
                <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Sample App
                </a>

                <h1 className="text-xl leading-tight tracking-tight text-gray-900  dark:text-white text-left mb-4 mt-4 w-full">
                    Todo List:
                </h1>

                <div className="flex flex-row w-full">
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={todo.task} onChange={(e) => setTodo({ ...todo, task: e.target.value })} />
                    <button type="button" className="ml-2 w-16 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-sky-700 hover:bg-sky-900" onClick={save}>{todo.id === undefined ? 'Add' : 'Edit'}</button>
                    {todo.id !== undefined && <button type="button" className="ml-2 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-700 hover:bg-red-900" onClick={() => setTodo(defaultData)}>Cancel</button>}
                </div>

                {todos.map((todo: ITodo, index: number) =>
                    <div key={index} className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2 mb-2">
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{todo.task}</p>
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2" onClick={() => setTodo(todo)}>
                            Edit
                        </button>
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => remove(todo)}>
                            Remove
                        </button>
                    </div>
                )}

                {todos.length === 0 &&
                    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2 mb-2">
                        <p className="font-normal text-gray-700 dark:text-gray-400">Add first to-do!</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserLists;
