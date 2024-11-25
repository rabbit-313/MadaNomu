from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
from routers import user, question, linebot

app = FastAPI()

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(question.router)
app.include_router(linebot.router)
