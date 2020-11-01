import React, { useCallback, useEffect, useState } from 'react'
import { PageContent } from 'core/components'
import { API } from 'api'

export const Main: React.FC = React.memo(() => {
    const [data, setData] = useState()
    const [metro] = useState('Запрос с фронта закомментирован')

    const fetchData = useCallback(async () => {
        try {
            const response = await API.getHelloWorld()
            //const responseMetro = await API.getMetro()
            console.log(response.data)
            setData(response.data.value)
            //setMetro(responseMetro.data.value)
        } catch (e) {
            console.log(e)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <PageContent>
            {`Ответ с сервера: ${data}`}
            <br/>
            {`Ответ с сервера метро: ${metro}`}
        </PageContent>
    )
})

