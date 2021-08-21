import React, { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../context";

function Sidebar({ children }) {
	// ref
	const sideBarRef = useRef();

	// Context
	const { setSelectedTodo } = useContext(TodoContext);

	useEffect(() => {
		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick);
	});

	const handleClick = (e) => {
		if (
			e.target === sideBarRef.current ||
			sideBarRef.current.contains(e.target)
		) {
			setSelectedTodo(undefined);
		}
	};

	return (
		<div className="Sidebar" ref={sideBarRef}>
			{children}
		</div>
	);
}

export default Sidebar;
