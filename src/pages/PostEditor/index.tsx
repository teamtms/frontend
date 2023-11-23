import styles from './index.module.scss';
import React from 'react';

const PostEditorPage = (): React.ReactElement => {
	return (
		<div className={`${styles.container} container`}>
			<input type="text" placeholder='Название статьи' className={styles.title1} />
			<textarea className={styles.content} name="content" id="content" placeholder='Начните писать статью'></textarea>
		</div>
	);
};

export default PostEditorPage;