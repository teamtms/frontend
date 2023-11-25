import { SiteSettingsContext } from '../../contexts/SiteSettings';
import styles from './Logo.module.scss';
import { useContext } from 'react';

export const Logo = () => {
	const siteSettings = useContext(SiteSettingsContext);

	return (
		<div className={styles.logo}>
			<a href={`#`} className={styles.link}>
				<img src={siteSettings.icon} alt="" className={styles.icon} />
				<div className={styles.text}>
					<h2 className={styles.bigLabel}>{siteSettings.title}</h2>
					<span className={styles.description}>{siteSettings.description}</span>
				</div>
			</a>
		</div>
	)
}