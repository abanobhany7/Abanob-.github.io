/* Dynamic GitHub portfolio loader
 * 1) Set GITHUB_USERNAME
 * 2) (Optional) curate repos in repos.json -> { "repos": ["user/repo1", "user/repo2"] }
 * If repos.json exists, it will be used. Otherwise, top updated repos will be shown.
 */
const GITHUB_USERNAME = "your-github-username"; // <-- CHANGE THIS
const MAX_REPOS = 6;

const ghLink = document.getElementById("ghLink");
const liLink = document.getElementById("liLink");
const cvLink = document.getElementById("cvLink");
const emailLink = document.getElementById("emailLink");
const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
document.getElementById("year").textContent = new Date().getFullYear();

// Basic profile wiring
avatar.src = `https://github.com/${GITHUB_USERNAME}.png`;
ghLink.href = `https://github.com/${GITHUB_USERNAME}`;
ghLink.textContent = "GitHub";
liLink.href = "https://www.linkedin.com/"; // set your LinkedIn profile URL
liLink.textContent = "LinkedIn";
cvLink.href = "assets/CV.pdf"; // replace with your CV filename if you add one
emailLink.href = "mailto:you@example.com";

async function getCuratedRepoList() {
  try {
    const res = await fetch("repos.json", { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()).repos || null;
  } catch {
    return null;
  }
}

async function fetchRepo(fullName) {
  const res = await fetch(`https://api.github.com/repos/${fullName}`, {
    headers: {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
  if (!res.ok) return null;
  return await res.json();
}

async function getTopReposByUpdate() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
    headers: {
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
  if (!res.ok) throw new Error("Failed to load repos");
  let repos = await res.json();
  // Filter out forks/archived
  repos = repos.filter(r => !r.fork && !r.archived);
  // Prefer those with homepage set or stars, then by updated_at
  repos.sort((a, b) => {
    const aScore = (a.homepage ? 10 : 0) + a.stargazers_count;
    const bScore = (b.homepage ? 10 : 0) + b.stargazers_count;
    if (bScore !== aScore) return bScore - aScore;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
  return repos.slice(0, MAX_REPOS);
}

function repoCard(repo) {
  const homepage = repo.homepage && repo.homepage.trim().length ? repo.homepage : null;
  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0,5) : [];
  return `
    <article class="card">
      <h3>${repo.name}</h3>
      <p>${repo.description || "No description provided."}</p>
      <div class="meta">
        ${repo.language ? `Language: ${repo.language} • ` : ""}★ ${repo.stargazers_count} • Updated ${new Date(repo.updated_at).toLocaleDateString()}
      </div>
      ${topics.length ? `<div class="chips">${topics.map(t => `<span class="chip">${t}</span>`).join("")}</div>` : ""}
      <div class="actions">
        <a href="${repo.html_url}" target="_blank" rel="noopener">Code</a>
        ${homepage ? `<a href="${homepage}" target="_blank" rel="noopener">Demo</a>` : ""}
      </div>
    </article>
  `;
}

async function renderProjects() {
  const grid = document.getElementById("projects-grid");
  const note = document.getElementById("projects-note");
  grid.innerHTML = "<p class='note'>Loading projects…</p>";
  try {
    const curated = await getCuratedRepoList();
    let repos = [];
    if (curated && curated.length) {
      const results = await Promise.all(curated.map(fetchRepo));
      repos = results.filter(Boolean).slice(0, MAX_REPOS);
      note.innerHTML = "Showing curated projects from <code>repos.json</code>.";
    } else {
      repos = await getTopReposByUpdate();
      note.innerHTML = "Tip: Add a <code>repos.json</code> to curate exactly which repos to show.";
    }
    grid.innerHTML = repos.map(repoCard).join("");
  } catch (e) {
    grid.innerHTML = "<p class='note'>Could not load projects from GitHub. Try refreshing later.</p>";
    console.error(e);
  }
}

renderProjects();
