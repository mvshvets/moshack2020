import {
    CheckboxGroupProps,
    CheckboxOptionType,
    CheckboxProps,
} from 'antd/lib/checkbox'

export interface CheckboxControlProps extends CheckboxProps {}

export interface CheckboxGroupControlProps extends CheckboxGroupProps {
    labelList?: Array<CheckboxOptionType | string>
}
