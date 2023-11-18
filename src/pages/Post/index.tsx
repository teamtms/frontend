import styles from './index.module.scss';
import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { WordpressService } from '../../services/wordpress';

import { getRandomInt } from '../../functions/getRandomInt';
import { Icon } from '../../components/Icon/index';
import { Breadcrumbs } from '../../components/Breadcrumbs/index';
import { PostCard } from '../Catalog/PostCard/index';
import { Title2 } from '../../components/Body1/index';

const fetchImage = async (id: number) => {
	const { data } = await WordpressService.getMediaById(id);
	return data;
};
const fetchAuthor = async (id: number) => {
	const { data } = await WordpressService.getUserById(id);
	return data;
};
const fetchCategory = async (id: number) => {
	const { data } = await WordpressService.getHeadingById(id);
	return data;
};

interface PostProps {
	appearance: '1' | '2' | '3' | '4'
	title: string
	content: string
	author: string
	date: string
	id: number
	category: string
	categoryId: number
	tags: string
	image: string
}

const PostDisplay = (props: PostProps): React.ReactElement => {
	return (
		<>
			{props.appearance === '1' ?
				<img src={props.image} className={`${styles.image} ${styles.noRound}`} alt="" />
				: ''}
			{props.appearance === '2' ? '' : ''}
			{props.appearance === '3' || props.appearance === '2' ?
				<div className={`container ${styles.imageContainer}`}>
					<img src={props.image} className={styles.image} alt="" />
				</div>
				: ''}
			<div className={`container 
				${props.appearance === '1' ? styles.upper : ''}  
				${props.appearance !== '2' ? styles.card : ''}
				${styles.container}`}>
				<Breadcrumbs items={[{ name: 'Главная', url: '/' }, { name: props.title, url: '#' }]} />
				<h1>{props.title}</h1>
				<div className={styles.info}>
					<div className={styles.infoBlock}>
						<Icon icon='person' />
						{props.author}
					</div>
					<div className={styles.infoBlock}>
						<Icon icon='calendar_month' />
						{props.date}
					</div>
					<div className={styles.infoBlock}>
						<Icon icon='push_pin' />
						<a className={styles.link} href={`?${getRandomInt(512)}/#/posts/${props.categoryId}`}>{props.category}</a>
					</div>
				</div>
				<div className={styles.article} dangerouslySetInnerHTML={{ __html: props.content }}></div>
				<div className={styles.infoBlock}><Icon icon='sell' /> {props.tags}</div>
			</div>
		</>
	)
}

export const Post = (): React.ReactElement => {
	const params = useParams();

	const { isSuccess, isError, isLoading, data, error } = useQuery(['post'], () => WordpressService.getPostById(Number(params.id)));

	const {
		isLoading: catalogIsLoading,
		isError: catalogIsError,
		error: catalogError,
		data: catalog,
		isSuccess: catalogIsSuccess,
	} = useQuery(['catalog'], () => WordpressService.getPosts());

	const { data: imageData, isSuccess: imageIsSuccess } = useQuery([`image`], () => fetchImage(data?.data.featured_media!), {
		enabled: !!data?.data.featured_media // Запрос будет выполнен только после получения номера изображения
	});
	const { data: authorData, isSuccess: authorIsSuccess } = useQuery([`author`], () => fetchAuthor(data?.data.author!), {
		enabled: !!data?.data.author // Запрос будет выполнен только после получения номера изображения
	});
	const { data: categoryData, isSuccess: categoryIsSuccess } = useQuery([`category`], () => fetchCategory(data?.data.categories[0]!), {
		enabled: !!data?.data.categories // Запрос будет выполнен только после получения номера изображения
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
				<div className={`container ${styles.posts}`}>
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
			</>
		);
	}
};