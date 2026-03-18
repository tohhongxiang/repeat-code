# Personal Tanstack Start Template

- Bun
- Tailwind V4
- Drizzle-ORM + PostgreSQL + Supabase
- Better-Auth
- ESLint, Prettier, Husky, Lint-Staged

# Setup

1. Install dependencies

```sh
bun install
```

2. Copy `.env.example` to `.env.local` and fill in the environment variables
3. Generate `drizzle` files and push to the database:

```sh
bun run db:generate
bun run db:push
```

4. To start locally:

```sh
bun run dev
```

4. Check `package.json` for additional commands to run

# Links

- [Implementing Dark Mode Toggle in Tanstack Start](https://nisabmohd.vercel.app/tanstack-dark)
- [Setting up Husky + Lint-staged](https://betterstack.com/community/guides/scaling-nodejs/husky-and-lint-staged/)
- https://better-auth.com/docs/installation
- https://better-auth.com/docs/integrations/tanstack
- https://orm.drizzle.team/docs/get-started/supabase-new
- [Better-Auth: Headless Authentication for Your TanStack Start App](https://www.youtube.com/watch?v=Atev8Nxpw7c)
