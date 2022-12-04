const DisplayBill = (props) => {
	return (
		<main>
			<ul className="bill-list">
				{props.previousTotalBill.map((data) => {
					return (
						<li className="bill-container">
							<p>{data}</p>
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default DisplayBill;
