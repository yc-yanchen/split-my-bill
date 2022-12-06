const SearchBar = () => {
	return (
		<form className="search-bar">
			<label htmlFor="bill-search" className="sr-only">
				Search for your split bill
			</label>
			<button>
				<span className="material-symbols-outlined">search</span>
			</button>
			<input type="text" id="bill-search" placeholder="Search for your bill with your bill ID" maxLength={20} minLength={20} />
		</form>
	);
};

export default SearchBar;
