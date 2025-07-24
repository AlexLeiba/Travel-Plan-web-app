export async function GET() {
  const baseUrl = 'https://localhost:3000';

  const allRoutes = ['/'];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
         <priority>1.0</priority>
         <changefreq>monthly</changefreq>
      </url>
    `
      )
      .join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
