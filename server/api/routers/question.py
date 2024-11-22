from fastapi import APIRouter, Depends, HTTPException, status
import schemas.question as question_schema
from models.question import QuestionTable
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter()

@router.post("/post_question", response_model=question_schema.QuestionResponse)
async def post_question(request: question_schema.Question, db: Session = Depends(get_db)):
    question_name = request.question_name
    level = request.level
    answer = request.answer
    choice_1 = request.choice_1
    choice_2 = request.choice_2
    choice_3 = request.choice_3
    choice_4 = request.choice_4
    db_question = QuestionTable(question_name=question_name, level=level, answer=answer, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    return db_question

# @router.get("/get_question/{user_id}", response_model=user_schema.UserResponse)
# async def get_users(user_id: int, db: Session = Depends(get_db)):
#     db_user = db.query(UserTable).filter(UserTable.id == user_id).first()
#     if db_user is None:
#         raise HTTPException(status_code=status.HTTP_404_NOTFOUND, detail="User not found")
#     return db_user
