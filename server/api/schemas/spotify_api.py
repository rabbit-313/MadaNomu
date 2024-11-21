from typing import Optional
from pydantic import BaseModel, Field

# リクエストボディのモデルを定義
class UrlRequest(BaseModel):
    url: str
