import './MultiSelectControl.scss'

import classNames from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, TreeSelect } from 'antd'
import { DataNode } from 'rc-tree-select/lib/interface.d'
import { ROUTE_NAMES } from 'routing'
import { SELECT_SEARCH_PLACEHOLDER_DEFAULT } from 'shared/consts'

import {
    MultiSelectControlProps,
    TagsType
} from './MultiSelectControlProps.model'
import { CloseOutlined, EyeOutlined } from '@ant-design/icons'

/**
 * Декоратор для `TreeSelect` от `antd`
 * Использовать в случае, если нужен множественный выбор.
 */
export const MultiSelectControl: React.FC<MultiSelectControlProps<number[]>> = React.memo((props) => {
    const {
        onChange,
        value,
        treeData = [],
        tagsType,
        placeholder,
        selectAll,
        addonAfter,
        form,
        dependencies,
        ...additionalProps
    } = props

    const [selectedOptions, setSelectedOptions] = useState<number[]>()

    /**
     * Вычесленное значение для `TreeSelect`
     */
    const calculatedValue = useMemo(() => {
        if (value === null) return undefined

        return value || selectedOptions
    }, [selectedOptions, value])

    /**
     * Обновить значение в стейте и внешней форме
     */
    const triggerChanges = useCallback(
        (value?: number[]) => {
            onChange?.(value)
            setSelectedOptions(value)
        },
        [onChange]
    )

    /**
     * Функция возвращает label
     * @param value - значение по которому необходимо найти label
     */
    const getTagLabel = useCallback(
        (value: number) => {
            const searchLabel = (el: DataNode): unknown =>
                el.value === value || el.children?.find(searchLabel)

            return treeData?.find(searchLabel)?.title
        },
        [treeData]
    )

    /**
     * Обработчик изменения значения TreeSelect
     */
    const handleSelectChange = useCallback(
        (numbers: number[]) => {
            triggerChanges(numbers)
        },
        [triggerChanges]
    )

    /**
     * Обработчик пункта "Выбрать все/снять выделение" в TreeSelect
     */
    const handleSelectAllChange = useCallback(() => {
        calculatedValue?.length
            ? handleSelectChange([])
            : handleSelectChange(
            treeData?.map((el) => Number(el.value)).filter(Boolean)
            )
    }, [calculatedValue, handleSelectChange, treeData])

    /**
     * Обработчик для удаления выбранного пункта меню
     * @param id - id удаляемого пункта меню
     */
    const handleDeselectOption = useCallback(
        (id: number) => {
            if (calculatedValue) {
                triggerChanges(calculatedValue.filter((el) => el !== id))
            }
        },
        [calculatedValue, triggerChanges]
    )

    /**
     * Рендер списка выбранных пунктов меню для типа "Cloud"
     */
    const tagsCloud = useMemo(() => {
        return calculatedValue?.map((el: number) => (
            <span
                className="multi-select-tags__item"
                key={el}
                onClick={() =>
                    !additionalProps.disabled && handleDeselectOption(el)
                }
            >
                <span>{getTagLabel(el)}</span>
                {!additionalProps.disabled && <i/>}
            </span>
        ))
    }, [
        calculatedValue,
        getTagLabel,
        handleDeselectOption,
        additionalProps.disabled
    ])

    /**
     * Кнопка удаление выбранного пункта из списка
     * @param id - номер пункта
     */
    const renderTagsListDeleteBtn = useCallback(
        (id: number) => (
            <Button
                type="link"
                icon={
                    <CloseOutlined className="multi-select-list__btn-deselect"/>
                }
                onClick={() => handleDeselectOption(id)}
            />
        ),
        [handleDeselectOption]
    )

    /**
     * Рендер списка выбранных пунктов меню для типа "List"
     */
    const tagsList = useMemo(
        () =>
            calculatedValue?.map((el) => {
                return (
                    <div key={el} className="multi-select-list__item">
                        <div>{getTagLabel(el)}</div>
                        {renderTagsListDeleteBtn(el)}
                    </div>
                )
            }),
        [calculatedValue, getTagLabel, renderTagsListDeleteBtn]
    )

    /**
     * Рендер списка выбранных пунктов меню для типа "ListView"
     */
    const tagsListView = useMemo(
        () =>
            calculatedValue?.map((el) => {
                return (
                    <div key={el} className="multi-select-list__item">
                        <div>{getTagLabel(el)}</div>
                        <div>
                            {renderTagsListDeleteBtn(el)}
                            <a
                                href={`${ROUTE_NAMES.QUESTIONNAIRE_TEMPLATES_EDIT}/${el}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <EyeOutlined/>
                            </a>
                        </div>
                    </div>
                )
            }),
        [calculatedValue, getTagLabel, renderTagsListDeleteBtn]
    )

    /**
     * Рендер пункта "Выбрать все/снять выделение"
     */
    const renderMenuItemSelectAll = useMemo(() => {
        return (
            <span className="select-all-option" onClick={handleSelectAllChange}>
                {calculatedValue?.length ? 'Снять выделение' : 'Выбрать все'}
            </span>
        )
    }, [handleSelectAllChange, calculatedValue])

    /**
     * Возвращает дерево данных для селекта в зависимости от флага selectAll
     * @param selectAll - определяет наличие пункта "Выбрать все" в дереве данных
     * @return
     */
    const getTreeData = useCallback(
        (selectAll?: boolean) => {
            if (selectAll)
                return [
                    {
                        title: renderMenuItemSelectAll,
                        disableCheckbox: true,
                        disabled: true,
                        key: 'all'
                    },
                    ...treeData
                ]

            return treeData
        },
        [renderMenuItemSelectAll, treeData]
    )

    const selectClasses = useMemo(
        () =>
            classNames('form-control', 'multi-select-control', {
                'multi-select-control_has-tags-cloud': Boolean(tagsType)
            }),
        [tagsType]
    )

    return (
        <div className={selectClasses}>
            <div className={addonAfter ? 'multi-select-addon-after' : ''}>
                <TreeSelect
                    dropdownClassName={classNames(
                        'multi-select-control__dropdown',
                        {
                            'multi-select-control__dropdown_select-all': selectAll
                        }
                    )}
                    treeNodeFilterProp="title"
                    treeData={getTreeData(selectAll)}
                    showArrow={true}
                    onChange={handleSelectChange}
                    value={calculatedValue}
                    placeholder={
                        tagsType
                            ? ''
                            : placeholder || SELECT_SEARCH_PLACEHOLDER_DEFAULT
                    }
                    treeCheckable={true}
                    showCheckedStrategy="SHOW_PARENT"
                    {...additionalProps}
                />
                {addonAfter && (
                    <div className="addon-after-content">{addonAfter}</div>
                )}
            </div>
            {tagsCloud && tagsType === TagsType.Cloud && (
                <div className="multi-select-tags">{tagsCloud}</div>
            )}
            {tagsList && tagsType === TagsType.List && (
                <div className="multi-select-list">{tagsList}</div>
            )}
            {tagsListView && tagsType === TagsType.ListView && (
                <div className="multi-select-list-view">{tagsListView}</div>
            )}
        </div>
    )
})
