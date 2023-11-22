import { Body1Strong, Card } from '..';
import styles from './index.module.scss';
import { ReactNode } from 'react';

export interface SpoilerProps {
	children?: ReactNode
	className?: string,
	title?: ReactNode
}

export const Spoiler = ({ className, title, children, ...props }: SpoilerProps) => {
	return (
		<Card>
			<details {...props}>
				<summary className={styles.title}><Body1Strong>{title}</Body1Strong></summary>
				<div className={styles.body}>
					{children}
				</div>
			</details>
		</Card>
	);
};