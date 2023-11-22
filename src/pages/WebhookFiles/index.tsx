import { useQuery } from '@tanstack/react-query';
import styles from './index.module.scss';
import React from 'react';
import { WordpressService } from '../../services/wordpress';
import { WebhookFile } from './WebhookFile';

const WebhookFilesPage = (): React.ReactElement => {
	const { data, error } = useQuery({ queryKey: ['webhook-files'], queryFn: () => WordpressService.getWebhookFiles() })

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