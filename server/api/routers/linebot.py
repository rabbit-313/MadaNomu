from fastapi import APIRouter, Depends, HTTPException, status
import schemas.linebot as linebot_message_schema
from modules.lineapi import push_message
from modules.make_message import make_message
import httpx

router = APIRouter()

@router.post("/post_message", response_model=linebot_message_schema.LineBotMessageResponse)
async def post_user(request: linebot_message_schema.LineBotMessage):
    message = request.linemessage
    status = push_message(message)
    return status

@router.post("/post_correct", response_model=linebot_message_schema.MakeMessageResponse)
async def post_correct(request: linebot_message_schema.MakeMessage):
    linemessage = make_message(request.correct)
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:8080/post_message", 
                json={"linemessage": linemessage}
            )
        # 次のエンドポイントのレスポンスを返す
        return {"linemessage": linemessage}
    except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
