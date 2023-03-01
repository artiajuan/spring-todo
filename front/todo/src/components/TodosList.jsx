import { useState, useEffect } from "react";
import { deleteTodoApi, retrieveAllTodosForUsername,  } from "../api/TodoApiService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

export default function TodosList() {

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState(null);

    const navigate = useNavigate();

    const AuthContext = useAuth();
    const {username, token}  = AuthContext;


    useEffect(() => refreshTodos(), []);

    function refreshTodos() {
        retrieveAllTodosForUsername(username, token)
            .then((response) => {
                setTodos(response.data);
            }
            );
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
        .then(
            () => {
                setMessage(`Todo ${id} deleted successfully`);
                refreshTodos();
            }
        )
    }
    

    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function addNewTodo(id){
        navigate(`/todo/-1`)
    }


	return (
        <div className="container">
            <h1>Lista de tareas</h1>
            {message && <div className="alert alert-warning"> {message}  </div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th> is Done</th>
                        <th>Target Date</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            <td>{todo.targetDate.toString()}</td>
                            <td> <button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}> Delete </button></td>
                            <td> <button className="btn btn-success" onClick={() => updateTodo(todo.id)}> Update </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="btn btn-success m-5" onClick={addNewTodo}> Add new todo </div>
        </div>
    )
}
