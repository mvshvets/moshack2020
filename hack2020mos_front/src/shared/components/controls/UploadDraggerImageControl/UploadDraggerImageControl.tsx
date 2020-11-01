import './UploadDraggerImageControl.scss'

import React, { useCallback, useState } from 'react'
import { Button, Upload } from 'antd'
import { UPLOAD_IMAGE_PLACEHOLDER_DEFAULT } from 'shared/consts'
import { UploadChangeParam } from 'antd/lib/upload/interface'

import { UploadDraggerImageControlProps } from './UploadDraggerImageControl.model'
import { PictureOutlined, CloseSquareFilled } from '@ant-design/icons'

/**
 * Декоратор для `Upload.Dragger` от `antd`
 */
export const UploadDraggerImageControl: React.FC<UploadDraggerImageControlProps> = React.memo(
    ({ placeholder, onChange, fileList, ...restProps }) => {
        const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(
            fileList?.[0].url || null
        )

        /**
         * Обновление значения во внешней форме
         * @param value - значение для формы
         */
        const triggerChange = useCallback(
            (value) => {
                if (onChange) onChange(value)
            },
            [onChange]
        )

        /**
         * Превью загружаемого изображения
         * @param info - информация о изображении
         */
        const handleChange = useCallback(
            (info: UploadChangeParam) => {
                if (info.file?.originFileObj) {
                    const reader = new FileReader()

                    reader.addEventListener('load', () => {
                        setImageUrl(reader.result)
                    })
                    reader.readAsDataURL(info.file.originFileObj as Blob)

                    triggerChange(info)
                }
            },
            [triggerChange]
        )

        /**
         * Обработчик удаления картинки
         */
        const handleRemoveImg = useCallback(
            (e) => {
                e.stopPropagation()
                setImageUrl(null)
                triggerChange(undefined)
            },
            [triggerChange]
        )

        return (
            <div className="upload-dragger-control">
                <Upload.Dragger
                    accept="image/*"
                    showUploadList={false}
                    fileList={fileList}
                    onChange={handleChange}
                    {...restProps}
                >
                    {imageUrl ? (
                        <>
                            <Button
                                type="text"
                                icon={
                                    <CloseSquareFilled/>
                                }
                                onClick={handleRemoveImg}
                            />
                            <img src={imageUrl as string} alt="Изображение" />
                        </>
                    ) : (
                        <>
                            <PictureOutlined className="img-upload"/>
                            <span>
                                {placeholder ||
                                    UPLOAD_IMAGE_PLACEHOLDER_DEFAULT}
                            </span>
                        </>
                    )}
                </Upload.Dragger>
            </div>
        )
    }
)
