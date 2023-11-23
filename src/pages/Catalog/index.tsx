import styles from './index.module.scss';
import { ReactElement, lazy } from 'react';

const Title1 = lazy(() => import('../../components/Title1'));
import { Sidebar } from '../../blocks/Sidebar';
import { IPost } from '../../interfaces/IPost';
import { PostCard } from './PostCard';
import { useQuery } from '@tanstack/react-query';
import { wordpress } from '../../services/wordpress';


const Catalog = (): ReactElement => {
	// const params = useParams();

	// let getPosts: Function = () => wordpress.getPosts();

	// if (Object.keys(params).length !== 0)
	// 	getPosts = () => wordpress.getPostsByHeadingId(Number(params.id));

	const { isLoading, isError, data } = useQuery(['posts'], () => wordpress.getPosts());

	if (isLoading) return <>Подождите...</>
	if (isError) return <>Ошибка...</>

	return (
		<div className='container sidebar'>
			<div className={styles.content}>
				<Title1 className={styles.title}>Все посты в рубрике {data?.data[0].title.rendered}</Title1>
				<div className={styles.posts}>
					{data ? data.data.map((post: IPost) =>
						<PostCard
							key={post.id}
							url={`#/post/${post.id}`}
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

export default Catalog;