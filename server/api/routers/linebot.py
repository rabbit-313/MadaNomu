from fastapi import APIRouter, Depends, HTTPException, status
import schemas.linebot as linebot_message_schema
from modules.lineapi import push_message
from modules.make_message import make_message
from sqlalchemy.orm import Session
from models.user import UserTable
from db import get_db
import httpx

router = APIRouter()

@router.post("/post_message", response_model=linebot_message_schema.LineBotMessageResponse)
async def post_user(request: linebot_message_schema.LineBotMessage, db: Session = Depends(get_db)):
    linemessage = request.linemessage
    user_id = request.user_id

    db_user = db.query(UserTable).filter(UserTable.id == user_id).first()
    user_name = db_user.username
    status = push_message(user_name +  "は" + linemessage)
    return status

@router.post("/post_correct", response_model=linebot_message_schema.MakeMessageResponse)
async def post_correct(request: linebot_message_schema.MakeMessage):
    linemessage = make_message(request.correct)
    user_id = request.user_id
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:8080/post_message", 
                json={"user_id":user_id, "linemessage": linemessage}
            )
        # 次のエンドポイントのレスポンスを返す
        return {"linemessage": linemessage}
    except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
