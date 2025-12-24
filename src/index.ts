// @ts-ignore
import home from './home.html';

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname === '/') {
			return new Response(home, {
				headers: {
					'Content-Type': 'text/html;charset=utf-8',
				},
			});
		}
		return new Response(null, {
			status: 404,
		});
	},
} satisfies ExportedHandler<Env>;
