import React from 'react';

type SchemaType = 'Organization' | 'LocalBusiness' | 'FAQPage' | 'Article' | 'WebSite' | 'BreadcrumbList';

interface StructuredDataProps {
  type: SchemaType;
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
