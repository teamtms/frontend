import styles from './index.module.scss';

import { Card, Icon } from "../../../components";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { PostDisplayProps } from './PostDisplay.props';

const PostDisplay = (props: PostDisplayProps): React.ReactElement => {
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
			<Card className={`container 
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
						<a className={styles.link} href={`#/posts/${props.categoryId}`}>{props.category}</a>
					</div>
				</div>
				<div className={styles.article} dangerouslySetInnerHTML={{ __html: props.content }}></div>
				<div className={styles.infoBlock}><Icon icon='sell' /> {props.tags}</div>
			</Card>
		</>
	)
}

export default PostDisplay;