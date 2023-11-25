import styles from './User.module.scss';
import { lazy, useState } from 'react';
import { firestore } from '../../services/firestore.service';
import { useParams } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';

const Profile = lazy(() => import('../../blocks/Profile/Profile.component'));

export const User = () => {
	const params = useParams();
	const [user, setUser] = useState<DocumentData>();

	firestore.getUserByLogin(params.login!).then((data) => {
		if (data)
			setUser(data);
	})

	if (user) {
		return (
			<div className={`${styles.container} container`}>
				<Profile
					avatar={user.avatar}
					username={user.username}
					fraction={user.fraction}
					email={user.email}
					role={user.role}
					status={user.status}
					balance={user.balance}
				/>
			</div>
		);
	}
	else return <>Пользователь не найден</>
};