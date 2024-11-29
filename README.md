# Cache plugin for rizom CMS

## Use

```ts
// src/config/rizom.config.ts
import { cache } from '@rizom/cache';

const config: Config = {
  //...config
  plugins: [cache({ enabled: true })]
};

export default config;
```

### Get and set cache
```ts
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
```

### Clear cache
In event handlers
```ts
import { type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
  const { rizom } = event.locals;

  await rizom.plugins.cache.clear()

  //...
};
```

### Routes
- GET/POST : `api/clear-cache'
