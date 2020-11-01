import './MapPopup.scss'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { DrawersContext, LoaderContext } from 'core/context'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons/lib'
import { ObjectDataModels } from './MapPopup.models'

export const MapPopup: React.FC = React.memo(() => {
    const { setLoaderState } = useContext(LoaderContext)
    const { drawerAdapterOptions, setDrawerAdapterOptions } = useContext(DrawersContext)
    const [objectData, setObjectData] = useState<ObjectDataModels>()

    const handleClose = useCallback(() => {
        setDrawerAdapterOptions((prevState) => ({
            ...prevState,
            visible: false
        }))
    }, [setDrawerAdapterOptions])

    const objectFetch = useCallback(async () => {
        try {
            setLoaderState(true)
            console.log(drawerAdapterOptions.id)

            setObjectData({
                name: 'Кудринская площадь',
                category: 'Период эксплуатации: 1-3 года',
                commonRating: 3,
                carriageway: {
                    rating: 2
                },
                sidewalk: {
                    rating: 3
                },
                roadside: {
                    rating: 5
                }

            })
        } catch (e) {
            console.log(e)
        } finally {
            setLoaderState(false)
        }
    }, [drawerAdapterOptions, setLoaderState])

    useEffect(() => {
        objectFetch()
    }, [objectFetch])

    return (
        <section
            className="map-popup"
            style={{ visibility: drawerAdapterOptions.visible ? 'visible' : 'hidden' }}
        >
            <header>
                <Button type="link" onClick={handleClose} icon={<CloseOutlined/>}/>
            </header>
            {objectData && (
                <>
                <div className="map-popup__data">
                    <h1>{objectData.name}</h1>
                    <h4>{objectData.category}</h4>
                    <section>
                        <b>Общий рейтинг <span>{objectData.commonRating}/5</span></b>
                        <div>Проезжая часть - {objectData.carriageway.rating}</div>
                        <div>Тротуар - {objectData.sidewalk.rating}</div>
                        <div>Бордюр - {objectData.roadside.rating}</div>
                    </section>
                </div>
                    <div className="map-popup__info">
                        <h4>Статус проведения работ</h4>
                        <div>Вид работ: ремонтные</div>
                        <div>Статус работ: не начаты</div>
                    </div>
                </>
            )}
        </section>
    )
})