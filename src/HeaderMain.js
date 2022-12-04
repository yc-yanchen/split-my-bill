const HeaderMain = (props) => {
	return (
		<header className="header-main">
			<h1>Split My Bill</h1>
			<button onClick={props.changeDisplay}>
				<span class="material-symbols-outlined button-style button-round button-add ">add</span>
			</button>
		</header>
	);
};

export default HeaderMain;
