# FFC Admin Webpage

## Organization
**Free For Charity (FFC)** - A charitable organization

## Purpose
This repository contains the administrative webpage for Free For Charity. The site serves as a central hub for FFC administrative functions and information.

### Main Calls to Action (CTAs)
- Access administrative dashboard
- View organizational information
- Manage charity operations

## Deployment
**Status:** ✅ Deployed to GitHub Pages  
**URL:** https://freeforcharity.github.io/ffcadmin.org/

The site is deployed and accessible via GitHub Pages. The site is fully responsive and works on mobile, tablet, and desktop devices.

## Responsive Design
**Status:** ✅ **Fully Responsive**

The site is optimized for all device sizes:
- ✅ Mobile phones (< 768px): Hamburger menu navigation
- ✅ Tablets (768px - 1024px): Full navigation, 2-column layout
- ✅ Desktops (> 1024px): Full navigation, 3-column layout

### Troubleshooting
If the site appears unstyled or shows desktop navigation on mobile:

**Important:** Incognito/private browsing mode does NOT fix responsive design issues. If you see desktop navigation on mobile even in incognito mode, the CSS file may not be loading correctly from GitHub Pages.

#### Clear Cache for This Site Only

**Desktop - Chrome/Edge:**
1. Open DevTools: `F12` or `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
2. Right-click the refresh button → "Empty Cache and Hard Reload"
3. Or: Go to `chrome://settings/siteData` → Search for "freeforcharity.github.io" → Remove

**Desktop - Safari:**
1. `Cmd+Option+E` (Develop menu must be enabled in Preferences)
2. Or: Safari menu → Clear History → Select "the last hour" → Clear History

**Desktop - Firefox:**
1. `Ctrl+Shift+Delete` (Windows) / `Cmd+Shift+Delete` (Mac)
2. Time range: "Last Hour" → Select only "Cache" → Clear Now

**iPhone/iPad - Safari:**
1. Settings → Safari → Advanced → Website Data
2. Search for "freeforcharity.github.io" → Swipe left → Delete
3. Or: Settings → Safari → Clear History and Website Data (clears all sites)

**Android - Chrome:**
1. Chrome menu (⋮) → Settings → Privacy and security → Site settings
2. Search for "freeforcharity.github.io" → Clear & reset
3. Or: Chrome menu → History → Clear browsing data → "Last hour" → Cached images and files

**Android - Samsung Internet:**
1. Menu → Settings → Privacy and security → Delete browsing data
2. Select "Last hour" → Check only "Cache" → Delete

See [RESPONSIVE_DESIGN.md](./RESPONSIVE_DESIGN.md) for detailed troubleshooting

### Testing Results
For detailed responsive design testing results, see [RESPONSIVE_TESTING_RESULTS.md](./RESPONSIVE_TESTING_RESULTS.md)

## Testing

This project includes comprehensive tests for the CI/CD pipeline and build output.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Test Coverage

The test suite covers:
- Build output validation (files and directory structure)
- GitHub Pages configuration (`.nojekyll`, Next.js config)
- SEO metadata (robots.txt, sitemap.xml)
- Static route generation (home page, tech stack page)
- Configuration validation (package.json, lock files)

For detailed test case documentation, see [TEST_CASES.md](./TEST_CASES.md).
