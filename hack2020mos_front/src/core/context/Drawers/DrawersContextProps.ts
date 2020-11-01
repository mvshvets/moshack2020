import { Dispatch, ReactText, SetStateAction } from 'react'

export interface DrawersContextProps {
    drawerAdapterOptions: SingleDrawerProps
    setDrawerAdapterOptions: Dispatch<SetStateAction<SingleDrawerProps>>
}

/**
 * @param visible - состояние модального окна (видимость
 * @param id
 */
export interface SingleDrawerProps {
    visible?: boolean
    id?: ReactText
}
