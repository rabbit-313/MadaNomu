from sqlalchemy import create_engine
from models.user import UserTable

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
    UserTable.metadata.drop_all(bind=ENGINE)
    UserTable.metadata.create_all(bind=ENGINE)

if __name__ == "__main__":
    reset_database()
