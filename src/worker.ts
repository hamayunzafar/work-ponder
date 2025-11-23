import type { ExecutionContext, Fetcher } from '@cloudflare/workers-types';

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    
    try {
      // Attempt to fetch the static asset
      const response = await env.ASSETS.fetch(request);
      
      // If the response is a 404, it might be a client-side route
      // Serve index.html instead (SPA fallback)
      if (response.status === 404 && !url.pathname.startsWith('/assets/')) {
        const indexUrl = new URL('/index.html', request.url);
        return await env.ASSETS.fetch(indexUrl);
      }
      
      return response;
    } catch (e) {
      return new Response('Internal Error', { status: 500 });
    }
  },
};
