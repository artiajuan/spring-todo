import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "../security/AuthContext";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "../api/TodoApiService";

export default function Todo() {

    const {id} = useParams();
    const authContext = useAuth();
    const navigate = useNavigate();

    const username = authContext.username;
    const [description , setDescription] = useState("");
    const [targetDate, setTargetDate] = useState("");


    useEffect(
        () => retrieveTodo(), [id]
    )

    function retrieveTodo(){
        if (id !== -1){
            retrieveTodoApi(username, id)
                .then((response) => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                })
        }
    }

    function onSubmit(values){
        console.log(values);
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if (id === -1){
            createTodoApi(username, todo)
                .then(() => navigate("/todos"));
        }
        updateTodoApi(username, id, todo)
            .then(() => navigate("/todos"));
    }

    function validate(values){
        let errors = {};
        if(!values.description){
            errors.description = "Enter a description";
        } else if(values.description.length < 5){
            errors.description = "Enter at least 5 characters in description";
        }

        if(!values.targetDate){
            errors.targetDate = "Enter a target date";
        }

        return errors;
    }

    return (
        <div className="container">
            <h1> Enter todo details </h1>
            <div>
                <Formik initialValues={ {description, targetDate}}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Descriprion</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-success" type="submit">Save</button> 
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}
