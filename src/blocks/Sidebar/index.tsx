import styles from './index.module.scss';

import { Headings } from '../Headings';

export const Sidebar = () => {
	return (
		<div className={styles.sidebar}>
			<span className={styles.title}>Рубрики:</span>
			<Headings />
		</div>
	);
};