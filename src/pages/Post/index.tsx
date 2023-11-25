import styles from './index.module.scss';
import React, { lazy } from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { wordpress } from '../../services/wordpress';

import { getRandomInt } from '../../functions/getRandomInt';
import { PostCard } from '../Catalog/PostCard/index';
import { Title2 } from '../../components/Body1/index';
const PostDisplay = lazy(() => import('./PostDisplay/PostDisplay.component'));;

const fetchImage = async (id: number) => {
	console.log('fetching image');
	const { data } = await wordpress.getMediaById(id);
	return data;
};
const fetchAuthor = async (id: number) => {
	const { data } = await wordpress.getUserById(id);
	return data;
};
const fetchCategory = async (id: number) => {
	const { data } = await wordpress.getHeadingById(id);
	return data;
};

const Post = (): React.ReactElement => {
	const params = useParams();

	const { isSuccess, isError, isLoading, data, error } = useQuery(['post'], () => wordpress.getPostById(Number(params.id)));

	const {
		isLoading: catalogIsLoading,
		isError: catalogIsError,
		error: catalogError,
		data: catalog,
		isSuccess: catalogIsSuccess,
	} = useQuery(['catalog'], () => wordpress.getPosts(), { refetchOnMount: true });


	const { data: authorData, isSuccess: authorIsSuccess } = useQuery([`author`], () => fetchAuthor(data?.data.author!), {
		enabled: !!data?.data.author // Запрос будет выполнен только после получения номера изображения
	});
	const { data: categoryData, isSuccess: categoryIsSuccess } = useQuery([`category`], () => fetchCategory(data?.data.categories[0]!), {
		enabled: !!data?.data.categories // Запрос будет выполнен только после получения номера изображения
	});
	const { data: imageData, isSuccess: imageIsSuccess } = useQuery([`image`], () => fetchImage(data?.data.featured_media!), {
		enabled: !!data?.data.featured_media, // Запрос будет выполнен только после получения номера изображения
		refetchInterval: 60000,
		refetchOnMount: true
	});

	if (isError || catalogIsError) {
		console.log(error);
		console.log(catalogError);
		return <>Ошибка. См. подробности в консоли</>
	}
	if (isLoading || catalogIsLoading) {
		return <>Подождите...</>
	}
	if (!isSuccess || !catalogIsSuccess || !authorIsSuccess || !categoryIsSuccess) {
		return <>Неизвестная ошибка</>
	}
	else {
		return (
			<>
				<PostDisplay appearance={data.data.acf.appearance}
					title={data?.data.title.rendered}
					content={data?.data.content.rendered}
					author={authorData!.name}
					date={`${data?.data.date.split('T')[0].split('-')[2]}.
								 ${data?.data.date.split('T')[0].split('-')[1]}.
								 ${data?.data.date.split('T')[0].split('-')[0]}`}
					id={data.data.id}
					category={categoryData!.name}
					categoryId={categoryData!.id}
					tags={data.data.acf.tags}
					image={imageIsSuccess ? imageData!.guid.rendered : '#'}
				/>
				<div className={styles.posts}>
					<div className={`container ${styles.postsContainer}`}>
						<Title2>Последние статьи</Title2>
						{catalog?.data.map((item, index) => <>
							{index < 3 ?
								<PostCard
									key={index}
									title={item.title.rendered}
									excerpt={item.excerpt.rendered}
									url={`?${getRandomInt(512)}/#/p/${item.id}`}
									image=''
									tags={item.acf.tags}
								/> : ''}
						</>)}
					</div>
				</div>
			</>
		);
	}
};

export default Post;