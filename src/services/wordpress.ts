import axios from 'axios';

import { IPost } from '../interfaces/IPost';
import { IMedia } from '../interfaces/IMedia';
import { IHeading } from '../interfaces/IHeading';
import { ISettings } from '../interfaces/ISettings';
import { IUser } from '../interfaces/IUser';
import { IPage } from '../interfaces/IPage';
import { INavigation } from '../interfaces/INavigation';

const API = 'https://www.fb24m.ru/tms/wp-json/wp/v2';

export const WordpressService = {
	getPosts: () => axios.get<IPost[]>(`${API}/posts`),
	getHeadlings: () => axios.get<IHeading[]>(`${API}/categories`),
	getHeadingById: (id: number) => axios.get<IHeading>(`${API}/categories/${id}`),
	getPostById: (id: number) => axios.get<IPost>(`${API}/posts/${id}`),
	getPostsByHeadingId: (headingId: number) => axios.get<IPost>(`${API}/posts?categories=${headingId}`),
	getMediaById: (id: number) => axios.get<IMedia>(`${API}/media/${id}`),
	getUserById: (id: number) => axios.get<IUser>(`${API}/users/${id}`),
	getSettings: () => axios.get<ISettings>(`https://www.fb24m.ru/tms/wp-json`),
	getTags: () => axios.get<ISettings>(`${API}/tags`),
	getPages: () => axios.get<IPage[]>(`${API}/pages`),
	getPageById: (id: number) => axios.get<IPage>(`${API}/pages/${id}`),
	getNavigations: () => axios.get<INavigation[]>(`${API}/navigation`),
	getWebhookFiles: () => axios.get<IPost[]>(`${API}/webhook-files`),
} 