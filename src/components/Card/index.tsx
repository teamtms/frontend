import styles from './index.module.scss';
import { HTMLAttributes } from 'react';

export const Card = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) => {

	return (
		<div className={`${styles[`card_${localStorage.getItem('brand-theme')}`]} ${styles.card} ${className}`} {...props}>{children}</div>
	);
};