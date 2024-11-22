from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class Question(BaseModel):
    question_name: str
    level: Optional[int] = None
    answer: int
    choice_1: str
    choice_2: str
    choice_3: str
    choice_4: str

class QuestionResponse(Question):
    id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

