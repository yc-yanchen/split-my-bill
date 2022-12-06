import "./App.css";
import firebase from "./firebase";
import {getDatabase, ref, push, onValue} from "firebase/database";
import {useState, useEffect} from "react";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import BillDisplay from "./BillDisplay";
import AddButton from "./AddButton";
import BillForm from "./BillForm";
import SearchBar from "./SearchBar";
import Summary from "./Summary";

function App() {
	// useState
	const [inputDisplay, setInputDisplay] = useState(false);
	const [summaryDisplay, setSummaryDisplay] = useState(false);
	const [firebaseData, setFirebaseData] = useState([]);
	const [packageToFirebase, setPackageToFirebase] = useState({});
	const [billID, setBillID] = useState("");
	const [billSearchResult, setBillSearchResult] = useState([]);

	// Firebase initialization
	const database = getDatabase(firebase);
	// dbRed will reference our database
	const dbRef = ref(database);
	useEffect(() => {
		onValue(dbRef, (snapshot) => {
			// 'resetting' the array so there are no duplicates each time the data is updated
			const tempFirebaseData = [];
			setFirebaseData([]);
			if (snapshot.exists()) {
				const data = snapshot.val();
				for (let key in data) {
					// pushing the individual pieces of information from firebase to an object, which gets pushed to a state
					// not using a for let in loop because it wouldn't allow us to push the key into our object
					tempFirebaseData.push({key: key, splitNumber: data[key].splitNumber, timeCreated: data[key].timeCreated, totalBill: data[key].totalBill, totalPerPerson: data[key].totalPerPerson});
				}
				setFirebaseData(tempFirebaseData);
			} else {
				console.log("no data");
			}
		});
	}, []);

	// Flips inputDisplay from false to true
	const changeDisplay = () => {
		setInputDisplay(!inputDisplay);
		// Reset the UI of changeSummary (Mainly used to reset the UI when using the on page back button)
		if (summaryDisplay === true) {
			setSummaryDisplay(!summaryDisplay);
		}
		// Reset the state so that the information doesn't carry over when the user goes back to the home screen

		if (billSearchResult === true) {
			setBillSearchResult([]);
		}
	};

	// Using one onChange function to handle multiple input
	// Referenced: Handling Multiple Inputs with a Single onChange Handle in React by Jake Trent from pluralsight.com
	const inputOnChange = (e) => {
		// When a change occurs, the current value gets stored in a variable
		const value = e.target.valueAsNumber;
		setPackageToFirebase({
			...packageToFirebase,
			// Name of the input will be collected and used as a key and a the previously defined value will be stored
			[e.target.name]: value,
			// Adding additional information to packageToFirebase
		});
	};

	// Create an object called forFirebase which contains the information we want to send to Firebase when the submit button is pressed
	const handleSubmit = (e) => {
		e.preventDefault();
		const timeGenerated = new Date();
		const splitCalculation = (Math.ceil((packageToFirebase.totalBill / packageToFirebase.splitNumber) * 100) / 100).toFixed(2);
		const forFirebase = {totalBill: packageToFirebase.totalBill, splitNumber: packageToFirebase.splitNumber, timeCreated: timeGenerated.toDateString(), totalPerPerson: splitCalculation};
		const uploadToFirebase = push(dbRef, forFirebase);

		// Empty the packageToFirebase state so it's ready for the next upload
		setPackageToFirebase({});
		// Setting the key of the most recently upload to a state so that we could search it later
		setBillID(uploadToFirebase._path.pieces_[0]);

		changeSummary();
	};

	// Flips the summaryDisplay from false to true
	const changeSummary = () => {
		setSummaryDisplay(!summaryDisplay);
	};

	const searchOnChange = (e) => {
		setBillID(e.target.value);

		if (billID.length < 19) {
			setBillSearchResult([]);
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		console.log(billID);
		billSearch();
	};

	// Function to search for bills. Is called when user uses the search input on the homescreen, and also when the user submits their own bill in order to provide them with their bill information including the bill ID.
	const billSearch = () => {
		// Created a copy of the firebaseData which gets updated onValue
		const copyOfFirebaseData = [...firebaseData];
		// Looks for bills with matching bill ID which is stored in the billID state
		const filteredData = copyOfFirebaseData.filter((oneBill) => {
			return oneBill.key == billID;
		});
		console.log(filteredData);
		setBillSearchResult(filteredData);
	};

	return (
		<div className="App wrapper">
			<NavigationBar inputDisplay={inputDisplay} changeDisplay={changeDisplay} />
			{!inputDisplay ? (
				<>
					<Header title="Split My Bill" changeDisplay={changeDisplay} />
					<SearchBar handleSearch={handleSearch} searchOnChange={searchOnChange} />
					<BillDisplay firebaseData={firebaseData} billID={billID} billSearchResult={billSearchResult} setBillSearchResult={setBillSearchResult} />
					<AddButton changeDisplay={changeDisplay} />
				</>
			) : (
				<>
					{!summaryDisplay ? (
						<>
							<Header title="New Bill" changeDisplay={changeDisplay} />
							<BillForm inputOnChange={inputOnChange} handleSubmit={handleSubmit} />
						</>
					) : (
						<>
							<Header title="Bill Summary" changeDisplay={changeDisplay} />
							<Summary billID={billID} billSearch={billSearch} billSearchResult={billSearchResult} />
						</>
					)}
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
