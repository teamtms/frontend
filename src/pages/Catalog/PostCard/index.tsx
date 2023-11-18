import styles from './index.module.scss';
import React, { HTMLAttributes } from 'react';

import { Card, Title2 } from '../../../components';
import { Icon } from '../../../components/Icon/index';

interface PostCardProps extends HTMLAttributes<HTMLDivElement> {
	image: string
	title: string
	excerpt: string
	url: string
	tags: string
}

export const PostCard = (props: PostCardProps): React.ReactElement => {
	return (
		<Card className={styles.card}>
			<img src={props.image} alt="" />
			<div className={styles.content}>
				<Title2 className={styles.title}><a href={props.url}>{props.title}</a></Title2>
				<div dangerouslySetInnerHTML={{ __html: props.excerpt }}></div>
			</div>
			<div className="flexBlock">
				<Icon icon='sell' /> <span>{props.tags}</span>
			</div>

		</Card>
	);
};