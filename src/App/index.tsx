import React from 'react';

import { Header } from '../blocks/Header';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Catalog } from '../pages/Catalog';
import { Post } from '../pages/Post';
import { Page } from '../pages/Page';
import { useContext } from 'react';
import { SiteSettingsContext } from '../contexts/SiteSettings';
import { Title1 } from '../components';

export const App = (): React.ReactElement => {
	const siteSettings = useContext(SiteSettingsContext);

	if (siteSettings.title !== 'undefined')
		return (
			<>
				<Header />
				<HashRouter>
					<Routes>
						<Route path='/' Component={Catalog} />
						<Route path='/posts/:id' Component={Catalog} />
						<Route path='/post/:id' Component={Post} />
						<Route path='/p/:id' Component={Page} />
					</Routes>
				</HashRouter>
			</>
		);
	else return <div className="container" style={{ padding: '16px 0' }} ><Title1>[503] Сайт закрыт на техническое обслуживание</Title1></div>
};