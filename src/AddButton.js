const AddButton = ({changeDisplay}) => {
	return (
		<button onClick={changeDisplay}>
			<span className="material-symbols-outlined coloured-button-style button-bottom-float ">add</span>
		</button>
	);
};

export default AddButton;
