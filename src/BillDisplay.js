const BillDisplay = (props) => {
	return (
		<ul className="bill-list">
			{props.firebaseData.map((bill) => {
				return (
					<li className="bill-container" key={bill.key}>
						<p>Bill ID: {bill.key}</p>
						<p>Time Created: {bill.timeCreated}</p>
						<p>Bill Total: ${bill.totalBill}</p>
						<p>Number of Split: {bill.splitNumber}</p>
						<p>Total Per Person: ${bill.totalPerPerson}</p>
					</li>
				);
			})}
		</ul>
	);
};

export default BillDisplay;
