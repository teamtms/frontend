import styles from './index.module.scss';
import { HTMLAttributes } from 'react';

const themeId = localStorage.getItem('brand-theme');

interface InputProps extends HTMLAttributes<HTMLInputElement> {
	required?: boolean,
	autoComplete?: string
	type?: string
}

export const Input = ({ className, children, ...props }: InputProps) => {
	return (
		<input className={`${className} ${styles[`input-${themeId}`]} `} {...props} />
	);
};