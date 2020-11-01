import React, { useCallback, useContext } from 'react'
import { DrawersContext, LoaderContext, SingleDrawerProps } from 'core/context'
import { Button, Drawer } from 'antd'
import { DrawerAdapterProps } from './DrawerAdapter.model'

export const DrawerAdapter: React.FC<DrawerAdapterProps> = React.memo(({
    haveButton,
    buttonOption,
    buttonText,
    haveDrawer,
    component: Component,
}) => {
    const { loaderState } = useContext(LoaderContext)
    const { drawerAdapterOptions, setDrawerAdapterOptions } = useContext(DrawersContext)
    console.log(drawerAdapterOptions)
    const closeDrawer = useCallback(
        () =>
            setDrawerAdapterOptions((prevState: SingleDrawerProps) => ({
                ...prevState,
                visible: false,
            })),
        [setDrawerAdapterOptions]
    )

    const showDrawer = useCallback(
        () =>
            setDrawerAdapterOptions((prevState: SingleDrawerProps) => ({
                ...prevState,
                visible: true,
            })),
        [setDrawerAdapterOptions]
    )

    const handleCancel = useCallback(() => {
        closeDrawer()
    }, [closeDrawer])

    return (
        <>
            {haveButton && (
                <Button {...buttonOption} onClick={showDrawer}>
                    {buttonText}
                </Button>
            )}

            {haveDrawer && Component && (
                <Drawer
                    onClose={handleCancel}
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    visible={drawerAdapterOptions?.visible}
                    {...drawerAdapterOptions}
                >
                    <Component/>
                </Drawer>
            )}
        </>
    )
})