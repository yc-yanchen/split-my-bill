const BillDisplay = (props) => {
	return (
		<ul className="bill-list">
			{props.firebaseData.map((bill) => {
				return (
					<li className="bill-container">
						<p>{bill}</p>
					</li>
				);
			})}
		</ul>
	);
};

export default BillDisplay;
