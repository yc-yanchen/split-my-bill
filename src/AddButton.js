const AddButton = ({changeDisplay}) => {
	return (
		<button onClick={changeDisplay}>
			<span className="material-symbols-outlined button-style button-rounded button-bottom-float ">add</span>
		</button>
	);
};

export default AddButton;
