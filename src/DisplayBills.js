const DisplayBill = (props) => {
	return (
		<main>
			<h2>Previous Bills</h2>
			<ul className="bill-list">
				{props.billDataObject.map((data) => {
					console.log(data);
					return (
						<li className="bill-container" key={data}>
							<p>Bill ID: {data[0]}</p>
							<p>Bill Total: ${data[1]}</p>
							<p>Number of Split: {data[2]}</p>
							<p>Total Per Person: {data[3]}</p>
						</li>
					);
				})}
			</ul>
		</main>
	);
};

export default DisplayBill;
