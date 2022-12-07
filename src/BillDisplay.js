const BillDisplay = (props) => {
	return (
		<>
			{props.billID.length < 20 ? (
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
			) : (
				<>
					{/* <h3>Please enter your bill ID</h3> */}
					<ul className="bill-list">
						{props.billSearchResult.map((data) => {
							console.log(data);
							return (
								<li className="bill-container" key={data.key}>
									<p>Bill ID: {data.key}</p>
									<p>Time Created: {data.timeCreated}</p>
									<p>Bill Total: ${data.totalBill}</p>
									<p>Number of Split: {data.splitNumber}</p>
									<p>Total Per Person: ${data.totalPerPerson}</p>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</>
	);
};

export default BillDisplay;
