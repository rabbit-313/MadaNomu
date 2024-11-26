from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class LineBotMessage(BaseModel):
    user_id: int
    linemessage: Optional[str] = None

class LineBotMessageResponse(BaseModel):
    status: int
    message: str
    linemessage: Optional[str] = None

class MakeMessage(BaseModel):
    user_id: int
    correct: int

class MakeMessageResponse(BaseModel):
    linemessage: Optional[str] = None
