# Portfolio Project Overview

This document summarizes the structure, technology, styling, and content management for the portfolio website.

## How it Works

-   The website is a single-page application built with Next.js.
-   It features a main header with your name and a short bio.
-   Below the header, the content is organized into four distinct sections:
    -   Work
    -   Personal Projects
    -   Music
    -   Blog
-   Each section contains a list of items (projects, articles, etc.).
-   Hovering over an item reveals its description and displays a corresponding image in a modal window that follows the cursor.
-   Clicking on an item navigates the user to the associated link.

## Technology Stack

-   **Framework:** [Next.js](https://nextjs.org/) (React framework)
-   **Language:** JavaScript (React JSX)
-   **Styling:** CSS Modules (Scoped CSS for components)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) (Used for the hover modal effect)

## Styling

-   **Font:** Nunito Sans (loaded via Google Fonts through `next/font`)
-   **Color Scheme:**
    -   Background: `#FFFFFF` (White)
    -   Text & CTAs: `#0E38B1` (Blue)
-   **Layout:** Left-aligned content with consistent padding and clear heading hierarchy (H1 for name, H2 for sections, H3 for project titles).

## How to Add/Edit Projects

1.  **Open the main page file:** `src/app/page.js`
2.  **Locate the relevant project array:** Find the array corresponding to the section you want to modify (e.g., `workProjects`, `personalProjects`, `musicProjects`, `blogArticles`).
3.  **Add or modify project objects:** Each project is an object within the array. To add a new project, copy an existing object, paste it within the array (making sure to add a comma if needed), and update its properties:
    -   `title`: The main title displayed for the project.
    -   `description`: The subtitle text that appears on the right and on hover.
    -   `link`: The URL the user will be navigated to when clicking the item.
    -   `src`: The filename of the image (must be placed in `/public/images/`) that will appear in the hover modal.
    -   `color`: The background color of the hover modal for this specific item.
4.  **Add Images:** Place the corresponding image file (e.g., `my-new-project.png`) inside the `public/images/` directory. Make sure the `src` property in the project object matches this filename exactly.
5.  **Save the file:** The development server should automatically reload the page with your changes. 