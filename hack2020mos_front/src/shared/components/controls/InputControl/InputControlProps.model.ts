import { InputNumberProps } from 'antd/lib/input-number'
import { InputProps, PasswordProps } from 'antd/lib/input'
import { ReactNode } from 'react'

export interface InputControlProps extends InputProps {}

export interface InputPasswordControlProps extends PasswordProps {}

/** Интерфейс для InputNumberControl */
export interface InputNumberControlProps extends InputNumberProps {
    /** флаг ширины контрола */
    fullWidth?: boolean
    /** контент после инпута */
    addonAfter?: ReactNode
    /** контент до инпута */
    addonBefore?: ReactNode
}
