import './style.css';

// Cookie functions
function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

class LatestUpdates extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: Arial, sans-serif;
                    border: 1px solid #ccc;
                    padding: 16px;
                    border-radius: 8px;
                    margin-top: 20px;
                    background-color: var(--app-bg-color);
                    color: var(--text-color);
                }
                h2 {
                    color: var(--h1-color);
                    margin-top: 0;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                    border-bottom: 1px solid var(--text-color);
                    padding-bottom: 10px;
                }
                li:last-child {
                    border-bottom: none;
                }
                .update-title {
                    font-weight: bold;
                    color: #61afef; /* A distinct color for titles */
                }
                .update-date {
                    font-size: 0.9em;
                    color: var(--text-color);
                }
                a {
                    color: #61afef;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <h2>Latest Software Updates</h2>
            <ul id="commit-list">
                <li>Loading updates...</li>
            </ul>
        `;
        this.fetchLatestCommits();
    }

    async fetchLatestCommits() {
        const org = 'wallach-game-studio';
        const reposUrl = `https://api.github.com/orgs/${org}/repos`;
        let allCommits: any[] = [];

        try {
            // Fetch all repositories for the organization
            const reposResponse = await fetch(reposUrl);
            const repos = await reposResponse.json();

            // For each repository, fetch its commits
            for (const repo of repos) {
                const commitsUrl = `https://api.github.com/repos/${org}/${repo.name}/commits?per_page=10`;
                const commitsResponse = await fetch(commitsUrl);
                const commits = await commitsResponse.json();
                allCommits = allCommits.concat(commits.map((commit: any) => ({
                    repo: repo.name,
                    message: commit.commit.message,
                    author: commit.commit.author.name,
                    date: commit.commit.author.date,
                    url: commit.html_url
                })));
            }

            // Sort all commits by date in descending order
            allCommits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            // Take the latest 10 commits
            const latest10Commits = allCommits.slice(0, 10);

            const commitList = this.shadowRoot!.getElementById('commit-list');
            if (commitList) {
                commitList.innerHTML = ''; // Clear loading message
                if (latest10Commits.length === 0) {
                    commitList.innerHTML = '<li>No recent updates found.</li>';
                } else {
                    latest10Commits.forEach(commit => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <div class="update-title">
                                <a href="${commit.url}" target="_blank" rel="noopener noreferrer">
                                    ${commit.repo}: ${commit.message.split('\n')[0]}
                                </a>
                            </div>
                            <div class="update-date">
                                ${new Date(commit.date).toLocaleDateString()} by ${commit.author}
                            </div>
                        `;
                        commitList.appendChild(li);
                    });
                }
            }

        } catch (error) {
            console.error('Failed to fetch latest commits:', error);
            const commitList = this.shadowRoot!.getElementById('commit-list');
            if (commitList) {
                commitList.innerHTML = '<li>Failed to load updates. Please try again later.</li>';
            }
        }
    }
}

customElements.define('latest-updates', LatestUpdates);

document.getElementById('app')!.innerHTML = `
    <p>This is a placeholder for the main application content.</p>
`;

// Dark mode logic
const darkModeToggle = document.getElementById('darkModeToggle') as HTMLInputElement;
const body = document.body;

const enableDarkMode = () => {
    body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.checked = true;
    setCookie('darkMode', 'enabled', 365);
};

const disableDarkMode = () => {
    body.classList.remove('dark-mode');
    if (darkModeToggle) darkModeToggle.checked = false;
    setCookie('darkMode', 'disabled', 365);
};

// Check for saved preference on load
const savedDarkMode = getCookie('darkMode');
if (savedDarkMode === 'enabled') {
    enableDarkMode();
} else if (savedDarkMode === 'disabled') {
    disableDarkMode();
} else {
    // Default to light mode if no preference is saved
    disableDarkMode();
}

// Toggle functionality
darkModeToggle?.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
