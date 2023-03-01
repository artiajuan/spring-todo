import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import "./Login.css";

export default function Login() {
	const [username, setUsername] = useState("in28minutes");
	const [password, setPassword] = useState("");
	const [showFailureMessage, setShowFailureMessage] = useState(false);

	const navigate = useNavigate();

	const authContext = useAuth();

	function handleUsernameChange(event) {
		setUsername(event.target.value);
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	async function handleSubmit() {
		if (await authContext.login(username, password)) {
			navigate(`/welcome/${username}`)
		}
		else {
			setShowFailureMessage(true);
		}
	}

	return (
		<div className="login">
			<h1>Login</h1>
			{showFailureMessage && (
				<div className="failureMessage">Invalid Credentials</div>
			)}
			<div className="LoginForm">
				<div>
					<label>User Name</label>
					<input
						type="text"
						name="username"
						value={username}
						onChange={handleUsernameChange}
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<button type="button" value="Login" onClick={handleSubmit}>
					login
				</button>
			</div>
		</div>
	);
}
