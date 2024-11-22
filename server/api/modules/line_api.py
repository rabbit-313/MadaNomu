from linebot import LineBotApi
from linebot.exceptions import LineBotApiError
from linebot.models import TextSendMessage
import os
from dotenv import load_dotenv

def line_api():
    try:
        load_dotenv()
        CHANNEL_ACCESS_TOKEN = os.getenv('CHANNEL_ACCESS_TOKEN')

        if not CHANNEL_ACCESS_TOKEN:
            raise ValueError("CHANNEL_ACCESS_TOKEN is missing in environment variables.")

        line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)
        return line_bot_api

    except ValueError as ve:
        return {"status": 400, "message": str(ve)}  # 環境変数エラー時
    except Exception as e:
        return {"status": 500, "message": f"Failed to initialize LineBotApi: {str(e)}"}  # 予期しないエラー

def push_message(msg):
    load_dotenv()
    LINE_GROUP_ID = os.getenv('LINE_GROUP_ID')
    line_bot_api = line_api()
    try:
        line_bot_api.push_message(LINE_GROUP_ID, TextSendMessage(text=msg))
        return {"status": 200, "message": "Message sent successfully!"}  # 成功時のステータス
    except LineBotApiError as e:
        return {
            "status": e.status_code,
            "message": f"Failed to send message: {e.error.message}"
        }


