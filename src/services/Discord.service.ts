import axios from 'axios';

export const sendMessage = (id: string, token: string, data: { username: string, content: string }) => {
	axios.post(`https://discord.com/api/webhooks/${id}/${token}`, {
		username: data.username,
		content: data.content
	})
}

export const discord = {
	sendSystemMessage: (username: string, content: string) => {
		sendMessage(
			'1175873934575554570',
			'ORJFlqPZmGoIMcAf4rGg7kJvlTJumqk4bo1kTd3l06hEFPqtZ6NiBPyNlrpcnup9gRl1',
			{ username: username, content: content }
		);
	}
}