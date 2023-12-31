import styles from './index.module.scss';

import { TextProps } from '../../interfaces/TextProps';

export const Title2 = (props: TextProps) => {
	return (
		<h2 className={styles.title2}>{props.children}</h2>
	);
};