from linebot import LineBotApi
from linebot.models import TextSendMessage
import os
from dotenv import load_dotenv

load_dotenv()
CHANNEL_ACCESS_TOKEN = os.getenv('CHANNEL_ACCESS_TOKEN')
LINE_GROUP_ID = os.getenv('LINE_GROUP_ID')
msg = 'Hello World!'

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)
line_bot_api.push_message(LINE_GROUP_ID, TextSendMessage(text=msg))
