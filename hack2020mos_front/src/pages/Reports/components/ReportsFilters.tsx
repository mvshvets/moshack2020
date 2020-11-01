import React, { useCallback, useEffect, useState } from 'react'
import { FiltersProps, normalizeDataForSelect } from 'shared/utils'
import { Form, Row, Col, Button } from 'antd'
import { COMMON_ITEM_OPTIONS, ROW_GUTTER } from 'shared/consts'
import {
    ButtonsToolbar,
    DatePickerControl,
    InputControl,
    InputNumberControl,
    SelectControl
} from 'shared/components'
import { SearchOutlined, CloseOutlined } from '@ant-design/icons'
import { API, ReportsSearchModel } from 'api'
import { COL_RESPONSIVE } from './ReportsFilters.consts'
import { ROADS } from 'api/api.consts'
import { LabeledValue } from 'antd/lib/select'

/** Фильтры для таблицы отчетов */
export const ReportsFilters: React.FC<FiltersProps<ReportsSearchModel>> = React.memo(
    ({ onSetFilters }) => {
        const [form] = Form.useForm()
        const [dictionary, setDictionary] = useState<LabeledValue[]>([])

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

        const dictionaryFetch = useCallback(async () => {
            try {
                const { data } = await API.getDictionary(ROADS)

                setDictionary(data.map(normalizeDataForSelect))
            } catch (e) {
                console.log(e)
            }
        }, [])

        /**
         * Обработчик очистки формы фильтра
         */
        const handleClear = useCallback(() => {
            onSetFilters({})
            form.resetFields()
        }, [form, onSetFilters])

        useEffect(() => {
            dictionaryFetch()
        }, [dictionaryFetch])

        return (
            <Form form={form} onFinish={handleFinish}>
                <Row gutter={ROW_GUTTER}>
                    <Col {...COL_RESPONSIVE}>
                        <Form.Item
                            name="name"
                            label="Название"
                            {...COMMON_ITEM_OPTIONS}
                        >
                            <InputControl />
                        </Form.Item>
                    </Col>

                    <Col {...COL_RESPONSIVE}>
                        <Form.Item
                            name="created_date"
                            label="Дата создания"
                            {...COMMON_ITEM_OPTIONS}
                        >
                            <DatePickerControl/>
                        </Form.Item>
                    </Col>

                    <Col {...COL_RESPONSIVE}>
                        <Form.Item
                            name="road_name"
                            label="Объект отчета"
                            {...COMMON_ITEM_OPTIONS}
                        >
                            <SelectControl
                                values={dictionary}
                                allowClear
                                mode="multiple"
                            />
                        </Form.Item>
                    </Col>

                    <Col {...COL_RESPONSIVE}>
                        <Form.Item
                            name="rating"
                            label="Рейтинг"
                            {...COMMON_ITEM_OPTIONS}
                        >
                            <InputNumberControl/>
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