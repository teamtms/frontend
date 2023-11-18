import styles from './index.module.scss';
import React from 'react';

import { TextProps } from '../../interfaces/TextProps';

export const Title2 = (props: TextProps): React.ReactElement => {
	return (
		<h2 className={styles.title2}>{props.children}</h2>
	);
};