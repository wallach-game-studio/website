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
                    background-color: #f9f9f9;
                }
                h2 {
                    color: #333;
                    margin-top: 0;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                }
                .update-title {
                    font-weight: bold;
                    color: #007bff;
                }
                .update-date {
                    font-size: 0.9em;
                    color: #666;
                }
            </style>
            <h2>Latest Software Updates</h2>
            <ul>
                <li>
                    <div class="update-title">MyLib v1.2.0 Released</div>
                    <div class="update-date">October 25, 2025</div>
                    <div>New features include improved performance and bug fixes.</div>
                </li>
                <li>
                    <div class="update-title">MyFramework v0.5.0 Beta</div>
                    <div class="update-date">October 18, 2025</div>
                    <div>Introduced new API for easier integration.</div>
                </li>
                <li>
                    <div class="update-title">MyTool v2.1.0 Patch</div>
                    <div class="update-date">October 10, 2025</div>
                    <div>Critical security update and minor enhancements.</div>
                </li>
            </ul>
        `;
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
