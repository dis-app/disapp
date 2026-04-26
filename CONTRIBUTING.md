# Contributing Guide

Thank you for your interest in contributing to Disapp!

## Development Environment

### Requirements

- Node.js 20+
- pnpm 9+
- Git

### Setup

```bash
git clone https://github.com/dis-app/disapp.git
cd disapp
pnpm install
```

### Project Structure

```
disapp/
├── apps/
│   └── web/              # Documentation website (Next.js)
├── packages/
│   ├── core/             # Core framework library
│   ├── create-disapp/    # CLI tool
│   └── config/           # Shared configs
└── examples/
    └── basic-bot/        # Example Discord bot
```

## Development

### Core Package

```bash
pnpm --filter @disapp/core dev
```

### Documentation Website

```bash
pnpm --filter web dev
```

### Example Bot

```bash
pnpm --filter basic-bot dev
```

### Build All Packages

```bash
pnpm build
```

### Run Tests

```bash
pnpm --filter @disapp/core test
```

## Code Standards

- Use TypeScript
- Follow ESLint rules
- Use meaningful variable names
- Run lint before committing

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Commit Messages

Use Conventional Commits format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Other changes

## Testing

### Run All Tests

```bash
pnpm --filter @disapp/core test
```

### Run Specific Test

```bash
pnpm --filter @disapp/core test -- YourTest.test.ts
```

### Database Tests

Database tests require a PostgreSQL database. Set `DATABASE_URL` in `packages/core/.env`:

```bash
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Questions

If you have questions, ask in GitHub Discussions or join our Discord server.
