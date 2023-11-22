// import styles from './index.module.scss';
import { lazy } from 'react';
const Title1 = lazy(() => import('../../components/Title1'));

const queryParams: any = {};

if (location.search.split('?')[1]) {
	location.search.split('?')[1].split('&').forEach((variable) => {
		queryParams[variable.split('=')[0]] = variable.split('=')[1];
	});
}

const LsEditPage = () => {
	return (
		<div className="container">
			<Title1>Редактор компонентов</Title1>
			<div className="components">
				<table>
					<tbody>
						<tr>
							<td>#</td>
							<td>ключ</td>
							<td>значение</td>
						</tr>
						{Object.keys(localStorage).map((item, index) =>
							<tr>
								<td>{index}</td>
								<td>{item}</td>
								<td>{localStorage.getItem(item)}</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			<form onSubmit={(e) => {
				e.preventDefault();
				localStorage.setItem((document.querySelector('#component-name') as HTMLInputElement)!.value, (document.querySelector('#component-value') as HTMLInputElement)!.value);
			}}>
			</form>
		</div>
	);
};

export default LsEditPage;