<div align="center">
  <h1>Disapp Documentation Website</h1>
  <p><strong>Modern documentation site built with Next.js 16.2.4 and Tailwind CSS 4.2.4</strong></p>
  
  [![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)
  [![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black.svg)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.4-38bdf8.svg)](https://tailwindcss.com/)
</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Design
- **Modern UI** - Glass morphism design
- **Dark Mode** - Automatic theme switching
- **Responsive** - Mobile-first approach
- **Animations** - Framer Motion
- **Icons** - Lucide React

</td>
<td width="50%">

### 🚀 Technical
- **Next.js 16.2.4** - App Router
- **Tailwind CSS 4.2.4** - Utility-first CSS
- **MDX** - Markdown with JSX
- **TypeScript** - Type safety
- **Fast** - Optimized performance

</td>
</tr>
</table>

## 📦 Installation

From the **root directory** of the monorepo:

```bash
pnpm install
```

## 🚀 Development

Start the development server:

```bash
pnpm dev
```

Or from the root directory:

```bash
pnpm --filter web dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Building

Build for production:

```bash
pnpm build
```

Or from the root directory:

```bash
pnpm --filter web build
```

## 📁 Project Structure

```
apps/web/
├── app/                        # Next.js App Router
│   ├── docs/                  # Documentation pages
│   │   ├── commands/
│   │   ├── database/
│   │   ├── events/
│   │   ├── fluent-api/
│   │   ├── getting-started/
│   │   ├── hot-reload/
│   │   ├── i18n/
│   │   ├── installation/
│   │   ├── leaderboard/
│   │   ├── quick-start/
│   │   └── layout.tsx
│   ├── privacy/               # Privacy policy page
│   ├── roadmap/               # Roadmap page
│   ├── terms/                 # Terms of service page
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # Landing page
├── components/                # React components
│   ├── landing/              # Landing page components
│   │   ├── CodeComparison.tsx
│   │   ├── CTA.tsx
│   │   ├── Features.tsx
│   │   └── Hero.tsx
│   ├── ui/                   # UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── CodeBlock.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── MDXComponents.tsx
│   ├── Navigation.tsx
│   ├── Sidebar.tsx
│   ├── ThemeProvider.tsx
│   └── ThemeToggle.tsx
├── lib/                      # Utilities
│   └── utils.ts
├── public/                   # Static assets
│   └── disapp.svg
├── .gitignore
├── eslint.config.mjs
├── mdx-components.tsx
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## 🎨 Styling

### Tailwind CSS

The site uses Tailwind CSS 4.2.4 with custom configuration:

- **Glass Morphism** - Backdrop blur effects
- **Custom Colors** - Brand color palette
- **Dark Mode** - Class-based dark mode
- **Animations** - Custom transitions

### Fonts

- **Syne** - Display font for headings
- **Inter** - Body font for text

## 📝 Adding Documentation

### Create MDX Page

1. Create a new folder in `app/docs/`
2. Add a `page.mdx` file
3. Write content using MDX

Example:

```mdx
# My New Page

This is a documentation page with **markdown** and React components.

<CodeBlock language="typescript">
const example = "Hello World";
</CodeBlock>
```

### MDX Components

Available components in MDX:

- `<CodeBlock>` - Syntax highlighted code
- `<Callout>` - Info/warning boxes
- All standard markdown elements

## 🎯 Pages

### Landing Page (`/`)

- Hero section with value proposition
- Code comparison showcase
- Features grid
- Call-to-action

### Documentation (`/docs`)

- Sidebar navigation
- MDX content rendering
- Table of contents
- Search functionality

### Roadmap (`/roadmap`)

- Version timeline
- Milestone tracking
- Status indicators
- Progress visualization

### Legal Pages

- `/privacy` - Privacy policy
- `/terms` - Terms of service (GPL-3.0)

## 🚀 Deployment

### Vercel (Recommended)

This is a monorepo project. Follow these steps to deploy on Vercel:

#### 1. Import Repository
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click "Add New Project"
- Import your GitHub repository

#### 2. Configure Project Settings

**Framework Preset**: Next.js

**Root Directory**: `apps/web`

**Build & Development Settings**:

| Setting | Value |
|---------|-------|
| **Install Command** | `cd ../.. && pnpm install --frozen-lockfile` |
| **Build Command** | `cd ../.. && pnpm --filter web build` |
| **Output Directory** | `.next` |
| **Development Command** | `cd ../.. && pnpm --filter web dev` |

**Node.js Version**: 20.x or 22.x (latest LTS)

#### 3. Ignored Build Step (Optional)

To prevent unnecessary builds when changes occur outside `apps/web`:

**Custom Ignore Command**:
```bash
git diff HEAD^ HEAD --quiet apps/web/
```

This ensures builds only trigger when files in `apps/web/` change.

#### 4. Deploy

Click "Deploy" and Vercel will build and deploy your site.

#### Quick Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dis-app/disapp)

**Note**: After clicking the button, you must manually configure the Root Directory and Build Commands as described above.

For detailed deployment instructions, see [BUILD.md](./BUILD.md).

### Other Platforms

The site can be deployed to any platform that supports Next.js:

- **Netlify** - Configure build command: `cd ../.. && pnpm install && pnpm --filter web build`
- **Railway** - Set root directory and build command
- **Self-hosted** - Build with `pnpm build` and run with `pnpm start`

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize colors:

```css
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
}
```

### Components

All components are in `components/` and can be customized:

- `Navigation.tsx` - Top navigation bar
- `Footer.tsx` - Footer with links
- `Sidebar.tsx` - Documentation sidebar
- `ThemeToggle.tsx` - Dark mode toggle

## 📚 Learn More

### Next.js Resources
- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🎓 [Learn Next.js](https://nextjs.org/learn)
- 💬 [Next.js Discord](https://discord.gg/nextjs)

### Tailwind CSS Resources
- 📖 [Tailwind Documentation](https://tailwindcss.com/docs)
- 🎨 [Tailwind UI](https://tailwindui.com/)
- 🎓 [Tailwind Labs](https://tailwindlabs.com/)

### MDX Resources
- 📖 [MDX Documentation](https://mdxjs.com/)
- 🎓 [MDX Guide](https://mdxjs.com/docs/)

## 🤝 Contributing

Contributions to improve the documentation site are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## 📄 License

This documentation site is part of the Disapp framework and is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

See [LICENSE](../../LICENSE) for full license text.

---

<div align="center">
  <strong>Part of the Disapp Framework</strong>
  <br><br>
  <a href="https://github.com/dis-app/disapp">⭐ Star us on GitHub</a>
</div>
