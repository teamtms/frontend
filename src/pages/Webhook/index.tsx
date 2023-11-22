import styles from './index.module.scss';
import axios from 'axios';
import { ReactNode, lazy } from 'react';
import { Button, Input, Spoiler } from '../../components';
const Title2 = lazy(() => import('../../components/Title2'));
import WebhookCard from './WebhookCard';

const queryParams: any = {};

if (location.search.split('?')[1]) {
	location.search.split('?')[1].split('&').forEach((variable) => {
		queryParams[variable.split('=')[0]] = variable.split('=')[1]
	});
}

const WebhookPage = (): ReactNode => {
	const getWebhooksKeys = () => {
		return Object.keys(localStorage).filter((item) => item.startsWith('wh-'));
	}

	const getActiveWebhook = (): string | false => {
		const webhooks = document.querySelectorAll('[name="webhook"]') as NodeListOf<HTMLInputElement>;

		for (let i = 0; i < webhooks.length; i++) {
			const webhook = webhooks[i];
			if (webhook.checked) return webhook.id
		}

		alert('Вебхук не выбран. Выберите существующий вебхук или создайте новый');
		return false;
	}

	const sendMessage = (username: string, message: string) => {

		const webhook = getActiveWebhook();

		if (webhook) {
			axios.post(webhook, {
				username: username ? username : 'undefined',
				content: message

			})
		}
	}

	return (
		<div className={`container`}>
			<Title2 className={styles.title}>Ваши вебхуки</Title2>

			<div className={styles.webhooks}>
				{getWebhooksKeys().map((item, index) =>
					<WebhookCard
						key={index}
						id={localStorage.getItem(item)!}
						label={item.split('wh-')[1]}
					/>)}
			</div>
			<div className={styles.forms}>
				<Spoiler title="Новый вебхук">
					<form className={styles.spoilerContent} onSubmit={(e) => {
						e.preventDefault();
						const newName = (document.querySelector('#new-name') as HTMLInputElement)!.value;
						const newUrl = (document.querySelector('#new-url') as HTMLInputElement)!.value;

						localStorage.setItem(`wh-${newName}`, newUrl);
						location.reload();
					}}>
						<Input required placeholder='Название (без пробелов!)' id="new-name" />
						<Input required placeholder='Ссылка' id="new-url" />
						<Button type="submit">Добавить</Button>
					</form>
				</Spoiler>

				<form className={styles.form} onSubmit={(e) => {
					e.preventDefault();
					sendMessage((document.querySelector('#name') as HTMLInputElement)!.value,
						(document.querySelector('#message') as HTMLInputElement)!.value)
				}}>
					<Input placeholder='Имя' id="name" />
					<Input required placeholder='Сообщение' id="message" />
					<Button type="submit">Отправить</Button>
				</form>
			</div>
		</div >
	);
};

export default WebhookPage;