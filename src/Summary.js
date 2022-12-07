import {useEffect} from "react";

const Summary = ({billSearch, billSearchResult}) => {
	useEffect(() => {
		billSearch();
	}, []);

	return (
		<ul className="bill-list">
			{billSearchResult.map((data) => {
				// console.log(data);
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
	);
};

export default Summary;
