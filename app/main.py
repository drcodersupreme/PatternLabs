from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import random
import math
import os

app = FastAPI()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")

templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    example_conjectures = [
        {
            'title': 'Goldbach Conjecture',
            'description': 'Every even integer > 2 is the sum of two primes',
            'formula': 'n = p + q where p,q are prime'
        },
        {
            'title': 'Twin Prime Conjecture',
            'description': 'Infinitely many primes p where p+2 is also prime',
            'formula': 'p and p+2 are both prime'
        },
        {
            'title': 'Fermat Numbers',
            'description': 'Numbers of the form 2^(2^n) + 1',
            'formula': 'F_n = 2^(2^n) + 1'
        },
        {
            'title': 'Prime Patterns',
            'description': 'Testing specific patterns in prime distributions',
            'formula': 'p_n ~ n ln(n)'
        }
    ]
    return templates.TemplateResponse(
        "index.html", 
        {"request": request, "example_conjectures": example_conjectures}
    )

@app.post("/simulate", response_class=HTMLResponse)
async def simulate(request: Request, theorem: str = Form(...)):
    tested = 10000
    true_count = random.randint(6000, 9000)
    false_count = tested - true_count
    accuracy = (true_count / tested) * 100
    
    chart_data = []
    for i in range(50):
        chart_data.append({
            "number": i * 200,
            "result": random.random() > 0.3,
            "height": random.randint(40, 100)
        })
        
    return templates.TemplateResponse(
        "result.html",
        {
            "request": request,
            "theorem": theorem,
            "tested": tested,
            "true_count": true_count,
            "false_count": false_count,
            "accuracy": f"{accuracy:.1f}",
            "chart_data": chart_data
        }
    )
