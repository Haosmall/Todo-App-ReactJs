import React, { useContext, useState } from "react";
import ProjectForm from "./ProjectForm";
import firebase from "../firebase";
import { TodoContext } from "../context";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RenameProject({ project, setShowModal }) {
	const [newProjectName, setNewProjectName] = useState(project.name);
	// context
	const { selectedProject, setSelectedProject } = useContext(TodoContext);

	function handleSubmit(e) {
		e.preventDefault();
		renameProject(project, newProjectName);
		setShowModal(false);
	}

	const renameProject = (project, newProjectName) => {
		const projectsRef = firebase.firestore().collection("projects");
		const todosRef = firebase.firestore().collection("todos");
		const { name: oldProjectName } = project;

		projectsRef
			.where("name", "==", newProjectName)
			.get()
			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					// alert("Project with the same name already exists!");
					toast.error("Project with the same name already exists!");
				} else {
					projectsRef
						.doc(project.id)
						.update({
							name: newProjectName,
						})
						.then(() => {
							todosRef
								.where("projectName", "==", oldProjectName)
								.get()
								.then((querySnapshot) => {
									querySnapshot.forEach((doc) => {
										doc.ref.update({
											projectName: newProjectName,
										});
									});
								});
						})
						.then(() => {
							if (oldProjectName === selectedProject) {
								setSelectedProject(newProjectName);
							}
						});
				}
			});
	};

	return (
		<div className="RenameProject">
			<ProjectForm
				handleSubmit={handleSubmit}
				heading="Edit project name"
				value={newProjectName}
				setValue={setNewProjectName}
				setShowModal={setShowModal}
				confirmButonText="Confirm"
			/>
			<ToastContainer />
		</div>
	);
}

export default RenameProject;
