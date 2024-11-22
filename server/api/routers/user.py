from fastapi import APIRouter, Depends
from typing import List
import schemas.user as user_schema

from sqlalchemy.orm import Session
from typing import List
from db import get_db
from models.user import UserTable

router = APIRouter()

@router.post("/post_user", response_model=user_schema.UserResponse)
async def post_user(request: user_schema.User, db: Session = Depends(get_db)):
    username = request.username
    db_user = UserTable(username=username, status=None)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
