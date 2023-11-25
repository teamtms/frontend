import { useQuery } from '@tanstack/react-query';
import { wordpress } from '../../services/wordpress';
import { Card } from '../../components';

export const Headings = () => {
	const { isSuccess, isLoading, isError, data, error } = useQuery(['headlings'], () => wordpress.getHeadlings());

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
				// <a key={headling.id} href={`?${getRandomInt(15)}/#/posts/${headling.id}`}>
				// 	{headling.name}
				// </a>
				<>[{headling.id}] Рубрики временно отключены :( <br /><br /></>
			)}
		</Card>
	);
};