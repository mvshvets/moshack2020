from marshmallow import Schema, fields

from app import db


class TitleDataSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    created_date = fields.DateTime()
    objects_count = fields.Int()


class ReportsSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    rating = fields.Int()
    created_date = fields.DateTime()
    road_id = fields.Int()


title_data_has_road = db.Table('title_data_has_road',
                               db.Column('title_data_id', db.Integer, db.ForeignKey('titles_data.id')),
                               db.Column('road_id', db.Integer, db.ForeignKey('roads.id'))
                               )


class Road(db.Model):
    """
    Таблица дорог в БД
    """
    __tablename__ = 'roads'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True, nullable=False)
    created_date = db.Column(db.DateTime, index=True, default=db.func.current_timestamp())
    overall_rating = db.Column(db.Integer, index=True)
    reports = db.relationship('Reports')
    operation_period = db.Column(db.String(20))
    titles_data = db.relationship('TitleData', secondary=title_data_has_road)


class TitleData(db.Model):
    """
    Таблица титульных списков
    """
    __tablename__ = 'titles_data'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True, nullable=False)
    created_date = db.Column(db.DateTime, index=True, default=db.func.current_timestamp())
    objects_count = db.Column(db.Integer, nullable=False)


class Reports(db.Model):
    """
    Таблица отчетов контролеров в БД
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), index=True, unique=True, nullable=False)
    rating = db.Column(db.Integer, index=True, nullable=False)
    created_date = db.Column(db.DateTime, index=True, default=db.func.current_timestamp())
    road_id = db.Column(db.Integer, db.ForeignKey('roads.id'), nullable=False)
