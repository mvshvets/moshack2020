from flask_restx import Resource, Namespace

ns = Namespace('Map', description='Карта', path='/map')


@ns.route('')
class Map(Resource):

    @ns.doc(responses={200: 'OK', 500: 'Неизвестная ошибка'})
    def get(self):
        """
        Получить набор маркеров для карты
        """
        return {'value': 'Hello, World!'}
