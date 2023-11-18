import styles from './index.module.scss';
import { ReactElement } from 'react';

import { useQuery } from '@tanstack/react-query';

import { WordpressService } from '../../services/wordpress';
import { PostCard } from './PostCard';

import { useParams } from 'react-router-dom';

import { Title1 } from '../../components';
import { Sidebar } from '../../blocks/Sidebar/index';
import { IPost } from '../../interfaces/IPost';
import { getRandomInt } from '../../functions/getRandomInt';


export const Catalog = (): ReactElement => {
	const params = useParams();

	let getPosts: Function = () => WordpressService.getPosts();

	if (Object.keys(params).length !== 0)
		getPosts = () => WordpressService.getPostsByHeadingId(Number(params.id));

	const {
		isLoading,
		isError,
		data,
	} = useQuery(['posts'], () => getPosts());

	const { data: headingData } = useQuery(['heading'], () => WordpressService.getHeadingById(Number(params.id)),
		{
			retry: 0
		});

	if (isLoading) return <>Подождите...</>
	if (isError) return <>Ошибка...</>

	return (
		<div className='container sidebar'>
			<div className={styles.content}>
				<Title1 className={styles.title}>{isNaN(Number(params.id)) ? <>Все посты</> : <>Все посты в рубрике {headingData?.data.name}</>}</Title1>
				<div className={styles.posts}>
					{data ? data.data.map((post: IPost) =>
						<PostCard
							key={post.id}
							url={`?${getRandomInt(512)}/#/post/${post.id}`}
							title={post.title.rendered}
							image={''}
							excerpt={post.excerpt.rendered}
							tags={post.acf.tags}
						/>) : ''}
				</div>
			</div>
			<Sidebar />
		</div>
	);
};