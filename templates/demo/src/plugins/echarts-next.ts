import { loadStyle, LineSimple, PieSimple, BarySimple, BaryRank, BaryRank2 } from 'echarts-next'

import style from './echarts-next/echarts-style'

export default (app: any) => {
    loadStyle(style)

    app.use(LineSimple)
    app.use(PieSimple)
    app.use(BarySimple)
    app.use(BaryRank)
    app.use(BaryRank2)
}
