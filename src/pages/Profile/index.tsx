import styles from './index.module.scss';
import { ReactNode, lazy, useContext } from 'react';
import { Button, Icon, Input } from '../../components';
const Title1 = lazy(() => import('../../components/Title1'));
import { ProfileContext } from '../../App';
import { firestore } from '../../services/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const changeField = (email: string, fieldName: string, newValue: string) => {
	console.log(email);
	setDoc(doc(db, 'users', email), {
		[fieldName]: newValue
	}, { merge: true });
}

const ProfilePage = (): ReactNode => {
	const user = useContext(ProfileContext);

	console.log(user);

	if (user.username)
		return (
			<div className="container">
				<Title1>Профиль пользователя</Title1>
				<div className={styles.columns}>
					<img className={styles.avatar} src={user.avatar} alt="Ytyt" />
					<div className={styles.profile}>
						<div className={styles.profileBlock}>
							<Input id="new-username" placeholder={user.username} /> <Button onClick={() => changeField(user.email, 'username', (document.querySelector('#new-username')! as HTMLInputElement).value)}>Сохранить</Button>
						</div>
						<div className={styles.profileBlock}>
							<Input id="new-avatar" placeholder="Аватарка (ссылка)" /> <Button onClick={() => changeField(user.email, 'avatar', (document.querySelector('#new-avatar')! as HTMLInputElement).value)}>Изменить</Button>
						</div>
						<div className={styles.profileBlock}>
							<Icon icon="monetization_on" /> <span>Баланс: {user.balance}</span>
						</div>
						<Button appearance='link' className={styles.profileBlock} onClick={firestore.logOut}>
							<Icon icon="logout" /> <span>Выйти</span>
						</Button>
					</div>
				</div>
			</div>
		);
	else return <>{location.hash = '/login'}</>
};

export default ProfilePage