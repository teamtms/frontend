import styles from './index.module.scss';
import React from 'react';
import { Icon } from '../Icon/index';

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLUListElement> {
	items: { name: string, url: string }[]
}

export const Breadcrumbs = ({ items, className, ...props }: BreadcrumbsProps): React.ReactElement => {
	return (
		<ul className={`${styles.breadcrumbs} ${className}`} {...props}>
			{items.map((item, index) =>
				<li className={styles.breadcrumb} key={index}>
					{index === items.length - 1 ? item.name : <>
						<a href={item.url} className={styles.link}>{item.name}</a> <Icon icon='chevron_right' />
					</>}

				</li>
			)}
		</ul>
	);
};