import { useQuery } from '@tanstack/react-query';
import styles from './index.module.scss';
import { lazy } from 'react';
import { wordpress } from '../../services/wordpress';
const WebhookFile = lazy(() => import('./WebhookFile'));

const WebhookFilesPage = () => {
	const { data, error } = useQuery({ queryKey: ['webhook-files'], queryFn: () => wordpress.getWebhookFiles() })

	if (data) {
		return (
			<div className={`${styles.container} container`}>
				{data.data.map((item) => <WebhookFile title={item.title.rendered} content={item.content.rendered} />)}
			</div>
		);
	}
	else { console.log(error); return <>error</> }
};

export default WebhookFilesPage;