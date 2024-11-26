from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class LineBotMessage(BaseModel):
    linemessage: Optional[str] = None

class LineBotMessageResponse(LineBotMessage):
    status: int
    message: str

class MakeMessage(BaseModel):
    correct: int

class MakeMessageResponse(BaseModel):
    linemessage: Optional[str] = None
