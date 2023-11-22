import styles from './index.module.scss';
import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { wordpress } from '../../services/wordpress';
import { getRandomInt } from '../../functions/getRandomInt';

import { SiteSettingsContext } from '../../contexts/SiteSettings';
import { Button, Card, Icon } from '../../components';
import { firestore } from '../../services/firestore';
import { ProfileContext } from '../../App';

const Header = () => {
	const siteSettings = useContext(SiteSettingsContext);
	const { isLoading, isError, isSuccess, data, error } = useQuery(['pages'], () => wordpress.getPages());
	const user = useContext(ProfileContext);

	if (isError) {
		console.log(error);
		return <>Ошибка. См. подробности в консоли</>
	}
	if (isLoading) {
		return <>Подождите...</>
	}
	if (!isSuccess) {
		return <>Неизвестная ошибка</>
	}

	return (
		<header className={styles.header}>
			<div className={`container ${styles.container}`}>
				<div className={styles.logo}>
					<a href={`?${getRandomInt(512)}`} className={styles.link}>
						<img src={siteSettings.icon} alt="" className={styles.icon} />
						<div className={styles.text}>
							<h2 className={styles.bigLabel}>{siteSettings.title}</h2>
							<span className={styles.description}>{siteSettings.description}</span>
						</div>
					</a>
				</div>
				<ul className={styles.menu}>
					{data.data.map((item, index) =>
						<li key={index} className={styles.menuItem}>
							<Button appearance='link' href={`?${getRandomInt(512)}/#/p/${item.id}`} className={styles.menuLink}>{item.title.rendered}</Button>
						</li>)}
				</ul>
				{firestore.isLoggedIn() ?
					<a href="/#/profile"><Card className={styles.profileCard}>
						<div className={styles.profileBlock}>
							<img className={styles.avatar} src={user.avatar} alt="" /> {user.username}
						</div>
						<div className={styles.profileBlock}>
							<Icon icon="monetization_on" /> {user.balance}
						</div>
						<div className={styles.profileBlock}>
							<Icon icon="logout" />
							<Button appearance='link' onClick={() => firestore.logOut()}>Выйти</Button>
						</div>
					</Card></a> : <Button as='a' href="/#/login">Войти</Button>}
				{/* <Card className={styles.ip}><Icon icon='dns' /> IP: mc.thetms.ru</Card> */}
			</div>
		</header >
	);
};

export default Header;