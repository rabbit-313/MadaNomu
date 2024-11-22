from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    username: Optional[str] = None

class UserResponse(User):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
