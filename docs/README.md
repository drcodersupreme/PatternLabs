# Futuristic Math Theorem Tester

## About The Project
The **Futuristic Math Theorem Tester** is a visually striking, high-performance web application designed to validate mathematical conjectures (like the Goldbach Conjecture or Twin Prime Conjecture). Built using a Python **FastAPI** backend and a custom vanilla **HTML/CSS/JS** frontend, it simulates testing algorithms across large datasets (up to 10,000 numbers).

Key features include:
- A dynamic, neon-themed UI with glassmorphism and subtle micro-animations.
- Live progress simulation with particle and waveform effects.
- Interactive results charts (Distribution Bar Chart and True/False Donut Chart).
- A RESTful FastAPI backend for data processing and HTML templating.

## Running the Code Locally

Ensure you have Python installed, then install the dependencies (if a `requirements.txt` is present, otherwise install fastapi and uvicorn):
```bash
pip install fastapi uvicorn jinja2 python-multipart
```

Start the local development server using Uvicorn:
```bash
uvicorn app.main:app --reload
```

## Git Workflow: Pushing Changes

When making changes and pushing this project to a Git repository, follow these standard steps:

1. **Check your changes:**
   ```bash
   git status
   ```
2. **Add the changed files:**
   ```bash
   git add .
   ```
3. **Commit with a descriptive message:**
   Write a clear, concise commit message explaining *what* was changed.
   ```bash
   git commit -m "feat: organized file structure and updated layout"
   ```
   *(See `guidelines/Guidelines.md` for our commit message conventions)*
4. **Push to the remote repository:**
   ```bash
   git push origin main
   ```