from fastapi import APIRouter, Depends, HTTPException, status
import schemas.linebot as linebot_message_schema
from modules.lineapi import push_message
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter()

@router.post("/post_message", response_model=linebot_message_schema.LineBotMessageResponse)
async def post_user(request: linebot_message_schema.LineBotMessage):
    message = request.linemessage
    status = push_message(message)
    return status
