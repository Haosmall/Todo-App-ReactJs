import moment from "moment";
import randomColor from "randomcolor";
import React, { useContext, useState } from "react";
import {
	ArrowClockwise,
	CheckCircleFill,
	Circle,
	Trash,
} from "react-bootstrap-icons";
import { animated, useSpring, useTransition } from "react-spring";
import { TodoContext } from "../context";
import firebase from "../firebase";

function Todo({ todo }) {
	// State
	const [hover, setHover] = useState(false);

	// Context
	const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

	// animation
	const fadeIn = useSpring({
		from: { marginTop: "-12px", opacity: 0 },
		to: { marginTop: "0px", opacity: 1 },
	});
	const checkTransition = useTransition(todo.checked, {
		from: { position: "absolute", transform: "scale(0)" },
		enter: { transform: "scale(1)" },
		leave: { transform: "scale(0)" },
	});

	const handleDelete = (todo) => {
		deleteTodo(todo);
		if (selectedTodo === todo) {
			setSelectedTodo(undefined);
		}
	};

	const deleteTodo = (todo) => {
		firebase.firestore().collection("todos").doc(todo.id).delete();
	};

	const checkTodo = (todo) => {
		firebase
			.firestore()
			.collection("todos")
			.doc(todo.id)
			.update({ checked: !todo.checked });
	};

	const addToNextDay = (todo) => {
		const nextDayDate = moment(todo.date, "DD/MM/YYYY").add(1, "days");
		const repeatTodo = {
			...todo,
			checked: false,
			date: nextDayDate.format("DD/MM/YYYY"),
			day: nextDayDate.format("d"),
			color: randomColor({ luminosity: "dark" }),
		};

		delete repeatTodo.id;

		firebase.firestore().collection("todos").add(repeatTodo);
	};

	return (
		<animated.div style={fadeIn} className="Todo">
			<div
				className="todo-container"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				<div className="check-todo" onClick={() => checkTodo(todo)}>
					{checkTransition((props, checked) =>
						checked ? (
							<animated.span style={props} className="checked">
								<CheckCircleFill color="#bebebe" />
							</animated.span>
						) : (
							<animated.span style={props} className="unchecked">
								<Circle color={todo.color} />
							</animated.span>
						)
					)}
				</div>
				<div className="text" onClick={() => setSelectedTodo(todo)}>
					<p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
						{todo.text}
					</p>
					<span>
						{todo.time} - {todo.projectName}
					</span>
					<div
						className={`line ${todo.checked ? "line-through" : ""}`}
					></div>
				</div>
				<div
					className="add-to-next-day"
					onClick={() => addToNextDay(todo)}
				>
					{todo.checked && (
						<span>
							<ArrowClockwise />
						</span>
					)}
				</div>
				<div className="delete-todo" onClick={() => handleDelete(todo)}>
					{(hover || todo.checked) && (
						<span>
							<Trash />
						</span>
					)}
				</div>
			</div>
		</animated.div>
	);
}

export default Todo;
