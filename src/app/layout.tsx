import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CSV Converter – Tool to convert row base data into CSV format',
  description:
    'Convert, merge, and transform your row data into CSV files online with ease. Free and privacy-friendly. No sign-up required.',
  keywords: [
    'CSV converter',
    'convert CSV online',
    'row to CSV',
    'CSV editor',
    'data transformation tool',
  ],
  openGraph: {
    title: 'CSV Converter – Tool to convert row base data into CSV format',
    description:
      'Convert, merge, and transform your row data into CSV files online with ease. Free and privacy-friendly. No sign-up required',
    url: 'https://hyhilman.web.id/csv-converter',
    siteName: 'CSV Converter',
    images: [
      {
        url: 'https://hyhilman.web.id/csv-converter/logo.png', // create or upload this image
        width: 1200,
        height: 630,
        alt: 'CSV Converter Web App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSV Converter – Tool to convert row base data into CSV format',
    description:
      'Convert, merge, and transform your row data into CSV files online with ease. Free and privacy-friendly. No sign-up required',
    images: ['https://hyhilman.web.id/csv-converter/logo.png'],
    creator: '@hyhilman', // optional
  },
  alternates: {
    canonical: 'https://hyhilman.web.id/csv-converter',
  },
};
