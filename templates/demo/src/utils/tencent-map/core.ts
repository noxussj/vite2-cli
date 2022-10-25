import { getImageInfo } from '../image'

const TMap = (window as any).TMap

/**
 * 获取图标尺寸
 */
export const getMarkersInfo = (points: any[]) => {
    const p: any[] = []

    points.forEach((x: any, i: number) => {
        p.push(
            new Promise((resolve) => {
                const info = getImageInfo(x.icon)

                info.then((res: any) => {
                    x.width = res.width
                    x.height = res.height

                    resolve(x)
                })
            })
        )
    })

    return Promise.all(p)
}

/**
 * 获取 styles
 */
export const getStyles = (points: any) => {
    const styles: any = {}

    points.forEach((x: any, i: number) => {
        styles['style-' + i] = new TMap.MarkerStyle({
            width: x.width,
            height: x.height,
            anchor: { x: x.width / 2, y: x.height / 2 },
            src: x.icon
        })
    })

    return styles
}

/**
 * 获取 geometries
 */
export const getGeometries = (points: any) => {
    const geometries: any = []

    points.forEach((x: any, i: number) => {
        const item = {
            ...x,
            id: x.id,
            styleId: 'style-' + i,
            position: new TMap.LatLng(x.lat, x.lng)
        }

        geometries.push(item)
    })

    return geometries
}

/**
 * 获取 bounds
 */
export const getBounds = (points: any) => {
    const bounds = new TMap.LatLngBounds()

    points.forEach((x: any) => {
        const position = new TMap.LatLng(x.lat, x.lng)

        if (bounds.isEmpty() || !bounds.contains(position)) {
            bounds.extend(position)
        }
    })

    return bounds
}

/**
 * 获取屏幕坐标
 */
export const getScreenAxis = ({ map, dom, latlng }: any) => {
    const pixel = map.projectToContainer(latlng)

    const left = pixel.getX() - dom.clientWidth / 2 + 'px'
    const top = pixel.getY() - dom.clientHeight + 'px'

    return { left, top }
}
