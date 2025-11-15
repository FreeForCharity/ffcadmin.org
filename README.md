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
**Status:** In Development  
**URL:** Not yet deployed to a live domain

The site is currently under development and is not yet publicly accessible.

## Development Status
**Current Status:** ⚠️ **Not Fully Functional**

This site is still in active development. The following items are pending:
- [ ] All links are functional
- [ ] All CTAs are clear and operational
- [ ] Live domain name configured for deployment
- [ ] Full functionality testing completed

Once all links work, CTAs are clear and functional, and the site has a live domain name as its deployment target, this status will be updated to "Fully Functional."

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

## Commit Signing

This repository requires all commits to be signed with GPG signatures before merging into `main`. This is enforced through branch protection rules.

### For Contributors

If you're a repository maintainer or working with automated tools:
- See [GPG_SIGNING.md](./GPG_SIGNING.md) for detailed instructions on setting up commit signing
- Use the provided script: `./scripts/setup-gpg-signing.sh` to generate and configure GPG keys
- GitHub Actions workflows are configured to automatically sign commits when GPG keys are properly configured

### For Repository Admins

To enable automatic commit signing for GitHub Actions:
1. Run `./scripts/setup-gpg-signing.sh` to generate a GPG key
2. Add the public key to the GitHub account that will make commits
3. Add `GPG_PRIVATE_KEY` and optionally `GPG_PASSPHRASE` to repository secrets
4. The workflows will automatically sign commits from bots

See [GPG_SIGNING.md](./GPG_SIGNING.md) for alternative solutions and detailed configuration options.
