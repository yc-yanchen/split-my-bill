const HeaderMain = (props) => {
	return (
		<>
			<nav></nav>
			<header className="header-main">
				<h1>Split My Bill</h1>
				<form
					className="search-bar"
					onSubmit={props.handleBillSearch}
					onInvalid={() => {
						console.log("No bill found.");
					}}>
					<label htmlFor="bill-search" className="sr-only">
						Search for your split bill
					</label>
					<button>
						<span className="material-symbols-outlined">search</span>
					</button>
					<input type="text" id="bill-search" placeholder="Search for your bill with your bill ID" maxLength={20} minLength={20} onChange={props.collectSearchID} />
				</form>
				<button onClick={props.changeDisplay}>
					<span className="material-symbols-outlined button-style button-rounded button-bottom-float ">add</span>
				</button>
			</header>
		</>
	);
};

export default HeaderMain;
