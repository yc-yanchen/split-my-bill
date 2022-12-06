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

function App() {
	// useState
	const [inputDisplay, setInputDisplay] = useState(false);
	const [firebaseData, setFirebaseData] = useState([]);
	const [packageToFirebase, setPackageToFirebase] = useState({splitNumber: "", timeCreated: "", totalBill: "", totalPerPerson: ""});

	useEffect(() => {
		// Firebase initialization
		const database = getDatabase(firebase);
		// dbRed will reference our database
		const dbRef = ref(database);
		const forFirebaseData = [];
		onValue(dbRef, (snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();

				for (let key in data) {
					forFirebaseData.push({key: key, splitNumber: data[key].splitNumber, timeCreated: data[key].timeCreated, totalBill: data[key].totalBill, totalPerPerson: data[key].totalPerPerson});
				}
				setFirebaseData(forFirebaseData);
				console.log(forFirebaseData);
			} else {
				console.log("no data");
			}
		});
	}, []);

	// Flips inputDisplay from false to true
	const changeDisplay = () => {
		setInputDisplay(!inputDisplay);
	};

	const inputOnChange = (e) => {
		setPackageToFirebase({totalBill: e.target.valueAsNumber});
		console.log(e.target.valueAsNumber);
		console.log(packageToFirebase);
	};

	return (
		<div className="App wrapper">
			<NavigationBar inputDisplay={inputDisplay} changeDisplay={changeDisplay} />
			{!inputDisplay ? (
				<>
					<Header title="Split My Bill" changeDisplay={changeDisplay} /> <SearchBar />
					<BillDisplay firebaseData={firebaseData} />
					<AddButton changeDisplay={changeDisplay} />
				</>
			) : (
				<>
					<Header title="New bill" changeDisplay={changeDisplay} />
					<BillForm inputOnChange={inputOnChange} />
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
