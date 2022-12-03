const FormNewBill = (props) => {
	return (
		<main>
			<form onSubmit={props.handleBillSubmit}>
				<label htmlFor="bill-total">Bill Total</label>
				<input type="number" id="bill-total" step={0.01} onChange={props.collectBill} />
				<button type="submit">Submit</button>
			</form>
		</main>
	);
};

export default FormNewBill;
