import styles from "./WebhookCard.module.scss";
import { Card, Icon } from "../../../components";
import { WebhookCardProps } from "./WebhookCard.props";

const WebhookCard = (props: WebhookCardProps) => {
	return (
		<label htmlFor={props.id}>
			<Card title={props.id} className={styles.webhookSelect}>
				<div className={styles.webhookLabel}>
					<input type="radio" name="webhook" id={props.id} />
					{props.label}
				</div>
				<button onClick={() => { if (confirm(`Вы хотите удалить вебхук "${props.label}"?`)) { localStorage.removeItem(`wh-${props.label}`); location.reload() } }}>
					<Icon icon="close" />
				</button>
			</Card>
		</label>
	)
}

export default WebhookCard