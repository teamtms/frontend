import styles from './index.module.scss';
import { MouseEventHandler, ReactNode } from 'react';

const themeId = localStorage.getItem('brand-theme');

interface ButtonProps {
	type?: 'submit' | 'button';
	as?: 'button' | 'a';
	appearance?: 'primary' | 'link';
	className?: string;
	children?: ReactNode;
	href?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ className, as, onClick, href, appearance, ...props }: ButtonProps) => {
	const defaultProps = {
		className: `${className} ${styles[`appearance-${appearance}`]} ${styles[`button-${themeId}`]} `,
		...props
	}

	if (as === 'a') {
		return (
			<a href={href} {...defaultProps}></a>
		);
	}

	return (
		<button onClick={onClick} {...defaultProps}></button>
	);
};