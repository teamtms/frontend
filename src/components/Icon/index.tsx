import styles from './index.module.scss';
import React from 'react';
import { HTMLAttributes } from 'react';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
	icon: string
}

export const Icon = ({ icon, className, ...props }: IconProps): React.ReactElement => {
	return (
		<i className={`${styles.icon} ${className}`} {...props}>{icon}</i>
	);
};