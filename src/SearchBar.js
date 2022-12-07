// Search bar which has a min and max of twenty characters to search for a bill

const SearchBar = (props) => {
	return (
		<form className="search-bar" onSubmit={props.handleSearch}>
			<label htmlFor="bill-search" className="sr-only">
				Search for your split bill
			</label>
			<button>
				<span className="material-symbols-outlined">search</span>
			</button>
			<input type="text" id="bill-search" placeholder="Search for your bill with your bill ID" maxLength={20} minLength={20} onChange={props.searchOnChange} />
		</form>
	);
};

export default SearchBar;
