from sqlalchemy import Boolean, Column, Integer, String, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from db import Base

# userテーブルのモデルUserTableを定義
class QuestionTable(Base):
    __tablename__ = 'question'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    question_name = Column(String(256), unique=False, index=False, nullable=False)
    level = Column(Integer, unique=False, index=False, nullable=True)
    answer = Column(Integer, unique=False, index=False, nullable=False)
    choice_1 = Column(String(256), unique=False, index=False, nullable=False)
    choice_2 = Column(String(256), unique=False, index=False, nullable=False)
    choice_3 = Column(String(256), unique=False, index=False, nullable=False)
    choice_4 = Column(String(256), unique=False, index=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
