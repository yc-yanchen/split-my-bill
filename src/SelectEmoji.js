const SelectEmoji = (props) => {
	return (
		<div className="emoji-flex-container">
			<label htmlFor="emoji">Pick an icon!</label>
			<select defaultValue="" name="emoji" id="emoji" onChange={props.inputOnChange}>
				<option value="" disabled>
					Icon
				</option>

				<option value="🍎">🍎</option>
				<option value="🍊">🍊</option>
				<option value="🥝">🥝</option>
				<option value="🫐">🫐</option>
				<option value="🍆">🍆</option>
				<option value="🥑">🥑</option>
				<option value="🥒">🥒</option>
				<option value="🌶">🌶</option>
				<option value="🌽">🌽</option>
				<option value="🥐">🥐</option>
				<option value="🥞">🥞</option>
				<option value="🌭">🌭</option>
				<option value="🍔">🍔</option>
				<option value="🍟">🍟</option>
				<option value="🍕">🍕</option>
				<option value="🍝">🍝</option>
				<option value="🍜">🍜</option>
				<option value="🍣">🍣</option>
				<option value="🍙">🍙</option>
				<option value="🍦">🍦</option>
				<option value="☕️">☕️</option>
				<option value="🍺">🍺</option>
			</select>
		</div>
	);
};
export default SelectEmoji;
