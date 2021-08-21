import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA583zKyrzkBTrGDNJ3fZRWVlBK7u8zNYQ",
	authDomain: "todo-app-a6d18.firebaseapp.com",
	projectId: "todo-app-a6d18",
	storageBucket: "todo-app-a6d18.appspot.com",
	messagingSenderId: "359467795559",
	appId: "1:359467795559:web:b62911217bf18edd6ec0c2",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
