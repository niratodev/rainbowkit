/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { text } from 'css/text.css';
import { vars } from 'css/vars.css';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { docsRoutes } from '../lib/docsRoutes';
import { Wrapper } from './Wrapper/Wrapper';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <div
        style={{
          position: 'fixed',
          width: 250,
          left: 'calc(50% - 512px)',
          top: 120,
          bottom: 0,
        }}
      >
        <div style={{ marginTop: 24 }}>
          {docsRoutes.map(route => (
            <div key={route.label} style={{ marginBottom: 24 }}>
              <h3 className={text[4]} style={{ marginBottom: 12 }}>
                {route.label}
              </h3>
              {route.pages.map(page => (
                <Link key={page.title} slug={page.slug}>
                  {page.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingLeft: 250, paddingTop: 60, paddingBottom: 80 }}>
        <div style={{ padding: '0 24px' }}>{children}</div>
      </div>
    </Wrapper>
  );
}

function Link({ children, slug }) {
  const router = useRouter();

  return (
    <NextLink passHref href={`/docs/${slug}`}>
      <a
        className={text[4]}
        style={{
          textDecoration: 'none',
          display: 'block',
          padding: '8px 15px',
          borderRadius: 12,
          fontWeight: 600,

          ...(router.query.slug === slug
            ? {
                background: vars.colors.fill,
              }
            : {}),
        }}
      >
        {children}
      </a>
    </NextLink>
  );
}
