from sqlalchemy import Boolean, Column, Integer, String, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from db import Base

class PlaylistInfoTable(Base):
    __tablename__ = 'playlist_info'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    playlist_name = Column(String(128), unique=True, nullable=False)
    playlist_url = Column(String(256), unique=True, nullable=False)
    track_list = relationship("TrackListTable", back_populates='playlist_info', cascade='delete')
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

class TrackListTable(Base):
    __tablename__ = "track_list"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    playlist_info_id = Column(Integer, ForeignKey("playlist_info.id"))
    track_name = Column(String(128), nullable=False)
    artist_name = Column(String(128), nullable=False)
    album_name = Column(String(128), nullable=False)
    playlist_info = relationship("PlaylistInfoTable", back_populates='track_list')
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
