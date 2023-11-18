import { useQuery } from '@tanstack/react-query';
// import styles from './index.module.scss';
import React from 'react';
import { WordpressService } from '../../services/wordpress';
import { getRandomInt } from '../../functions/getRandomInt';
import { Card } from '../../components';

export const Headings = (): React.ReactElement => {
	const { isSuccess, isLoading, isError, data, error } = useQuery(['headlings'], () => WordpressService.getHeadlings());

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
		<Card>
			{data.data.map((headling) =>
				<a key={headling.id} href={`?${getRandomInt(15)}/#/posts/${headling.id}`}>
					{headling.name}
				</a>
			)}
		</Card>
	);
};