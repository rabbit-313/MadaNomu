from fastapi import APIRouter, Depends
from typing import List
import schemas.spotify_api as spotify_api_schema
import modules.playlist as playlist
import modules.sanitize as sanitize

from sqlalchemy.orm import Session
from typing import List
from db import get_db
from models.playlist import PlaylistInfoTable, TrackListTable



router = APIRouter()

@router.post("/post_url")
async def post_url(request: spotify_api_schema.UrlRequest, db: Session = Depends(get_db)):
    playlist_url = request.url
    playlist_info = playlist.get_playlist_info(playlist_url)
    playlist_info_json = playlist.playlist_info_json(playlist_info)

    db_playlist_info = PlaylistInfoTable(playlist_name=playlist_info_json["playlist_name"], playlist_url=playlist_url)
    db.add(db_playlist_info)
    db.commit()
    db.refresh(db_playlist_info)

    for track in playlist_info_json["tracks"]:
        track_name_sanitized = sanitize.sanitize_string(track["track_name"])
        artist_name_sanitized = sanitize.sanitize_string(track["artist_name"])
        album_name_sanitized = sanitize.sanitize_string(track["album_name"])
        db_track = TrackListTable(playlist_info_id=db_playlist_info.id, track_name=track_name_sanitized, artist_name=artist_name_sanitized, album_name=album_name_sanitized)
        db.add(db_track)
    db.commit()
    db.refresh(db_track)

    return playlist_info_json
