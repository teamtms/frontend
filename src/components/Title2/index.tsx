import styles from './index.module.scss';

import { TextProps } from '../../interfaces/TextProps';

const Title2 = (props: TextProps) => {
	return (
		<h2 {...props} className={`${props.className} ${styles.title2}`}>{props.children}</h2>
	);
};

export default Title2;