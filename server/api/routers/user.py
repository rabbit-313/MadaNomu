from fastapi import APIRouter, Depends, HTTPException, status
import schemas.user as user_schema
from sqlalchemy.orm import Session
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

@router.get("/get_user/{user_id}", response_model=user_schema.UserResponse)
async def get_users(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserTable).filter(UserTable.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOTFOUND, detail="User not found")
    return db_user
