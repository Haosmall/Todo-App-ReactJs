import React, { useContext, useState } from "react";
import { CaretUp, Palette, PencilFill } from "react-bootstrap-icons";
import { animated, useSpring } from "react-spring";
import { TodoContext } from "../context";
import AddNewProject from "./AddNewProject";
import Project from "./Project";

function Projects() {
	const [showMenu, setShowMenu] = useState(true);
	const [edit, setEdit] = useState(false);
	const pencilCorlor = edit ? "#0080ff" : "#000000";

	// context
	const { projects } = useContext(TodoContext);

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
		<div className="Projects">
			<div className="header">
				<div className="title">
					<Palette size="18" />
					<p>Projects</p>
				</div>
				<div className="btns">
					{showMenu && projects.length > 0 && (
						<span
							className="edit"
							onClick={() => setEdit((edit) => !edit)}
						>
							<PencilFill size="15" color={pencilCorlor} />
						</span>
					)}
					<AddNewProject />
					<animated.span
						className="arrow"
						onClick={() => setShowMenu(!showMenu)}
						style={spin}
					>
						<CaretUp size="20" />
					</animated.span>
				</div>
			</div>
			<animated.div style={menuAnimation} className="items">
				{projects.map((project) => (
					<Project project={project} key={project.id} edit={edit} />
				))}
			</animated.div>
		</div>
	);
}

export default Projects;
