const HeaderNewBill = (props) => {
	return (
		<header className="header-new-bill">
			<button onClick={props.changeDisplay}>
				<span className="material-symbols-outlined button-style ">arrow_back</span>
			</button>
			<h1 className="header-new-bill">New Bill</h1>
		</header>
	);
};

export default HeaderNewBill;
