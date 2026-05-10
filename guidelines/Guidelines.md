# Project Guidelines

This document outlines the core guidelines for contributing to the **Futuristic Math Theorem Tester**.

## 1. Project Description & Architecture
- **Purpose:** A web app for testing mathematical theorems with an emphasis on a premium, visually engaging user experience.
- **Backend:** Python + FastAPI. Logic should remain modular in `app/main.py` and templates rendered via Jinja2.
- **Frontend:** Pure HTML/CSS/JS. No heavy frameworks (React/Vue) are used. 
- **Design Philosophy:** Maintain the "Futuristic" aesthetic. Use dark modes (`--bg-gray-950`), vibrant neon accents (`--emerald-500`, `--red-500`), smooth CSS transitions, and glassmorphism (translucency + backdrop-filter).

## 2. Git & Version Control Guidelines

When committing and pushing files to the repository, follow standard Conventional Commits. Your commit message should describe the *intent* of the changes.

### Commit Message Format
`<type>: <short description>`

### Allowed Types
* `feat`: A new feature (e.g., `feat: add new scatter plot to results view`)
* `fix`: A bug fix (e.g., `fix: correct red gradient color in false bar chart`)
* `docs`: Documentation changes (e.g., `docs: update README with project description`)
* `style`: Code style/formatting (e.g., `style: reformat python code to PEP-8`)
* `refactor`: Restructuring code without changing behavior (e.g., `refactor: move files into app folder`)
* `chore`: Maintenance tasks (e.g., `chore: update dependencies in requirements.txt`)

### Best Practices for Pushing
1. Keep commits focused and atomic. Don't bundle unrelated changes into a single commit.
2. Always verify your changes locally (`uvicorn app.main:app`) before pushing to the main branch.
3. If introducing new UI elements, ensure they respect the existing color palette defined in `app/static/css/style.css`.
