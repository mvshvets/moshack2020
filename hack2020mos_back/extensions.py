from flask_cors import CORS
from flask_migrate import Migrate
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
migrate = Migrate()
cors = CORS(supports_credentials=True)
api = Api()
