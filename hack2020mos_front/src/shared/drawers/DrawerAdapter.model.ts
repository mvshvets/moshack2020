import { BaseButtonProps } from 'antd/lib/button/button'
import { RowSelectionType } from 'antd/es/table/interface'
import { DrawerProps } from 'antd/lib/drawer'

/**
 * @param component - компонент формы
 * @param buttonText - текст для кнопки вызова модального окна
 * @param drawerOptions - пропсы компонента модального окна andt
 * @param buttonOption - пропсы компонента кнопки окна andt
 * @param haveDrawer - если false, то в компоненте выводится только кнопка
 * @param haveButton - если false, то в компоненте выводится только модальное окно
 * @param rowSelectionType - опция для TableAdapter, отвечает за тип выбора записей таблицы
 */
export interface DrawerAdapterProps {
    component?: React.FC
    buttonText?: string
    drawerOptions?: DrawerProps
    buttonOption?: BaseButtonProps
    haveDrawer?: boolean
    haveButton?: boolean
    rowSelectionType?: RowSelectionType
}