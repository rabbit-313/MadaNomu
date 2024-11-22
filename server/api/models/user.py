from sqlalchemy import Boolean, Column, Integer, String, DateTime, func
from pydantic import BaseModel
from db import Base

# userテーブルのモデルUserTableを定義
class UserTable(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=False, index=True, nullable=False)
    status = Column(Integer, unique=False, index=False, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
