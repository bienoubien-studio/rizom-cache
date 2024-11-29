import { type ServerLoadEvent } from '@sveltejs/kit';
import type { PagesDoc } from '../app.generated.js';

export const load = async (event: ServerLoadEvent) => {
	const { api, rizom } = event.locals;

	const docs = await rizom.plugins.cache.get(
		'pages',
		api.collection('pages').findAll<PagesDoc>
	);

	return { docs };
};
