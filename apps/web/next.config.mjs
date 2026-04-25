import createMDX from '@next/mdx';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    return config;
  }
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
