export interface IPage {
	id: number
	status: 'publish'
	link: string
	title: { rendered: string }
	content: { rendered: string }
}