import { RouteNamesProps } from './Routing.model'

const PROFILE = 'profile'
const MAP = 'map'
const REPORTS = 'reports'
const TITLE_DATA = 'title-data'
const STATISTIC = 'statistic'

export const ROUTE_NAMES: RouteNamesProps = {
    /** Главная страница */
    MAIN: `/`,
    /** Страница пользователя */
    PROFILE: `/${PROFILE}`,
    /** Карта */
    MAP: `/${MAP}`,
    /** Отчеты */
    REPORTS: `/${REPORTS}`,
    /** Титульные листы */
    TITLE_DATA: `/${TITLE_DATA}`,
    /** Таблица статистики */
    STATISTIC: `/${STATISTIC}`,
}