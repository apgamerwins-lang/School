import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: "St. Mary's School, Jorhat | Academic Excellence in Assam",
  description:
    "Official institutional website of St. Mary's High School, Jamuguri, Rowriah, Jorhat, Assam. English-medium co-educational school managed by MSMHC and affiliated with SEBA.",
  keywords: [
    "St. Mary's School Jorhat",
    "St. Mary's High School Jorhat",
    "Rowriah School Jorhat",
    "SEBA English Medium School Jorhat",
    "Schools in Jorhat Assam",
    "MSMHC Schools Assam",
    "Admissions St Marys Jorhat",
  ],
  authors: [{ name: "St. Mary's School, Jorhat" }],
  openGraph: {
    title: "St. Mary's School, Jorhat | Academic Excellence in Assam",
    description:
      "Official institutional website of St. Mary's High School, Jamuguri, Rowriah, Jorhat, Assam. Managed by MSMHC and affiliated with SEBA.",
    url: process.env.APP_URL || 'https://stmarysjorhat.edu.in',
    siteName: "St. Mary's School, Jorhat",
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "St. Mary's School, Jorhat | Academic Excellence in Assam",
    description:
      "English-medium co-educational school managed by MSMHC and affiliated with SEBA. Jamuguri, Rowriah, Jorhat, Assam.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Schema.org structured data for Educational Organization / School
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'School',
    name: "St. Mary's High School, Jorhat",
    alternateName: "St. Mary's School, Jorhat",
    description:
      "English-medium co-educational high school in Rowriah, Jorhat, Assam, managed by the Congregation of Missionary Sisters of Mary Help of Christians (MSMHC) and affiliated with SEBA.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jamuguri, Rowriah',
      addressLocality: 'Jorhat',
      addressRegion: 'Assam',
      postalCode: '785004',
      addressCountry: 'IN',
    },
    telephone: '+91-81339-66530',
    email: 'stmarysjorhat@gmail.com',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '14:00',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#0F2030] selection:text-[#FAF8F5] dark:selection:bg-[#DCE8F2] dark:selection:text-[#0F2030]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
