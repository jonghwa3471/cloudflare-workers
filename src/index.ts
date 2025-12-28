// @ts-ignore
import home from './home.html';
import { makeBadge } from './utils';

function handleHome() {
	return new Response(home, {
		headers: {
			'Content-Type': 'text/html;charset=utf-8',
		},
	});
}

function handleNotFound() {
	return new Response(null, {
		status: 404,
	});
}

function handleBadRequest() {
	return new Response(null, {
		status: 400,
	});
}

async function handleVisit(searchParams: URLSearchParams, env: Env) {
	const page = searchParams.get('page');
	if (!page) {
		return handleBadRequest();
	}
	const kvPage = await env.view_counter.get(page);
	let value = 1;
	if (!kvPage) {
		await env.view_counter.put(page, String(value));
	} else {
		value = Number(kvPage) + 1;
		await env.view_counter.put(page, String(value));
	}
	return new Response(makeBadge(value), {
		headers: {
			'Content-Type': 'image/svg+xml;charset=utf-8',
		},
	});
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname, searchParams } = new URL(request.url);
		switch (pathname) {
			case '/':
				return handleHome();
			case '/visit':
				return handleVisit(searchParams, env);
			default:
				return handleNotFound();
		}
	},
} satisfies ExportedHandler<Env>;
