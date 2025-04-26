from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Summary(BaseModel):
    userId: str
    month: str
    income: float
    expense: float

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/recommend")
def recommend(summary: Summary):
    income = summary.income
    expense = summary.expense
    net = income - expense

    # Apply 50/30/20 rule with explanations
    budget = {
        "needs": {
            "amount": round(income * 0.5, 2),
            "description": "Essential expenses like rent, food, transportation, and utilities."
        },
        "wants": {
            "amount": round(income * 0.3, 2),
            "description": "Non-essential spending such as entertainment, restaurants, and shopping."
        },
        "savings": {
            "amount": round(income * 0.2, 2),
            "description": "Money to set aside for savings, investments, or paying off debt."
        }
    }

    # Adaptive insights
    insights = []

    if net > 1000:
        insights.append("Excellent savings this month. Consider investing in long-term assets.")
    elif 0 < net <= 1000:
        insights.append("You're doing well! Keep tracking your expenses and save more.")
    elif net == 0:
        insights.append("You're breaking even. Try to reduce optional spending.")
    else:
        insights.append("You've spent more than you earned. Time to reassess spending priorities.")

    if expense > income * 0.9:
        insights.append("Expenses exceeded 90% of your income. High risk of financial stress.")

    return {
        "userId": summary.userId,
        "month": summary.month,
        "net": net,
        "budgetBreakdown": budget,
        "insights": insights
    }