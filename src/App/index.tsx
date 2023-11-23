import { useEffect, createContext, useState, Suspense, lazy, useContext } from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';

import { SiteSettingsContext } from '../contexts/SiteSettings';
import { Input } from '../components/Input';
import { useLogin } from '../pages/Login';
import { IProfile } from '../interfaces/IProfile';

const Header = lazy(() => import("../blocks/Header"));
const Catalog = lazy(() => import("../pages/Catalog"));
const Post = lazy(() => import("../pages/Post"));
const Page = lazy(() => import("../pages/Post"));
const WebhookPage = lazy(() => import("../pages/Webhook"));
const LsEditPage = lazy(() => import("../pages/LsEdit"));
const SetComponentProperty = lazy(() => import("../pages/LsEdit/SetComponentProperty"));
const WebhookFilesPage = lazy(() => import("../pages/WebhookFiles"));
const LoginPage = lazy(() => import("../pages/Login"));
const ProfilePage = lazy(() => import("../pages/Profile"));
const PostEditorPage = lazy(() => import("../pages/PostEditor"));

const setComponentProperty = (property: string, value: string) => {
	if (!localStorage.getItem(property)) localStorage.setItem(property, value);
}

export const ProfileContext = createContext({} as IProfile);

export const App = () => {
	const siteSettings = useContext(SiteSettingsContext);
	const [loaded, setLoaded] = useState(false);
	const { login, loginData } = useLogin();

	if (!loaded) {
		login('', '');
		setLoaded(true);
	}

	setComponentProperty('brand-theme', '2');

	if (localStorage.getItem('color-scheme') === 'dark') {
		document.documentElement.style.setProperty('--foreground-color', '#fff');
		document.documentElement.style.setProperty('--foreground-hover-color', '#ffffffaa');
		document.documentElement.style.setProperty('--background-color', '#292929');
		document.documentElement.style.setProperty('--secondary-background-hover-color', '#33333399');
		document.documentElement.style.setProperty('--secondary-background-color', '#333');
		document.documentElement.style.setProperty('--borders-color', '#444');
	}
	else {
		document.documentElement.style.setProperty('--background-color', '#fff');
		document.documentElement.style.setProperty('--background-hover-color', '#ffffff70');
		document.documentElement.style.setProperty('--foreground-color', '#333');
		document.documentElement.style.setProperty('--foreground-hover-color', '#333333cc');
		document.documentElement.style.setProperty('--secondary-background-color', '#f7f7f7');
		document.documentElement.style.setProperty('--borders-color', '#eee');
	}

	document.documentElement.style.setProperty('--accent-color', '#DC143C');
	document.documentElement.style.setProperty('--accent-color-hover', '#DC143C90');

	useEffect(() => {

		const onKeydown = (e: KeyboardEvent) => {
			if (e.code === 'F1') {
				e.preventDefault();
				document.documentElement.classList.toggle('_search-opened');
			}
		}

		document.addEventListener('keydown', onKeydown);

		return () => {
			document.removeEventListener('keydown', onKeydown);
		}
	}, []);

	if (siteSettings.title !== 'undefined')
		return (
			<>
				<form className="search" onSubmit={(e) => {
					e.preventDefault();
					location.hash = `#/${(document.querySelector('#command-input')! as HTMLInputElement).value}`;
					(document.querySelector('#command-input')! as HTMLInputElement).value = '';
					document.documentElement.classList.remove('_search-opened');
				}}>
					<Input id='command-input' placeholder='Введите команду' />
				</form>
				<Suspense fallback={<>Первая загрузка страницы может занимать дольше обычного...</>}>
					<ProfileContext.Provider value={loginData}>
						<Header />
						<HashRouter>
							<Routes>
								<Route path='/' Component={Catalog} />
								<Route path='/posts/:id' Component={Catalog} />
								<Route path='/post/:id' Component={Post} />
								<Route path='/p/:id' Component={Page} />
								<Route path='/send' Component={WebhookPage} />
								<Route path='/lsedit' Component={LsEditPage} />
								<Route path='/lsedit/:property/:value' Component={SetComponentProperty} />
								<Route path='/webhook-files' Component={WebhookFilesPage} />
								<Route path="/login/" Component={LoginPage} />
								<Route path="/profile/" Component={ProfilePage} />
								<Route path="/posteditor/" Component={PostEditorPage} />
								<Route path='/*' element={'едеотства'} />
							</Routes>
						</HashRouter>
					</ProfileContext.Provider>
				</Suspense>
			</>
		);
	else return <LsEditPage />
};