import { sequence } from '@sveltejs/kit/hooks';
import { handlers } from 'rizom';
import { rizom } from 'rizom';

const init = async () => {
	await rizom.init();
};

init();

export const handle = sequence(...handlers);
