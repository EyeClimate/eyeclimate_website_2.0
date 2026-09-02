# Eyeclimate Website

The public website and content-management portal for **Eyeclimate**, an Earth-observation company building decision-ready intelligence for methane emissions, wildlife monitoring, and environmental research.

The application is built with Next.js and Supabase. It includes the public marketing site, an interactive methane-emissions globe, a database-driven newsroom and publications area, authentication, profile management, and a protected editorial portal.

## Features

- Responsive public marketing website
- Interactive WebGL methane-emissions globe powered by `globe.gl`
- Database-driven articles, featured stories, newsroom filters, and publications
- Protected portal for creating, editing, publishing, archiving, and deleting content
- Email/password authentication and password updates through Supabase Auth
- Author profiles and article attribution
- Contact submissions with optional Google Forms, Supabase, and Slack delivery
- Dynamic sitemap, robots metadata, canonical URLs, Open Graph images, and structured data
- Optimized local images and long-lived browser caching for static assets

## Technology

- [Next.js 16](https://nextjs.org/) with the App Router and Turbopack
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) for authentication and PostgreSQL data
- [`globe.gl`](https://globe.gl/) and `d3-dsv` for the interactive emissions globe
- `react-markdown` and `remark-gfm` for article rendering

## Requirements

- Node.js 20 or later
- npm
- A Supabase project
- A Vercel account for the recommended production deployment


## License

This is a private Eyeclimate project. No license is granted for external use, redistribution, or modification unless explicitly authorized by Eyeclimate.
