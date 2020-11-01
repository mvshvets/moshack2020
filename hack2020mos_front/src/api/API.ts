import axios, { AxiosResponse } from 'axios'
import { DICTIONARY, REPORTS, SEARCH, TITLE_DATA } from './api.consts'
import {
    DictionaryModel,
    DictionaryTypes,
    ReportsModel,
    ReportsSearchModel,
    SearchParamsModel,
    TablePageResponseModel,
    TitleDataDocModel,
    TitleDataModel,
    TitleDataSearchModel
} from './api.models'

const instance = axios.create({
    baseURL: 'https://moshak-api.herokuapp.com/',
    //baseURL: 'http://127.0.0.1:5000/',
    withCredentials: true
})

const instanceEgip = axios.create({
    baseURL: 'https://egiptest.mos.ru/',
    withCredentials: true,
});

export const API = {
    /** Получить Hello World */
    getHelloWorld: () => instance.get('/map'),

    /** Загрузка титульного листа */
    setTitleDataDoc: (body: FormData): Promise<AxiosResponse<TitleDataDocModel>> => instance.post(`/${TITLE_DATA}`, body),

    /** Таблица титульных списков */
    getTitlesDataList: ({ body, per_page, page }: SearchParamsModel<TitleDataSearchModel>): Promise<AxiosResponse<TablePageResponseModel<TitleDataModel>>> => instance.post(`/${TITLE_DATA}/${SEARCH}?per_page=${per_page}&page=${page}`, body),

    /** Таблица отчетов */
    getReportsList: ({ body, per_page, page }: SearchParamsModel<ReportsSearchModel>): Promise<AxiosResponse<TablePageResponseModel<ReportsModel>>> => instance.post(`/${REPORTS}/${SEARCH}?per_page=${per_page}&page=${page}`, body),

    /** Справочники */
    getDictionary: (typeDictionary: DictionaryTypes): Promise<AxiosResponse<DictionaryModel[]>> => instance.get(`/${DICTIONARY}/${typeDictionary}`),

}

export const API_EGIP = {
    get: () => instanceEgip.post('/egip/login', {login: 'user_api', password: '-5V2wJO"!"X4'})
}