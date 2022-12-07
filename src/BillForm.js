const BillForm = ({inputOnChange, handleSubmit}) => {
	return (
		<form className="new-bill-form" onSubmit={handleSubmit}>
			<div className="flex-container">
				<label htmlFor="total-bill" className="sr-only">
					Total Bill: $
				</label>
				<div className="icon">
					<span className="material-symbols-outlined">attach_money</span>
				</div>
				<input type="number" id="total-bill" step={0.01} min="0.00" placeholder="Bill total" required onChange={inputOnChange} name="totalBill" />
			</div>
			<div className="flex-container">
				<label htmlFor="split-number" className="sr-only">
					Split Number:
				</label>
				<div className="icon">
					<span className="material-symbols-outlined">person</span>
				</div>
				<input type="number" id="split-number" step={1} min="1" placeholder="Number of split" required onChange={inputOnChange} name="splitNumber" />
			</div>
			<button type="submit" className="button-submit button-style">
				Submit
			</button>
		</form>
	);
};

export default BillForm;