# Dynamic Portfolio (GitHub Pages)

A clean, single-page portfolio that **auto-loads your projects from the GitHub API**. Works entirely on GitHub Pages (no server).

## Quick Start

1. Rename this repository to `<your-username>.github.io` **or** create a new repo with that name and copy these files.
2. Edit `script.js` → set `GITHUB_USERNAME = "your-github-username"`.
3. (Optional) Open `repos.json` and list the repos you want to feature. If you delete `repos.json`, the site will show your top updated repositories automatically.
4. Commit & push. Enable GitHub Pages in **Settings → Pages** (main branch / root). Your site will be live at `https://<your-username>.github.io`.

## Customize

- `index.html`: About text, skills, certifications, contact email, CV link.
- `styles.css`: Colors and layout.
- `assets/CV.pdf`: Replace with your CV (optional).
- `repos.json`: Curate which repos appear.

## Notes

- Unauthenticated GitHub API calls are limited (approx. 60/hour per IP). That’s fine for small portfolios.
- Set `repo.homepage` in each repo (Settings → Pages or Edit) to show a **Demo** button.
- If a repo has **topics**, some may appear as chips on the card.

---

Made with ♥ for security portfolios.
