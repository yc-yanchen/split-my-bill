import {useState} from "react";
import "./App.css";
import HeaderMain from "./HeaderMain";
import HeaderNewBill from "./HeaderNewBill";

function App() {
	const [inputDisplay, setInputDisplay] = useState(true);

	const changeInput = () => {
		setInputDisplay(!inputDisplay);
	};
	return <div className="App wrapper">{inputDisplay ? <HeaderMain changeDisplay={changeInput} /> : <HeaderNewBill changeDisplay={changeInput} />}</div>;
}

export default App;

// On page load, mount the header, + button, and list of previous bills from firebase
// parse the data from firebase then mount the components to the page within a useEffect with an empty dependency array
// use a prop to send the data to the component which will display all previous bills

// Mount the New Bill related components to the page when user presses the + button on the main page
// this includes a form which has the inputs for the bill total and the number of ways it would be split

// In the input forms, use onChange to collect the information user is inputting
// store the information into a useState when user presses the submit button before processing it to firebase

// Submitting will also mount the main page components which will automatically retrieve previous bills
