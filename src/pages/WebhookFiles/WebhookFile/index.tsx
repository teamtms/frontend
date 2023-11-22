import styles from './index.module.scss';
import React, { lazy } from 'react';

import { Card, Button } from '../../../components';
const Title2 = lazy(() => import('../../../components/Title2'));
import { Discord } from '../../../services/discord';

export interface WebhookFileProps {
	title: string
	content: string
}

export const WebhookFile = (props: WebhookFileProps): React.ReactElement => {
	const content = props.content.replace(/[<p>,</p>]/g, '');

	return (
		<Card>
			<details>
				<summary className={styles.title}><Title2>{props.title}</Title2></summary>
				<div className={styles.content} dangerouslySetInnerHTML={{ __html: props.content }}></div>
				<Button onClick={() => { Discord.sendSystemMessage(props.title, content) }}>Вывести</Button>
			</details>

		</Card>
	);
};