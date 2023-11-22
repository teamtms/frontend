import styles from './index.module.scss';

import { TextProps } from '../../interfaces/TextProps';

const Title1 = (props: TextProps) => {
	return (
		<h2 className={`${props.className} ${styles.title1}`}>{props.children}</h2>
	);
};

export default Title1;