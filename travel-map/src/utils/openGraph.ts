import og from 'open-graph-scraper';

export interface OpenGraphResult {
  resolvedUrl: string;
  title: string;
  description: string;
  image: string;
}

/**
 * Get image URL from ogImage result
 * Uses type assertion to handle the complex types from open-graph-scraper
 */
function getImageUrl(ogImage: unknown): string {
  if (!ogImage) return '';

  if (Array.isArray(ogImage)) {
    const first = ogImage[0] as Record<string, unknown> | undefined;
    return (first?.url as string) || '';
  }

  // For object type, use type assertion to access url property
  const imgObj = ogImage as Record<string, unknown>;
  return (imgObj.url as string) || String(ogImage);
}

/**
 * Fetches Open Graph metadata from a URL.
 * Automatically resolves short Google Maps links to full URLs.
 *
 * @param url - The URL to scrape (supports short Google Maps links)
 * @returns OpenGraphResult with resolved URL and metadata
 */
export async function scrapeOpenGraph(url: string): Promise<OpenGraphResult | null> {
  if (!url || url.trim() === '') {
    return null;
  }

  try {
    const result = await og({ url });

    if (result.result) {
      const { ogTitle, ogDescription, ogImage, requestUrl } = result.result;

      return {
        resolvedUrl: requestUrl || url,
        title: ogTitle || '',
        description: ogDescription || '',
        image: getImageUrl(ogImage),
      };
    }

    return null;
  } catch (error) {
    console.error('Error scraping Open Graph data:', error);
    return null;
  }
}

/**
 * Scrapes multiple URLs in parallel.
 *
 * @param urls - Array of URLs to scrape
 * @returns Map of original URL to OpenGraphResult
 */
export async function scrapeMultipleUrls(urls: string[]): Promise<Map<string, OpenGraphResult>> {
  const results = new Map<string, OpenGraphResult>();

  // Scrape all URLs in parallel
  const promises = urls.map(async (url) => {
    const result = await scrapeOpenGraph(url);
    if (result) {
      results.set(url, result);
    }
  });

  await Promise.all(promises);

  return results;
}