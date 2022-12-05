import {useEffect, useState} from "react";
import "./App.css";
import HeaderMain from "./HeaderMain";
import HeaderNewBill from "./HeaderNewBill";
import FormNewBill from "./FormNewBill";
import firebase from "./firebase";
import {getDatabase, ref, push, onValue} from "firebase/database";
import DisplayBill from "./DisplayBills";

function App() {
	// *********************** useState Related Start
	// State responsible for determine which UI to display for the user
	const [inputDisplay, setInputDisplay] = useState(true);
	const [userTotalBill, setUserTotalBill] = useState("");
	const [userSplitNumber, setUserSplitNumber] = useState("");
	const [billDataObject, setBillDataObject] = useState([]);
	const [billSearchID, setBillSearchID] = useState("");
	const [filteredBill, setFilteredBill] = useState([]);
	const [firebaseKey, setFirebaseKey] = useState("");
	// *********************** useState Related End

	// *********************** Firebase RT Database related START
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
		const billInformation = {
			totalBill: userTotalBill.totalBill,
			splitNumber: userSplitNumber.splitNumber,
			// Using Math.ceil so numbers will round up to prevent money from disapearing in scenarios such as: $1 / 3 = $0.33, $0.33 * 3 = $0.99. Where did the money goooo?
			totalPerPerson: `${(Math.ceil((userTotalBill.totalBill / userSplitNumber.splitNumber) * 100) / 100).toFixed(2)}`,
			timeCreated: `${new Date()}`,
		};
		push(dbRef, billInformation);
		// getIndividualBill();
		changeInput();
	};

	// Responsible for collecting the information on the bill
	const collectTotalBill = (e) => {
		setUserTotalBill({
			// Rounding inacurracy will not be present because form will prevent user from inputing more than 2 decimals thus no rounding or truncating necessary here.
			totalBill: e.target.valueAsNumber.toFixed(2),
		});
	};

	// Responsible for collecting the information on the number of split of the bill
	const collectUserSplit = (e) => {
		setUserSplitNumber({
			splitNumber: e.target.valueAsNumber,
		});
	};

	// When user lands on the home screen, app will automatically retrieve the database data and store it in the previousBill state

	useEffect(() => {
		// if (inputDisplay === true) {
		const billDataContainer = [];
		onValue(dbRef, (snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();

				for (let key in data) {
					const billData = [];
					billData.push(key);
					billData.push(data[key].timeCreated);
					billData.push(data[key].totalBill);
					billData.push(data[key].splitNumber);
					billData.push(data[key].totalPerPerson);
					billDataContainer.push(billData);
				}
				setBillDataObject(billDataContainer);
			} else {
				console.log("No data");
			}
		});
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inputDisplay]);

	// Responsible for processing the search request
	const handleBillSearch = (e) => {
		e.preventDefault();
		const copyOfBillDataObject = [...billDataObject];
		const tempFilteredBills = copyOfBillDataObject.filter((bills) => {
			return bills[0] === billSearchID;
		});
		setFilteredBill(tempFilteredBills);
		console.log(filteredBill);
	};

	const collectSearchID = (e) => {
		console.log(e.target.value);
		console.log(e);
		setBillSearchID(e.target.value);
	};

	// const getIndividualBill = () => {
	// 	const lastBillIndex = billDataObject.length - 1;
	// 	setFirebaseKey(billDataObject[lastBillIndex]);
	// 	console.log(firebaseKey);
	// };

	return (
		<div className="App wrapper">
			{inputDisplay ? (
				<>
					<HeaderMain changeDisplay={changeInput} handleBillSearch={handleBillSearch} collectSearchID={collectSearchID} />
					<DisplayBill billDataObject={billDataObject} billSearchID={billSearchID} filteredBill={filteredBill} />
				</>
			) : (
				<>
					<HeaderNewBill changeDisplay={changeInput} />
					<FormNewBill handleBillSubmit={handleBillSubmit} collectTotalBill={collectTotalBill} collectUserSplit={collectUserSplit} />
					<DisplayBill billDataObject={billDataObject} billSearchID={billSearchID} filteredBill={filteredBill} />
				</>
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
