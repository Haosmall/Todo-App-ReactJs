import React from "react";
import "./App.css";
import AddNewTodo from "./components/AddNewTodo";
import Calendar from "./components/Calendar";
import EditTodo from "./components/EditTodo";
import Main from "./components/Main";
import Projects from "./components/Projects";
import Sidebar from "./components/Sidebar";
import Todos from "./components/Todos";
import User from "./components/User";

function App() {
	return (
		<div className="App">
			<Sidebar>
				<User />
				<AddNewTodo />
				<Calendar />
				<Projects />
			</Sidebar>
			<Main>
				<Todos />
				<EditTodo />
			</Main>
		</div>
	);
}

export default App;