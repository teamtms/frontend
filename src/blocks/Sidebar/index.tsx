import styles from './index.module.scss';
import React from 'react';

import { Headings } from '../Headings';

export const Sidebar = (): React.ReactElement => {
	return (
		<div className={styles.sidebar}>
			<span className={styles.title}>Рубрики:</span>
			<Headings />
		</div>
	);
};