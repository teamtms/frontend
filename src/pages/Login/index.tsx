import styles from "./index.module.scss";
import { FormEvent, ReactNode, lazy, useState } from 'react';

import { Button, Card, Input } from '../../components';
const Title2 = lazy(() => import('../../components/Title2'));
import { firestore } from "../../services/firestore";
import { IProfile } from "../../interfaces/IProfile";

export const useLogin = () => {
	const [loginData, setLoginData] = useState<IProfile>({ password: '', balance: '', username: '', avatar: '' })

	return {
		login: (email: string, password: string) =>
			firestore.login(email, password).then((data) => {
				setLoginData({
					password: data ? data.password : '',
					balance: data ? data.balance : '',
					username: data ? data.username : '',
					avatar: data ? data.avatar : '',
				})
			}),
		loginData: loginData
	}
}

const LoginPage = (): ReactNode => {
	const { login } = useLogin();

	const onLogin = (e: FormEvent<HTMLElement>) => {
		e.preventDefault();

		const email = (document.querySelector('#email') as HTMLInputElement).value;
		const password = (document.querySelector('#password') as HTMLInputElement).value;

		login(email, password);
	}

	return (
		<div className="container">
			<Card className={styles.card}>
				<form className={styles.form} onSubmit={onLogin}>
					<Title2 className={styles.title}>Войти</Title2>
					<Input id='email' placeholder="Эл. почта" autoComplete="email" />
					<Input id='password' placeholder="Пароль" type="password" />
					<Button className={styles.button}>Войти</Button>
					<Button className={styles.button} appearance="link">Зарегистрироваться пока нельзя :(</Button>
					<Button className={styles.button} appearance="link">Забыли пароль?</Button>
				</form>
			</Card>
		</div>
	);
};

export default LoginPage;