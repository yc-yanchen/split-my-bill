import {useEffect, useState} from "react";
import "./App.css";
import HeaderMain from "./HeaderMain";
import HeaderNewBill from "./HeaderNewBill";
import FormNewBill from "./FormNewBill";
import firebase from "./firebase";
import {getDatabase, ref, push} from "firebase/database";

function App() {
	// *********************** Firebase RT Database related START
	// Initialize database content
	const database = getDatabase(firebase);
	const dbRef = ref(database);

	const userPackage = {
		Total: `$20`,
		Split: 4,
		TotalPerPerson: `$5`,
	};
	// Testing push function to the database
	// const pushTest = push(dbRef, userPackage);

	// *********************** Firebase RT Database related END

	// State responsible for determine which UI to display for the user
	const [inputDisplay, setInputDisplay] = useState(true);

	// Responsible for changing the UI
	const changeInput = () => {
		setInputDisplay(!inputDisplay);
	};

	// Responsible for the onSubmit action of the form
	const handleBillSubmit = (e) => {
		e.preventDefault();
		changeInput();
	};

	// Responsible for collecting the information on the bill
	const collectBill = (e) => {
		console.log(e.target.valueAsNumber);
		push(dbRef, e.target.valueAsNumber);
	};

	return (
		<div className="App wrapper">
			{inputDisplay ? (
				<HeaderMain changeDisplay={changeInput} />
			) : (
				<div>
					<HeaderNewBill changeDisplay={changeInput} />
					<FormNewBill handleBillSubmit={handleBillSubmit} collectBill={collectBill} />
				</div>
			)}
		</div>
	);
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
