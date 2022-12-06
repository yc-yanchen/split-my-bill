const NavigationBar = (props) => {
	return (
		<nav>
			{/* Checks if we are on the home page or not. If not then display the back arrow */}
			{props.inputDisplay ? (
				<button onClick={props.changeDisplay}>
					<span className="material-symbols-outlined button-style ">arrow_back</span>
				</button>
			) : null}
		</nav>
	);
};

export default NavigationBar;
