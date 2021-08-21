import React, { useContext, useState } from "react";
import { CalendarDate, CaretUp } from "react-bootstrap-icons";
import { animated, useSpring } from "react-spring";
import { calendarItems } from "../constants/index";
import { TodoContext } from "../context";

function Calendar() {
	// State
	const [showMenu, setShowMenu] = useState(true);

	// Context
	const { setSelectedProject } = useContext(TodoContext);

	// animation
	const spin = useSpring({
		transform: showMenu ? "rotate(0deg)" : "rotate(180deg)",
		config: { friction: 15 },
	});

	const menuAnimation = useSpring({
		display: showMenu ? "block" : "none",
		lineHeight: showMenu ? 1.2 : 0,
	});

	return (
		<div className="Calendar">
			<div className="header">
				<div className="title">
					<CalendarDate size="18" />
					<p>Calendar</p>
				</div>
				<animated.div
					style={spin}
					onClick={() => setShowMenu(!showMenu)}
					className="btns"
				>
					<span>
						<CaretUp size="20" />
					</span>
				</animated.div>
			</div>
			<animated.div style={menuAnimation} className="items">
				{calendarItems.map((item) => (
					<div
						className="item"
						onClick={() => setSelectedProject(item)}
						key={item}
					>
						{item}
					</div>
				))}
			</animated.div>
		</div>
	);
}

export default Calendar;
