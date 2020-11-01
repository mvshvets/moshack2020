import React, {useCallback} from 'react'
import { FiltersProps } from 'shared/utils'
import { Form, Row, Col, Button } from 'antd'
import { COL_RESPONSIVE_DEFAULT, COMMON_ITEM_OPTIONS, ROW_GUTTER } from 'shared/consts'
import { ButtonsToolbar, DatePickerControl, InputControl } from 'shared/components'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { TitleDataSearchModel } from 'api'

/** Фильтры для таблицы титульных листов */
export const TitleDataFilters: React.FC<FiltersProps<TitleDataSearchModel>> = React.memo(
    ({ onSetFilters }) => {
        const [form] = Form.useForm()

        /**
         * Обработчик отправки формы фильтра
         * @param values значения фильтра
         */
        const handleFinish = useCallback(
            (values) => {
                onSetFilters(values)
            },
            [onSetFilters]
        )

        /**
         * Обработчик очистки формы фильтра
         */
        const handleClear = useCallback(() => {
            onSetFilters({})
            form.resetFields()
        }, [form, onSetFilters])

        return (
            <Form form={form} onFinish={handleFinish}>
                <Row gutter={ROW_GUTTER}>
                    <Col {...COL_RESPONSIVE_DEFAULT}>
                        <Form.Item
                            name="name"
                            label="Название"
                            {...COMMON_ITEM_OPTIONS}
                        >
                            <InputControl />
                        </Form.Item>
                    </Col>

                    <Col {...COL_RESPONSIVE_DEFAULT}>
                        <Form.Item
                            name="upload_date"
                            label="Дата загрузки"
                            {...COMMON_ITEM_OPTIONS}
                        >
                            <DatePickerControl/>
                        </Form.Item>
                    </Col>
                </Row>

                <ButtonsToolbar>
                    <Button htmlType="submit" type="primary">
                        <SearchOutlined/>
                        Искать
                    </Button>
                    <Button onClick={handleClear}>
                        <CloseOutlined/>
                        Очистить
                    </Button>
                </ButtonsToolbar>
            </Form>
        )
    }
)