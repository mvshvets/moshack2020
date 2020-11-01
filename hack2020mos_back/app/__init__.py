from flask import Flask

from config import Config
from extensions import db, migrate, cors, api
import requests
from app.map import ns as ns_map
from app.title_data import ns as ns_data_set
from app.reports import ns as ns_reports
from app.dictionary import ns as ns_dictionary


def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_extensions(app)

    resp = requests.get('https://damia.ru/api-zakupki/zakupka?regn=0373200193019000001&key=1363e09ab4b2d1180520a7836dbc9df453ea8f01')
    print(resp.json())

    return app


def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)

    cors.init_app(app, supports_credentials=True)

    api.init_app(app, version='1.0', title='Swagger API',
                 description='API для сервиса интерактовной карты благоустройства г. Москва')

    api.add_namespace(ns_map)
    api.add_namespace(ns_data_set)
    api.add_namespace(ns_reports)
    api.add_namespace(ns_dictionary)

