import styles from './index.module.scss';
import { Button, Card, Icon, Input, Body1Strong } from '../../components';
import { firestore } from '../../services/firestore.service';
import { lazy, useContext } from 'react';
import { changeField } from './changeField.function';
import { ProfileContext } from '../../App';
import { discord } from '../../services/Discord.service';
const Title2 = lazy(() => import('../../components/Title2'));

interface ProfileProps {
	isOwner?: boolean
	avatar?: string
	username: string
	fraction: string
	email: string
	role: string
	status: string
	balance: string
}

const Profile = (props: ProfileProps) => {
	const user = useContext(ProfileContext);

	return (<Card className={`${styles.card}`}>
		<Title2 className={styles.userProfile}>{props.isOwner ? 'Профиль' : props.username}</Title2>
		<div className={styles.columns}>
			<div className={styles.info}>
				<img className={styles.avatar} src={props.avatar} alt={props.username} />
				<Body1Strong className={styles.username}>{props.username}</Body1Strong>
				<div className={styles.profileBlock} title='Фракция'>
					<Icon icon="barefoot" /> <span>{props.fraction}</span>
				</div>
				<div className={styles.profileBlock} title='Роль'>
					<Icon icon="shield_person" /> <span>{props.role}</span>
				</div>
				<div className={styles.profileBlock} title='Возможности на сайте'>
					<Icon icon="web" /> <span>{props.status === 'admin' ? 'Админ' : 'Пользователь'}</span>
				</div>
				{user.status === 'admin' ?
					<Button className={styles.adminButton} onClick={() =>
						discord.sendSystemMessage('Аккаунты',
							`Имя: ${props.username}\nФракция: ${props.fraction}\nРоль: ${props.role}\nБаланс: ${props.balance}₸`)}>
						Вывести данные
					</Button> : ''}
			</div>
			{props.isOwner ?
				<div className={styles.profile}>
					<div className={styles.profileBlock}>
						<Input id="new-username" placeholder={props.username} /> <Button onClick={() => changeField(props.email, 'username', (document.querySelector('#new-username')! as HTMLInputElement).value)}>Сохранить</Button>
					</div>
					<div className={styles.profileBlock}>
						<Input id="new-avatar" placeholder="Аватарка (ссылка)" /> <Button onClick={() => changeField(props.email, 'avatar', (document.querySelector('#new-avatar')! as HTMLInputElement).value)}>Изменить</Button>
					</div>
					<div className={styles.profileBlock}>
						<Icon icon="monetization_on" /> <span>Баланс: {props.balance}</span>
					</div>
					<Button appearance='link' className={styles.profileBlock} onClick={firestore.logOut}>
						<Icon icon="logout" /> <span>Выйти</span>
					</Button>
				</div> : ''}
		</div>
	</Card>
	)
}


export default Profile;