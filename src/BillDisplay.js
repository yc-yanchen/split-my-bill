const BillDisplay = ({firebaseData}) => {
	return (
		<ul className="bill-list">
			{/* Maps through the Firebase data to display all previous bills */}
			{firebaseData.map((bill) => {
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
								<p>Total:</p>
								<p>Split:</p>
								<p>Total Per Person:</p>
							</div>
							<div className="card-body-container-text">
								<p>${bill.totalBill}</p>
								<p>{bill.splitNumber}</p>
								<p>${bill.totalPerPerson}</p>
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default BillDisplay;
