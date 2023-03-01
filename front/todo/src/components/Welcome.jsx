import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { retrieveHelloWorldBeanWithPathVariable } from "../api/HelloWorldApiService";
import { useAuth } from "../security/AuthContext";

export default function Welcome() {

    const [message, setMessage] = useState(null);
    const  { username } = useParams();
    const authContext = useAuth();

    function callRestApi(){
                retrieveHelloWorldBeanWithPathVariable("in28minutes", authContext.token)
        .then((response) => succesfulResponse(response))
        .catch(error => errorResponse(error))
        .finally(() => console.log("finally"));
    }

    function succesfulResponse(response){
        console.log(response);
        setMessage(response.data.message)
    }
 
    function errorResponse(error){
        console.log(error);
    }

    return (
        <div className="Welcome">
            <h1> Welcome {username} </h1>
            <div>
                Manage your todos <Link to="/todos">here</Link>
            </div> 
            <div>
                <button className="btn btn-success m-5" onClick={callRestApi}>call rest api</button>
            </div>
            <div className="text-info"> {message}</div>
        </div>
    ) 
}
