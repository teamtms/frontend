import styles from './index.module.scss';
import React, { useContext } from 'react';

import { useQuery } from '@tanstack/react-query';
import { WordpressService } from '../../services/wordpress';
import { getRandomInt } from '../../functions/getRandomInt';

import { SiteSettingsContext } from '../../contexts/SiteSettings';
import { Icon } from '../../components/Icon/index';

export const Header = (): React.ReactElement => {
	const siteSettings = useContext(SiteSettingsContext);
	const { isLoading, isError, isSuccess, data, error } = useQuery(['pages'], () => WordpressService.getPages());

	if (isError) {
		console.log(error);
		return <>Ошибка. См. подробности в консоли</>
	}
	if (isLoading) {
		return <>Подождите...</>
	}
	if (!isSuccess) {
		return <>Неизвестная ошибка</>
	}

	return (
		<header className={styles.header}>
			<div className={`container ${styles.container}`}>
				<div className={styles.logo}>
					<a href={`?${getRandomInt(512)}`} className={styles.link}>
						<img src={siteSettings.icon} alt="" className={styles.icon} />
						<div className={styles.text}>
							<h2 className={styles.bigLabel}>{siteSettings.title}</h2>
							<span className={styles.description}>{siteSettings.description}</span>
						</div>
					</a>
				</div>
				<ul className={styles.menu}>
					{data.data.map((item, index) =>
						<li key={index} className={styles.menuItem}>
							<a href={`?${getRandomInt(512)}/#/p/${item.id}`} className={styles.menuLink}>{item.title.rendered}</a>
						</li>)}
				</ul>
				<div className={styles.ip}><Icon icon='dns' /> IP: mc.thetms.ru</div>
			</div>
		</header>
	);
};