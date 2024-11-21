from sqlalchemy import create_engine
from models.playlist import PlaylistInfoTable, TrackListTable

# 接続したいDBの基本情報を設定
user_name = "user"
password = "password"
host = "db"  # docker-composeで定義したMySQLのサービス名
database_name = "madanomu"

DATABASE = 'mysql://%s:%s@%s/%s?charset=utf8' % (
    user_name,
    password,
    host,
    database_name,
)

# DBとの接続
ENGINE = create_engine(
    DATABASE,
    echo=True
)

def reset_database():
    PlaylistInfoTable.metadata.drop_all(bind=ENGINE)
    TrackListTable.metadata.drop_all(bind=ENGINE)
    PlaylistInfoTable.metadata.create_all(bind=ENGINE)
    TrackListTable.metadata.create_all(bind=ENGINE)

if __name__ == "__main__":
    reset_database()
