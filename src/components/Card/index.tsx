import styles from './index.module.scss';
import React, { HTMLAttributes } from 'react';

export const Card = ({ children, className, ...props }: HTMLAttributes<HTMLDivElement>): React.ReactElement => {

	return (
		<div className={`${styles.card} ${className}`} {...props}>{children}</div>
	);
};