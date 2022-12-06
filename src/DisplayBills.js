const DisplayBill = (props) => {
	return (
		<main>
			<h2>Previous Bills</h2>
			{props.billDataObject.length === 0 ? (
				<p>No bills found. Create a new one!</p>
			) : (
				<ul className="bill-list">
					{props.billDataObject.map((data) => {
						console.log(data[0]);
						return (
							<li className="bill-container" key={data[0]}>
								<p>Bill ID: {data[0]}</p>
								<p>Time Created: {data[1].substring(0, 15)}</p>
								<p>Bill Total: ${data[2]}</p>
								<p>Number of Split: {data[3]}</p>
								<p>Total Per Person: ${data[4]}</p>
							</li>
						);
					})}
				</ul>
			)}
		</main>
	);
};

export default DisplayBill;
