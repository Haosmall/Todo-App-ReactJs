import React from "react";

function ProjectForm({
	handleSubmit,
	heading,
	value,
	setValue,
	setShowModal,
	confirmButonText,
}) {
	return (
		<div className="ProjectForm">
			<form onSubmit={handleSubmit}>
				<h3>{heading}</h3>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					type="text"
					placeholder="Project name"
					autoFocus
				/>
				<button className="cancel" onClick={() => setShowModal(false)}>
					Cancel
				</button>
				<button className="confirm">{confirmButonText}</button>
			</form>
		</div>
	);
}

export default ProjectForm;
