import styles from './index.module.scss';

import { TextProps } from '../../interfaces/TextProps';

export const Body1Strong = (props: TextProps) => {
	return (
		<strong className={`${props.className} ${styles.body1strong}`}>{props.children}</strong>
	);
};