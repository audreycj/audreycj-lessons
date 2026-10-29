// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  build: { inlineStylesheets: 'always' },
  // Stacks and queues became two lessons (chat 17); old links forward to Stacks.
  redirects: { '/itc120/stacks-queues': '/itc120/stacks' },
});
