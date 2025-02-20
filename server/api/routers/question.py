from fastapi import APIRouter, Depends, HTTPException, status
import schemas.question as question_schema
from models.question import QuestionTable
from sqlalchemy.orm import Session
from db import get_db

router = APIRouter()

@router.post("/post_question", response_model=question_schema.QuestionResponse)
async def post_question(request: question_schema.Question, db: Session = Depends(get_db)):
    question_name = request.question_name
    question = request.question
    level = request.level
    answer = request.answer
    choice_1 = request.choice_1
    choice_2 = request.choice_2
    choice_3 = request.choice_3
    choice_4 = request.choice_4
    db_question = QuestionTable(question_name=question_name, question=question, level=level, answer=answer, choice_1=choice_1, choice_2=choice_2, choice_3=choice_3, choice_4=choice_4)
    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    return db_question

@router.get("/get_question/{id}", response_model=question_schema.QuestionResponse)
async def get_users(id: int, db: Session = Depends(get_db)):
    db_question = db.query(QuestionTable).filter(QuestionTable.id == id).first()
    if db_question is None:
        raise HTTPException(status_code=status.HTTP_404_NOTFOUND, detail="Question not found")
    return db_question
