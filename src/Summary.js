import {useEffect} from "react";

const Summary = (props) => {
	useEffect(() => {
		props.billSearch(props.billID);
	}, []);

	return (
		<main>
			<h2>Thank you for submitting your bill. Here is your bill information:</h2>

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
			<p>You can use your bill ID to access your bill again later by searching for it on the home screen!</p>
		</main>
	);
};

export default Summary;
