const BillDisplay = (props) => {
	return (
		<ul className="bill-list">
			{/* Maps through the Firebase data to display all previous bills */}
			{props.firebaseData.map((bill) => {
				return (
					<li className="bill-container" key={bill.key}>
						<div className="card-header">
							<div className="emoji-icon">
								<p>{bill.emoji}</p>
							</div>
							<div className="card-header-text">
								<h3>Bill ID: {bill.key}</h3>
								<p>{bill.timeCreated}</p>
							</div>
						</div>
						<div className="card-body-container">
							<div className="card-body-container-text">
								<p>Bill Total: ${bill.totalBill}</p>
								<p>Number of Split: {bill.splitNumber}</p>
								<p>Total Per Person: ${bill.totalPerPerson}</p>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default BillDisplay;
