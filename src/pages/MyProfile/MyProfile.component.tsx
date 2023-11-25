import styles from './index.module.scss';
import { ReactNode, lazy, useContext } from 'react';
import { ProfileContext } from '../../App';

const Profile = lazy(() => import('../../blocks/Profile/Profile.component'))

const MyProfilePage = (): ReactNode => {
	const user = useContext(ProfileContext);

	console.log(user);

	if (user.username)
		return (
			<div className={`${styles.container} container`}>
				<Profile
					isOwner
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
	else return <>{location.hash = '/login'}</>
};

export default MyProfilePage