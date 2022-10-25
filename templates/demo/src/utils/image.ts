export const getImageInfo = (url: string) => {
    return new Promise((resolve) => {
        const image: any = document.createElement('img')

        image.src = url

        image.style = 'opacity: 0;position: absolute;left: -999999px; top: -999999px;'

        image.onload = () => {
            resolve({ width: image.width, height: image.height })
        }

        document.body.appendChild(image)
    })
}
