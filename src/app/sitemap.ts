import { MetadataRoute } from 'next';
import destinationsData from '@data/destinations.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://istanora.com';
  const locales = ['ar', 'en', 'tr'];

  const pages = ['', '/contact'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Home and static pages for each locale
  for (const locale of locales) {
    for (const page of pages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }

    // Destination landing pages
    for (const dest of destinationsData) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/${dest.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    }
  }

  return sitemapEntries;
}
