from flask_restx import Resource, Namespace, fields
from sqlalchemy.orm import load_only
from models import Road as RoadModel

ns = Namespace('Dictionary', description='Справочники', path='/dictionary')

model_output = ns.model('DictionaryRoadOutput', {
    'id': fields.Integer,
    'name': fields.String,
})


@ns.route('/roads')
class DictionaryRoads(Resource):

    @ns.doc(responses={200: 'OK', 500: 'Неизвестная ошибка'})
    @ns.marshal_list_with(model_output)
    def get(self):
        """ Получить справочник улиц """
        rows = ['id', 'name']
        roads = RoadModel.query.options(load_only(*rows)).all()
        return roads
