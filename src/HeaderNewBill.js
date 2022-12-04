const HeaderNewBill = (props) => {
	return (
		<>
			<nav>
				<button onClick={props.changeDisplay}>
					<span className="material-symbols-outlined button-style ">arrow_back</span>
				</button>
			</nav>
			<header className="header-main">
				<h1 className="header-new-bill">New Bill</h1>
			</header>
		</>
	);
};

export default HeaderNewBill;
