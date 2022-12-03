import {useEffect, useState} from "react";
import "./App.css";
import HeaderMain from "./HeaderMain";
import HeaderNewBill from "./HeaderNewBill";
import FormNewBill from "./FormNewBill";
import firebase from "./firebase";
import {getDatabase, ref, push, get} from "firebase/database";

function App() {
	// *********************** useState Related Start
	// State responsible for determine which UI to display for the user
	const [inputDisplay, setInputDisplay] = useState(true);
	const [userTotalBill, setUserTotalBill] = useState("");
	const [userSplitNumber, setUserSplit] = useState("");
	const [previousBills, setPreviousBills] = useState({});
	// *********************** useState Related End

	// *********************** Firebase RT Database related START

	// useEffect(() => {
	// 	const database = getDatabase(firebase);
	// 	const dbRef = ref(database);
	// }, []);

	const database = getDatabase(firebase);
	const dbRef = ref(database);

	// *********************** Firebase RT Database related END

	// Responsible for changing the UI
	const changeInput = () => {
		setInputDisplay(!inputDisplay);
	};

	// Responsible for the onSubmit action of the form
	const handleBillSubmit = (e) => {
		e.preventDefault();
		console.log(e);
		const billInformation = {
			totalBill: userTotalBill.totalBill,
			splitNumber: userSplitNumber.splitNumber,
			// Using Math.ceil so numbers will round up to prevent money from disapearing in scenarios such as: $1 / 3 = $0.33, $0.33 * 3 = $0.99. Where did the money goooo?
			totalPerPerson: `${(Math.ceil((userTotalBill.totalBill / userSplitNumber.splitNumber) * 100) / 100).toFixed(2)}`,
		};
		push(dbRef, billInformation);
		changeInput();
	};

	// Responsible for collecting the information on the bill
	const collectTotalBill = (e) => {
		console.log(e);
		setUserTotalBill({
			// Rounding inacurracy will not be present because form will prevent user from inputing more than 2 decimals thus no rounding or truncating necessary here.
			totalBill: e.target.valueAsNumber.toFixed(2),
		});
	};

	// Responsible for collecting the information on the number of split of the bill
	const collectUserSplit = (e) => {
		console.log(e);
		setUserSplit({
			splitNumber: e.target.valueAsNumber,
		});
	};

	// useEffect(() => {
	// 	get(dbRef).then((snapshot) => {
	// 		if (snapshot.exists()) {
	// 			setPreviousBills(snapshot.val());
	// 			console.log(previousBills);
	// 		} else {
	// 			console.log("No data");
	// 		}
	// 	});
	// }, [inputDisplay]);

	useEffect(() => {
		if (true === true) {
			get(dbRef).then((snapshot) => {
				if (snapshot.exists()) {
					setPreviousBills(snapshot.val());
					console.log(snapshot.val());
				} else {
					console.log("No data");
				}
			});
		}
	}, [inputDisplay]);

	return (
		<div className="App wrapper">
			{inputDisplay ? (
				<div>
					<HeaderMain changeDisplay={changeInput} />
				</div>
			) : (
				<div>
					<HeaderNewBill changeDisplay={changeInput} />
					<FormNewBill handleBillSubmit={handleBillSubmit} collectTotalBill={collectTotalBill} collectUserSplit={collectUserSplit} />
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
