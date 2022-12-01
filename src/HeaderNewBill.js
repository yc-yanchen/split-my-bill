const HeaderNewBill = (props) => {
	return (
		<header className="header-new-bill">
			<div className="back-button" onClick={props.changeDisplay}>
				<p className="left-arrow">&#60;</p>
			</div>
			<h1 className="header-new-bill">New Bill</h1>
		</header>
	);
};

export default HeaderNewBill;
