from flask import request
from flask_restx import Resource, Namespace, fields, reqparse
from extensions import db
from models import Reports as ReportsModel, ReportsSchema

ns = Namespace('Reports', description='Отчетность', path='/reports')

model_output = ns.model('ReportOutput', {
    'id': fields.Integer,
    'name': fields.String,
    'created_date': fields.DateTime,
    'rating': fields.Integer,
    'road_name': fields.String,
})

model_list_output = ns.model('ReportListOutput', {
    'pageItems': fields.List(fields.Nested(model_output)),
    'total': fields.Integer
})

upload_parser = reqparse.RequestParser()
upload_parser.add_argument('name', location='json')
upload_parser.add_argument('rating', type=int, location='json')
upload_parser.add_argument('road_name', location='json')

search_parser = upload_parser.copy()
search_parser.add_argument('created_date', location='json')


@ns.route('/search')
class ReportsSearch(Resource):

    @ns.doc(responses={500: 'Неизвестная ошибка'},
            params={'per_page': 'Кол-во записей на странице', 'page': 'Номер страницы'},
            body=search_parser)
    @ns.response(200, 'OK', model_list_output)
    def post(self):
        """ Получить титульные списки """
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per-page', 10, type=int)

        search_data = search_parser.parse_args()
        search_data = {k: v for k, v in search_data.items() if v not in [[], '', None]}

        rows_count = db.session.query(ReportsModel).count()
        reports = []

        if search_data == {}:
            reports = ReportsModel.query.order_by(ReportsModel.created_date.desc()).paginate(page, per_page, False)\
                .items

        return {
            'page_items': ReportsSchema().dump(reports, many=True),
            'total': rows_count
        }


@ns.route('')
class Reports(Resource):

    @ns.doc(responses={200: 'OK', 500: 'Неизвестная ошибка'},
            body=upload_parser)
    def post(self):
        """
        Создать отчет
        """
        new_obj_data = upload_parser.parse_args()
        new_obj_data = {k: v for k, v in new_obj_data.items() if v not in [[], '', None]}

        if new_obj_data['rating'] > 5:
            return {
                'message': 'Значение рейтинга может быть не больше 5'
            }

        report = ReportsModel(name=new_obj_data['name'],
                              rating=new_obj_data['rating'],
                              road_id=new_obj_data['road_id'],
                              )
        db.session.add(report)
        db.session.commit()
        return {
            'message': 'Отчет успешно создан'
        }


@ns.route('/<int:id>')
class Report(Resource):

    @ns.doc(responses={500: 'Неизвестная ошибка'})
    @ns.response(200, 'OK', model_output)
    def get(self, id):
        """
        Получить отчет по состоянию определенного объекта
        """
        report = ReportsModel.query.filter_by(id=id).first()
        return ReportsSchema().dump(report) or ns.abort(400, 'Нет отчета с таким id')
