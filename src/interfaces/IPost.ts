import { IPostFields } from "./IPostFields"

export interface IPost {
	id: number
	status: 'publish'
	link: string
	title: { rendered: string }
	content: { rendered: string }
	excerpt: { rendered: string }
	author: number
	featured_media?: number
	categories: number[]
	date: string,
	tags: number[]
	acf: IPostFields
}