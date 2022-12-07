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
	// useState for changing UI between the home screen and the form input screen
	const [inputDisplay, setInputDisplay] = useState(false);

	// useState for changing between the form input screen and the summary screen
	const [summaryDisplay, setSummaryDisplay] = useState(false);

	// useState to store new Firebase data
	const [firebaseData, setFirebaseData] = useState([]);

	// useState to locally package data to be sent to Firebase
	const [packageToFirebase, setPackageToFirebase] = useState({});

	// useState to store a single bill ID. This is automatically updated with the bill ID of new user bill and also when the user searches for a bill
	const [billID, setBillID] = useState("");

	// useState to store the filtered result from user search. Should only contain one array.
	const [billSearchResult, setBillSearchResult] = useState([]);

	// useState which determines the presence of an error related to a search
	const [searchError, setSearchError] = useState(false);

	// useState which determines the presence of an error related to a push to Firebase
	const [pushError, setPushError] = useState(false);

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
					tempFirebaseData.push({
						key: key,
						splitNumber: data[key].splitNumber,
						timeCreated: data[key].timeCreated,
						totalBill: data[key].totalBill,
						totalPerPerson: data[key].totalPerPerson,
						emoji: data[key].emoji,
					});
				}
				setFirebaseData(tempFirebaseData);
			} else {
				console.log("no data");
			}
		});
	}, [dbRef]);

	// Flips inputDisplay from false to true
	const changeDisplay = () => {
		setInputDisplay(!inputDisplay);
		// Reset the UI of changeSummary (Mainly used to reset the UI when using the on page back button)
		if (summaryDisplay === true) {
			setSummaryDisplay(!summaryDisplay);
		}
		// Reset the state so that the information doesn't carry over when the user goes back to the home screen
		setBillSearchResult([]);
		setBillID("");
		setPushError(false);
	};

	// Using one onChange function to handle multiple input
	// Referenced: Handling Multiple Inputs with a Single onChange Handle in React by Jake Trent from pluralsight.com
	const inputOnChange = (e) => {
		// When a change occurs, the current value gets stored in a variable
		const value = e.target.value;
		setPackageToFirebase({
			...packageToFirebase,
			// Name of the input will be collected and used as a key and a the previously defined value will be stored
			[e.target.name]: value,
		});
	};

	// Create an object called forFirebase which contains the information we want to send to Firebase when the submit button is pressed
	const handleSubmit = (e) => {
		try {
			e.preventDefault();
			// Add a time stamp to the push
			const timeGenerated = new Date();
			// Calculates the split cost. Will always round up to prevent missing money (ie. $10 / 3 = $3.33 => $3.33 * 3 = $9.99! Hey where did my money go??)
			const splitCalculation = (Math.ceil((packageToFirebase.totalBill / packageToFirebase.splitNumber) * 100) / 100).toFixed(2);
			// Packaging up an object to be sent to Firebase
			const forFirebase = {
				totalBill: packageToFirebase.totalBill,
				splitNumber: packageToFirebase.splitNumber,
				timeCreated: timeGenerated.toDateString(),
				totalPerPerson: splitCalculation,
				emoji: packageToFirebase.emoji,
			};
			// Create an object containing the push information
			const uploadToFirebase = push(dbRef, forFirebase);

			// Empty the packageToFirebase state so it's ready for the next upload
			setPackageToFirebase({});
			// Setting the key of the most recent upload to a state so that we could search it later
			setBillID(uploadToFirebase._path.pieces_[0]);
			// billSearch();
			changeSummary();
		} catch (error) {
			setPushError(true);
		}
	};

	// Flips the summaryDisplay from false to true
	const changeSummary = () => {
		setSummaryDisplay(!summaryDisplay);
	};

	// Detects change when user is using the search bar
	const searchOnChange = (e) => {
		setBillID(e.target.value);

		// when the number of characters entered is less than 20, empty the search result (because 20 characters are needed to search for the bill)
		if (e.target.value.length < 20) {
			setBillSearchResult([]);
		}
		// automatically performs a search when 20 characters are detected in the search bar
		if (e.target.value.length === 20) {
			billSearch();
		}
	};

	// incase the automatic search function above did not work, user can manually perform the search
	const handleSearch = (e) => {
		e.preventDefault();
		billSearch();
	};

	// Function to search for bills. Is called when user uses the search input on the homescreen, and also when the user submits their own bill in order to provide them with their bill information including the bill ID.
	const billSearch = () => {
		// Created a copy of the firebaseData which gets updated onValue
		const copyOfFirebaseData = [...firebaseData];
		// Looks for bills with matching bill ID which is stored in the billID state
		const filteredData = copyOfFirebaseData.filter((oneBill) => {
			return oneBill.key === billID;
		});

		setBillSearchResult(filteredData);

		// Sets search error to either true or false depending the result from the array filter. true for an incorrect bill ID entered.
		if (filteredData.length === 0 && billID.length === 20) {
			setSearchError(true);
		} else {
			setSearchError(false);
		}
	};

	// Function which allow user to copy the current bill ID to their clipboard
	const copyBill = () => {
		navigator.clipboard.writeText(billID);
	};

	return (
		<div className="App wrapper">
			<NavigationBar inputDisplay={inputDisplay} changeDisplay={changeDisplay} />

			{/* Checks the inputDisplay state to determine whether to display the home screen or the form input screen */}
			{!inputDisplay ? (
				<>
					<Header title="Split My Bill" changeDisplay={changeDisplay} />
					<main>
						<SearchBar handleSearch={handleSearch} searchOnChange={searchOnChange} />
						{/* If the search for is less than 20 characters long, display all previous bills, otherwise, display the search results screen */}
						{billID.length < 20 ? (
							<>
								<h2>Previous bills</h2>
								<BillDisplay firebaseData={firebaseData} billID={billID} billSearchResult={billSearchResult} setBillSearchResult={setBillSearchResult} />
							</>
						) : (
							<>
								{/* When no errors are present during the search, the searched bill will be displayed. If error is present, a message will be displayed alerting user to check their bill ID */}
								{searchError === false ? (
									<>
										<h2>Search result</h2>
										<Summary billID={billID} billSearch={billSearch} billSearchResult={billSearchResult} />
									</>
								) : (
									<p>Please check your bill ID and search again</p>
								)}
							</>
						)}
					</main>

					{/* A floating add button which gives user access to the input form */}
					<AddButton changeDisplay={changeDisplay} />
				</>
			) : (
				<>
					{/* Checks if user should be in the form input screen or the summary screen */}
					{!summaryDisplay ? (
						<>
							<Header title="New Bill" changeDisplay={changeDisplay} />
							<main>
								<>
									{/* Alerts user to pick an icon for their bill if they haven't picked one */}
									{pushError ? <p className="text-red">Please select an icon</p> : null}
									<BillForm inputOnChange={inputOnChange} handleSubmit={handleSubmit} />
								</>
							</main>
						</>
					) : (
						<>
							{/* Summary screen */}
							<Header title="Bill Summary" changeDisplay={changeDisplay} />
							<main>
								<h2>Use the Bill ID to access your bill in the future!</h2>
								<Summary billID={billID} billSearch={billSearch} billSearchResult={billSearchResult} copyBill={copyBill} />
							</main>
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
