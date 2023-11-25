import styles from './index.module.scss';
import { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { wordpress } from '../../services/wordpress';

import { Body1Strong, Button, Icon } from '../../components';
import { firestore } from '../../services/firestore.service';
import { ProfileContext } from '../../App';
import { Logo } from '../Logo/Logo.component';

const Footer = () => {
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
		<footer className={styles.footer}>
			<div className={`container ${styles.container}`}>
				<div className={styles.column}>
					<Logo />
				</div>
				<div className={styles.column}>
					<Body1Strong className={styles.menuTitle}>Меню</Body1Strong>
					<ul className={styles.menu}>
						<li className={styles.menuItem}>
							<Button appearance='link' as="a" href={`#/send`} className={styles.menuLink}>Вебхуки</Button>
						</li>
						<li className={styles.menuItem}>
							<Button appearance='link' as="a" href={`#/profile`} className={styles.menuLink}>Мой профиль</Button>
						</li>
						{data.data.map((item, index) =>
							<li key={index} className={styles.menuItem}>
								<Button appearance='link' as="a" href={`#/p/${item.id}`} className={styles.menuLink}>{item.title.rendered}</Button>
							</li>)}
					</ul>
				</div>
				{user.status === 'admin' ?
					<div className={styles.column}>
						<Body1Strong className={styles.menuTitle}>Админ-меню</Body1Strong>
						<ul className={styles.menu}>
							<li className={styles.menuItem}>
								<Button appearance='link' as="a" href={`#/lsedit`} className={styles.menuLink}>Редактор компонентов</Button>
							</li>
							<li className={styles.menuItem}>
								<Button appearance='link' as="a" href={`#/create-profile`} className={styles.menuLink}>Создание пользователей</Button>
							</li>
						</ul>
					</div> : ''}
				<div className={styles.column}>
					{firestore.isLoggedIn() ?
						<a href="#/profile"><div className={styles.profileCard}>
							<div className={styles.profileBlock}>
								<Icon icon="person" /> Привет, {user.username}
							</div>
							<div className={styles.profileBlock}>
								<Icon icon="monetization_on" /> Баланс: {user.balance}
							</div>
							<div className={styles.profileBlock}>
								<Icon icon="logout" />
								<Button appearance='link' onClick={() => firestore.logOut()}>Выйти из аккаунта</Button>
							</div>
						</div></a> : <Button as='a' href="/#/login">Войти</Button>}
				</div>
				{/* <Card className={styles.ip}><Icon icon='dns' /> IP: mc.thetms.ru</Card> */}
			</div>
		</footer >
	);
};

export default Footer;