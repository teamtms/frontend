// import styles from './index.module.scss';
import React from 'react';
import { useParams } from 'react-router-dom';

const SetComponentProperty = (): React.ReactElement => {
	const params = useParams();

	localStorage.setItem(params.property!, params.value!);
	location.href = '#/';
	location.reload();

	return (
		<div className="container">ok</div>
	);
};

export default SetComponentProperty;