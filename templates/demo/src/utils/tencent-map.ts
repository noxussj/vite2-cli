import { getMarkersInfo, getStyles, getGeometries, getBounds } from './tencent-map/core'

const TMap = (window as any).TMap

interface Options {
    zoom: number
    center: number[]
}

/**
 * 二次封装地图类
 */
export class MapTools {
    instance: any
    instanceMarker: any
    layerWindowDOM: any
    mouseClickLatlng: any
    styles: any
    geometry: any

    constructor(dom: any, options: Options) {
        /**
         * 默认地图配置
         */
        const defaultOptions = {
            rotation: 0,
            pitch: 50,
            zoom: options.zoom,
            center: new TMap.LatLng(...options.center),
            mapStyleId: 'style2',
            showControl: false
        }

        /**
         * 初始化数据
         */
        this.layerWindowDOM = null // 弹窗 dom
        this.mouseClickLatlng = null // 鼠标点击位置

        /**
         * 初始化实例
         */
        this.instance = new TMap.Map(dom, defaultOptions)
        this.instanceMarker = new TMap.MultiMarker({
            map: this.instance,
            styles: [],
            geometries: []
        })

        /**
         * 初始化事件
         */
        this.instance.on('click', () => {
            if (this.layerWindowDOM) {
                this.layerWindowDOM.style.display = 'none'
                this.mouseClickLatlng = null
                this.resetMarkerStyle()
            }
        })

        this.instance.on('pan', () => {
            if (this.layerWindowDOM && this.mouseClickLatlng) {
                this.layerWindowDOM.style.display = 'block'
            } else {
                this.resetMarkerStyle()
            }
        })

        this.instance.on('zoom', () => {
            if (this.layerWindowDOM) {
                this.layerWindowDOM.style.display = 'none'
                this.resetMarkerStyle()
            }
        })
    }

    /**
     * 添加标注图层
     */
    async addLayerMarkers(p: string[], cb: Function) {
        const ids = this.instanceMarker.geometries.map((x: any) => x.id)
        this.instanceMarker.remove(ids)

        /**
         * 添加图层
         */
        const points = await getMarkersInfo(p)

        const styles = getStyles(points)

        const geometries = getGeometries(points)

        const bounds = getBounds(points)

        this.instanceMarker.setStyles(styles)
        this.instanceMarker.setGeometries(geometries)

        this.instance.fitBounds(bounds, {
            padding: 100 // 自适应边距
        })

        this.styles = styles

        /**
         * 注册标注点击事件
         */
        this.instanceMarker.on('click', (e: any) => {
            if (this.geometry && this.geometry.id === e.geometry.id) return

            setTimeout(() => {
                this.mouseClickLatlng = e.geometry.position

                cb(e.geometry)
            }, 0)
        })
    }

    /**
     * 添加弹窗图层
     */
    addLayerWindow(dom: any, geometry: any) {
        /**
         * 存储信息
         */
        this.layerWindowDOM = dom

        /**
         * 设置弹窗定位
         */
        this.layerWindowDOM.style.display = 'block'

        /**
         * 放大图标
         */
        this.instanceMarker.remove(geometry.id)
        this.styles[geometry.styleId].width *= 1.2
        this.styles[geometry.styleId].height *= 1.2
        this.styles[geometry.styleId].anchor.x *= 1.2
        this.styles[geometry.styleId].anchor.y *= 1.2
        this.instanceMarker.setStyles(this.styles)
        this.instanceMarker.add(geometry)
        this.geometry = geometry
    }

    /**
     * 还原图标
     */
    resetMarkerStyle() {
        if (this.geometry) {
            this.instanceMarker.remove(this.geometry.id)
            this.styles[this.geometry.styleId].width /= 1.2
            this.styles[this.geometry.styleId].height /= 1.2
            this.styles[this.geometry.styleId].anchor.x /= 1.2
            this.styles[this.geometry.styleId].anchor.y /= 1.2
            this.instanceMarker.setStyles(this.styles)
            this.instanceMarker.add(this.geometry)
            this.geometry = null
        }
    }
}
