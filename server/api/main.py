from fastapi import FastAPI
from typing import List  # ネストされたBodyを定義するために必要
from routers import user
from starlette.middleware.cors import CORSMiddleware  # CORSを回避するために必要
from db import session  # DBと接続するためのセッション
from models.user import UserTable # 今回使うモデルをインポート
from routers import task, done, user, spotify_api

app = FastAPI()

# CORSを回避するために設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task.router)
app.include_router(done.router)
app.include_router(user.router)
app.include_router(spotify_api.router)
