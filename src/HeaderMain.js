const HeaderMain = (props) => {
	return (
		<header className="header-main">
			<h1>Split My Bill</h1>
			<div className="add-bill" onClick={props.changeDisplay}>
				<p className="plus-symbol">+</p>
			</div>
		</header>
	);
};

export default HeaderMain;
