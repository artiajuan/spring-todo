import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./security/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import TodosList from "./components/TodosList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import Todo from "./components/Todo";

function AutheticatedRoute({children}){
	const authContext = useAuth();
	if(authContext.isAuthenticated)
		return children
	return <Navigate to="/"/>
}

function App() {
	return (
		<div className="App">
			<AuthProvider>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/welcome/:username" element={
							<AutheticatedRoute>
								<Welcome />
							</AutheticatedRoute>
						}/>
						<Route path="/" element={<Login />} />
						<Route path="/todos" element={
							<AutheticatedRoute>
								<TodosList />
							</AutheticatedRoute>
						} />
						<Route path="/todo/:id" element={
							<AutheticatedRoute>
								<Todo />
							</AutheticatedRoute>
						} />
						<Route path="/logout" element={<Logout />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</div>
	);
}

export default App;
