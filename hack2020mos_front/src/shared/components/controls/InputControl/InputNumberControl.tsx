import React  from 'react'
import { INPUT_NUMBER_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { InputNumber } from 'antd'

import { InputNumberControlProps } from './InputControlProps.model'

/**
 * Декоратор для `InputNumber` от `antd`, принимает все теже `props`
 */
export const InputNumberControl: React.FC<InputNumberControlProps> = React.memo((props) => {
    return (
        <InputNumber
            placeholder={INPUT_NUMBER_PLACEHOLDER_DEFAULT}
            type="number"
            {...props}
        />
    )
})
