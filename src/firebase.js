// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAoAC3aBvJS_R79i_6_Ee6YFOkysNM0ZQ8",
	authDomain: "project-3-dffd6.firebaseapp.com",
	databaseURL: "https://project-3-dffd6-default-rtdb.firebaseio.com",
	projectId: "project-3-dffd6",
	storageBucket: "project-3-dffd6.appspot.com",
	messagingSenderId: "597169820925",
	appId: "1:597169820925:web:7ae71289142ee64a915a94",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
