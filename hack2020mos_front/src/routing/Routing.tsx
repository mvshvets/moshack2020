import './Routing.scss'

import React, { FC, useContext } from 'react'
import { NotFoundPage, Statistic, MapView, Profile, TitleData, Reports } from 'pages'
import { LoaderContext } from 'core/context'

import { ROUTE_NAMES } from './routeNames.const'
import { Route, Switch, Redirect } from 'react-router-dom'
import classNames from 'classnames'

export const Routing: FC = React.memo(() => {
    const { loaderState } = useContext(LoaderContext)

    return (
        <div className={classNames([
            'content',
            'scroll',
            { 'with-loader': loaderState }
        ])}>

            <Switch>
                {/* Главная страница */}
                <Route path={ROUTE_NAMES.MAIN} exact>
                    <Redirect to={ROUTE_NAMES.MAP}/>
                </Route>

                {/* Карта */}
                <Route path={ROUTE_NAMES.MAP}>
                    <MapView/>
                </Route>

                {/* Отчеты */}
                <Route path={ROUTE_NAMES.REPORTS}>
                    <Reports/>
                </Route>

                {/* Таблица статистики */}
                <Route path={ROUTE_NAMES.STATISTIC}>
                    <Statistic/>
                </Route>

                {/* Титульные листы */}
                <Route path={ROUTE_NAMES.TITLE_DATA}>
                    <TitleData/>
                </Route>

                {/* Профайл */}
                <Route path={ROUTE_NAMES.PROFILE}>
                    <Profile/>
                </Route>

                {/* Ловушка неизвестных роутов */}
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    )
})
