# CI/CD Setup Walkthrough

I have set up a CI/CD pipeline using GitHub Actions to automatically build, test, and deploy this portfolio.

## Changes

### 1. GitHub Actions Workflow

Created `.github/workflows/ci-cd.yml`. This workflow has two jobs:

- **Build**: Runs on every push and pull request. It installs dependencies, runs linting, and builds the project.
- **Deploy**: Runs only on pushes to the `main` branch. It takes the built artifacts and deploys them to GitHub Pages.

### 2. Vite Configuration

Updated `vite.config.js` to set the `base` path.

> [!IMPORTANT]
> I  have set the base path to `/portfolio/` as it is the name of the repository. If your repository name is different, you **MUST** update this value in `vite.config.js` or the site will show a blank page.

## Next Steps for You

1.  **Push these changes** to your GitHub repository.
2.  Go to your repository on GitHub.
3.  Navigate to **Settings > Pages**.
4.  Under **Build and deployment**, select **GitHub Actions** from the source dropdown.
5.  The workflow will run automatically on the next push to `main`.

## Verification

You can verify the setup by checking the **Actions** tab in your GitHub repository after pushing. You should see a workflow run named "CI/CD Pipeline".
