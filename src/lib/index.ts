import { json, type RequestHandler } from '@sveltejs/kit';
import { Cache } from './cache.server.js';
import type { Plugin } from 'rizom';

const clearCache = (): ReturnType<RequestHandler> => {
	Cache.clear();
	return json({ message: 'Cache cleared' });
};

type CacheArgs = { enabled: boolean };

export const cache: Plugin<CacheArgs> = ({ enabled }) => {
	async function getAction<T>(name: string, get: () => Promise<T>): Promise<T> {
		if (enabled) {
			const result = await Cache.get<T>(name, get);
			return result;
		}
		return await get();
	}

	return {
		name: 'cache',

		routes: {
			'/api/clear-cache': {
				POST: clearCache,
				GET: clearCache
			}
		},

		actions: {
			get: getAction,
			clear: clearCache
		}
	};
};

declare module 'rizom' {
	interface Register {
		Plugins: {
			cache: {
				get: <T>(name: string, get: () => Promise<T>) => Promise<T>;
				clear: typeof clearCache;
			};
		};
	}
}
