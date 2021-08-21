import React, { createContext, useState } from "react";
import {
	useFilterTodos,
	useProjects,
	useTodos,
	useProjectsWithStats,
} from "../hooks";

const TodoContext = createContext();

function TodoContextProvider({ children }) {
	const defaultProject = "Today";
	const [selectedProject, setSelectedProject] = useState(defaultProject);
	const [selectedTodo, setSelectedTodo] = useState(undefined);

	// Custom hooks
	const todos = useTodos();
	const projects = useProjects();
	const projectsWithStats = useProjectsWithStats(projects, todos);
	const filteredTodos = useFilterTodos(todos, selectedProject);

	return (
		<TodoContext.Provider
			value={{
				defaultProject,
				selectedProject,
				setSelectedProject,
				todos: filteredTodos,
				projects: projectsWithStats,
				selectedTodo,
				setSelectedTodo,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
}

export { TodoContextProvider, TodoContext };
