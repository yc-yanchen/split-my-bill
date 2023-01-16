import SelectEmoji from "./SelectEmoji";

// Component used to display the form for user to input their bill. All the number fields have a min and max number to prevent large numbers from breaking out of their elements when displayed later. Also to prevent division into infinity.
const BillForm = ({inputOnChange, handleSubmit}) => {
	return (
		<form className="new-bill-form" onSubmit={handleSubmit}>
			<SelectEmoji inputOnChange={inputOnChange} />
			<div className="flex-container">
				<label htmlFor="total-bill" className="sr-only">
					Total Bill: $
				</label>
				<div className="icon">
					<span className="material-symbols-outlined">attach_money</span>
				</div>
				<input type="number" id="total-bill" step={0.01} min="0.00" placeholder="Bill total" required onChange={inputOnChange} name="totalBill" max={9999999999} />
			</div>
			<div className="flex-container">
				<label htmlFor="split-number" className="sr-only">
					Split Number:
				</label>
				<div className="icon">
					<span className="material-symbols-outlined">person</span>
				</div>
				<input type="number" id="split-number" step={1} min="1" placeholder="Number of split" required onChange={inputOnChange} name="splitNumber" max={999} />
			</div>
			<button type="submit" className="button-submit button-style coloured-button-style">
				Submit
			</button>
		</form>
	);
};

export default BillForm;
