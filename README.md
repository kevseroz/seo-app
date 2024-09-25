# SEO App - Next.js Project

This is an SEO-focused project developed using Next.js, bootstrapped with create-next-app. The project utilizes Server-Side Rendering (SSR) to optimize for SEO, ensuring that search engines can easily crawl and index the pages. It also includes Responsive Design, Social Media Metatags, and Structured Data for enhanced SEO performance.

## Features

Server-Side Rendering (SSR) for better SEO performance
Responsive Design for mobile and desktop views
Social Media Metatags for enhanced sharing (Open Graph and Twitter Card)
Structured Data for rich results on search engines
SEO performance evaluation using Lighthouse

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# SEO Features
## Social Media Metatags
This project integrates Open Graph and Twitter (X) metatags to optimize how content is displayed when shared on social media. By including these tags, you can control the image, title, and description that appear when your pages are shared.

Test your Open Graph tags with the [Facebook Debugger](https://developers.facebook.com/tools/debug/?checkpoint_src=any).
Preview your Twitter Cards using the [Twitter Card Validator](https://cards-dev.x.com/validator?mx=2).

## Structured Data

Structured Data is used to provide search engines with better context about the content of your site. In this project, schema.org structured data is implemented to improve search engine visibility and increase the likelihood of generating rich results.

You can test the structured data implementation using the [Google Rich Results Test](https://search.google.com/test/rich-results).

## Lighthouse SEO Testing

Lighthouse is used to measure the performance, accessibility, and SEO of the project. Key metrics such as Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and First Input Delay (FID) are tested and optimized to improve SEO rankings.

To run Lighthouse, open Chrome DevTools, go to the Lighthouse tab, and run a test on your project to get detailed feedback.
