import { useQuery } from '@tanstack/react-query';
import './index.scss';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { wordpress } from '../../services/wordpress';

export const Page = () => {
	const params = useParams();

	const { isLoading, isSuccess, isError, data, error } = useQuery([`page-${params.id}`],
		() => wordpress.getPageById(Number(params.id)));

	useEffect(() => {
		const links = document.querySelectorAll('a[href^="#"]');

		links.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();

				document.querySelector('#' + (link as HTMLLinkElement).href.split('#')[1])?.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			});
		});

		return () => {
			links.forEach((link) => {
				link.removeEventListener('click', () => { });
			});
		}
	}, [isSuccess]);

	if (isLoading) {
		return <div className="container">Подождите...</div>
	}
	if (isError) {
		console.log(error);
		return <div className="container">Ошибка. См. подробности в консоли.</div>
	}
	if (!isSuccess) {
		return <div className="container">Неизвестная ошибка.</div>
	}

	return (
		<div className="container page" dangerouslySetInnerHTML={{ __html: data.data.content.rendered }}></div>
	);
};