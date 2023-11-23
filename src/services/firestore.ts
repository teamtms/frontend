import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const firestore = {
	// auth: (login: string, password: string) => { },
	logOut: () => {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		location.reload();
	},
	isLoggedIn: () => localStorage.getItem('email') && localStorage.getItem('password'),
	login: async (email?: string, password?: string) => {

		if (localStorage.getItem('email') && localStorage.getItem('password')) {
			email = localStorage.getItem('email')!;
			password = localStorage.getItem('password')!;

			console.log(`Авторизация из Localstorage`)
		}

		else if (!email || !password) return false;

		console.log(`email: ${email} password: ${password} Авторизация`)

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
	}
}