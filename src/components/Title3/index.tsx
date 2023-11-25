import styles from './index.module.scss';

import { TextProps } from '../../interfaces/TextProps';

export const Title3 = (props: TextProps) => {
	return (
		<h3 {...props} className={`${props.className} ${styles.title}`}>{props.children}</h3>
	);
};