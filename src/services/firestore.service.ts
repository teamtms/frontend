import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.service";

export const firestore = {
	// auth: (login: string, password: string) => { },
	logOut: () => {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		location.reload();
	},
	isLoggedIn: () => localStorage.getItem('email') && localStorage.getItem('password'),
	login: async (email?: string, password?: string) => {
		const savedEmail = localStorage.getItem('email');
		const savedPassword = localStorage.getItem('password');

		if (savedEmail && savedPassword) {
			email = savedEmail;
			password = savedPassword;
		}

		else if (!email || !password) return false;

		const docSnap = await getDoc(doc(db, 'users', email!));
		if (docSnap.exists()) {
			if (docSnap.data().password === password) {
				localStorage.setItem('email', email!);
				localStorage.setItem('password', password!);

				return { fetched: docSnap.data(), email: email };
			}
		}
		alert('Что-то пошло не так');

		if (!localStorage.getItem('email') && !localStorage.getItem('password')) location.reload();
	},
	getUserByLogin: async (login: string) => {
		const docSnap = await getDoc(doc(db, 'users', login));

		if (docSnap.exists()) {
			return docSnap.data();
		}
		else {
			return false
		}
	}
}