import styles from './index.module.scss';
import React from 'react';

import { TextProps } from '../../interfaces/TextProps';

export const Title1 = (props: TextProps): React.ReactElement => {
	return (
		<h2 className={`${props.className} ${styles.title1}`}>{props.children}</h2>
	);
};