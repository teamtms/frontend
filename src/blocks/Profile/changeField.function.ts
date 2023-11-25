import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase.service";

export const changeField = (email: string, fieldName: string, newValue: string) => {
	console.log(email);
	setDoc(doc(db, 'users', email), {
		[fieldName]: newValue
	}, { merge: true });
}