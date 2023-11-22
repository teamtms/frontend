// import styles from './index.module.scss';
import { ReactElement, lazy } from 'react';

const Title1 = lazy(() => import('../../components/Title1'));
import { Sidebar } from '../../blocks/Sidebar/index';


const Catalog = (): ReactElement => {
	// const params = useParams();

	// let getPosts: Function = () => WordpressService.getPosts();

	// if (Object.keys(params).length !== 0)
	// 	getPosts = () => WordpressService.getPostsByHeadingId(Number(params.id));

	// const { isLoading, isError, data } = useQuery(['posts'], () => WordpressService.getPosts());

	// if (isLoading) return <>Подождите...</>
	// if (isError) return <>Ошибка...</>

	return (
		<div className='container sidebar'>
			<Title1>
				Тут что-то не работает, поэтому главной временно нет
			</Title1>
			{/* <div className={styles.content}>
				<Title1 className={styles.title}>Все посты в рубрике {data?.data[0].title.rendered}</Title1>
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
			</div> */}
			<Sidebar />
		</div>
	);
};

export default Catalog;