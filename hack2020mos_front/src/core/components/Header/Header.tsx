import './Header.scss'

import React, { FC, useCallback, useContext } from 'react'
import { LoaderContext, UserContext } from 'core/context'
import { MainMenu } from './components'
import { Button } from 'antd'
import { ROUTE_NAMES } from 'routing'
import { Link } from 'react-router-dom'
import { PopupAdapter, AuthModal } from 'shared/popups'
import { Store } from 'rc-field-form/lib/interface'
import Logo from './logo.svg'

export const Header: FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const { userData, setUserData } = useContext(UserContext)

    const handleRequestFinish = useCallback((popupHandler: () => void) => (values: Store) => {
        try {
            setLoaderState(true)
            if (values.login === 'admin' && values.password === 'admin') {
                popupHandler()
                setUserData(values)
            }
        } finally {
            setLoaderState(false)
        }
    }, [setUserData, setLoaderState])

    const handleLogout = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        setUserData(null)
        localStorage.removeItem('userData')
    }, [setUserData])

    return (
        <header className="header">
            <Link to={ROUTE_NAMES.MAIN}>
                <img src={Logo} alt="logo"/>
            </Link>
            <div className="header__menu-wrapper">
                <MainMenu/>

                {userData ? (
                    <Button onClick={handleLogout}>ВЫХОД</Button>
                ) : (
                    <PopupAdapter
                        component={AuthModal}
                        formId="authForm"
                        buttonText="ВХОД"
                        onRequestFinish={handleRequestFinish}
                        modalOptions={{ footer: null }}
                    />
                )}
            </div>
        </header>
    )
})
