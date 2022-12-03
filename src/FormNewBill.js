const FormNewBill = (props) => {
	return (
		<main>
			<form onSubmit={props.handleBillSubmit}>
				<label htmlFor="total-bill">Total Bill: $</label>
				<input type="number" id="total-bill" step={0.01} min="0.00" placeholder="0.00" onChange={props.collectTotalBill} />
				<label htmlFor="split-number">Split Number: </label>
				<input type="number" id="split-number" step={1} min="1" placeholder="1" onChange={props.collectUserSplit} />
				<button type="submit">Submit</button>
			</form>
		</main>
	);
};

export default FormNewBill;
