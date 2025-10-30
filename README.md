# Personal Company Website

This is a personal company website showcasing various web development features.

## Features

-   **Modern Dark Theme:** The website features a modern dark theme that can be toggled on and off.
-   **Dark Mode Toggle:** A stylish animated slider with sun/moon icons allows users to switch between light and dark modes. The preference is saved in a cookie.
-   **Live Software Updates:** The "Latest Software Updates" section dynamically fetches and displays the 10 most recent commits from all repositories under the `wallach-game-studio` GitHub organization. This section updates every minute, and new commits are highlighted with a subtle animation.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (LTS version recommended)
-   npm (comes with Node.js)

### Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/wallach-game-studio/website.git
    cd website
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```

### Running Locally

To run the development server:

```bash
npm start
```

This will open the website in your browser, usually at `http://localhost:9000`.

## Viewing in Action (GitHub Pages)

The website is deployed to GitHub Pages. You can view the live version and see the features in action at:

[https://wallach-game-studio.github.io/website/](https://wallach-game-studio.github.io/website/)

-   **Dark Mode Toggle:** Look for the sun/moon slider icon in the top right corner to switch themes.
-   **Live Updates:** Scroll down to the "Latest Software Updates" section to see the dynamically loaded commits. New commits will briefly highlight.
