import React  from 'react'
import { ConfigProvider } from 'antd'
import moment from 'moment'
import ru_RU from 'antd/es/locale/ru_RU'
import './App.scss'
import { Header, Footer } from 'core/components'
import { Compose } from 'shared/components'
import { Routing } from 'routing'
import {
    DocumentTitleContextProvider,
    MapContextProvider,
    LoaderContextProvider,
    UserContextProvider,
    ModalsContextProvider,
    DrawersContextProvider
} from 'core/context'
import { BrowserRouter } from 'react-router-dom'
import { Popups } from 'shared/popups'

moment.locale('ru')

export const App: React.FC = React.memo(() => {
    return <div className="app">
        <ConfigProvider locale={ru_RU}>
            <Compose
                components={[
                    BrowserRouter,
                    LoaderContextProvider,
                    UserContextProvider,
                    DocumentTitleContextProvider,
                    ModalsContextProvider,
                    MapContextProvider,
                    DrawersContextProvider
                ]}
            >
                <Header/>

                <Routing/>

                <Footer/>

                <Popups/>
            </Compose>
        </ConfigProvider>
    </div>
})