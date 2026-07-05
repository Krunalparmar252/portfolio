# Krunal Parmar - Portfolio

This is a modern, responsive portfolio website for a Computer Engineering student specializing in Machine Learning and Software Engineering.

## Features

- **Interactive Terminal:** A simulated developer shell to explore skills, projects, and academic background.
- **Project Gallery:** Showcase of engineered software projects with interactive filtering.
- **Dynamic Content:** Automatic copyright year and status indicators.
- **CI/CD Integrated:** Automated deployment via GitHub Actions.
- **Responsive Design:** Built with Tailwind CSS for a seamless experience across all devices.

## Technical Stack

- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+)
- **Icons:** FontAwesome 6
- **Deployment:** GitHub Pages
- **Automation:** GitHub Actions

## Deployment & CI/CD

This portfolio is configured with a CI/CD pipeline to automatically update whenever you push changes to the `main` branch.

### How to Enable GitHub Pages

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. Once you push to `main` (or manually trigger the "Deploy Portfolio Website" action), your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Manual Deployment

You can manually trigger a deployment by:
1. Navigating to the **Actions** tab in your GitHub repository.
2. Selecting the **Deploy Portfolio Website** workflow.
3. Clicking the **Run workflow** dropdown and selecting **Run workflow** (ensure the `main` branch is selected).

### Troubleshooting: "Branch is not allowed to deploy"
If you see an error stating that a branch is not allowed to deploy to `github-pages`:
1. Go to **Settings** > **Environments**.
2. Click on **github-pages**.
3. Under **Deployment branches**, ensure it is set to "All branches" or add your specific branch name.
4. **Recommended:** Simply merge your changes into the `main` branch, and the deployment will run automatically and successfully.

## Author

**Krunal Parmar**
- GitHub: [@Krunalparmar252](https://github.com/Krunalparmar252)
- LinkedIn: [Krunal Parmar](https://www.linkedin.com/in/krunal-parmar-7287682b5)
