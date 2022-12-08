import {useEffect} from "react";

const Summary = ({billSearch, billSearchResult, copyBill}) => {
	// User agent will load this component after submitting their bill. The useEffect will perform a search using the latest Firebase key to provide user with the most relevent data about their bill.
	useEffect(() => {
		billSearch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ul className="bill-list">
			{billSearchResult.map((bill) => {
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

						<button className="button-copy coloured-button-style" onClick={copyBill}>
							Copy Bill ID to Clipboard
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default Summary;
