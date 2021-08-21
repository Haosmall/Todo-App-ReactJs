import React, { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import Modal from "./Modal";
import ProjectForm from "./ProjectForm";
import firebase from "firebase/app";
import "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewProject() {
	// state
	const [showModal, setShowModal] = useState(false);
	const [projectName, setProjectName] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (projectName) {
			const projectsRef = firebase.firestore().collection("projects");
			projectsRef
				.where("name", "==", projectName)
				.get()
				.then((querySnapshot) => {
					if (querySnapshot.empty) {
						projectsRef.add({
							name: projectName,
						});
					} else {
						// alert("Project already exist");
						toast.error(
							"Project with the same name already exists!"
						);
					}
				});

			setProjectName("");
			setShowModal(false);
		}
	}

	return (
		<div className="AddNewProject">
			<div className="add-button">
				<span onClick={() => setShowModal(true)}>
					<Plus size="20" />
				</span>
				<ToastContainer />
			</div>
			<Modal showModal={showModal} setShowModal={setShowModal}>
				<ProjectForm
					handleSubmit={handleSubmit}
					heading="New project"
					value={projectName}
					setValue={setProjectName}
					setShowModal={setShowModal}
					confirmButonText="+ Add Project"
				/>
			</Modal>
		</div>
	);
}

export default AddNewProject;
