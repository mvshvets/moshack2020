import { ReactNode } from 'react'
import { SwitchProps } from 'antd/lib/switch'

/** Интерфейс для SwitchControl */
export interface SwitchControlProps extends SwitchProps {
    /** контент перед переключателем */
    addonAfter?: ReactNode

    /** контент после переключателя */
    addonBefore?: ReactNode
}
