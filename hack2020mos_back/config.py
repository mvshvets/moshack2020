import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    # Настройки БД
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Ограничение на размер загружаемого контента
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024

    RESTX_MASK_SWAGGER = False

