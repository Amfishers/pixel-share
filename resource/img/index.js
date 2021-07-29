/**
 * Created by Fisher on 2021/07/30.
 */

import Img2char from '../img2char.js'

class CharPicture extends Img2char {
    constructor () {
        super()

        this.img = new Image()
        this.show = document.getElementById("show") // 显示 pre 字符的容器
        this.showBtn = document.getElementById('showBtn') // 点击展示按钮
        this.canvas = document.createElement("canvas") // 新建 canvas 用于
        this.charCanvas = document.getElementById('charCanvas') // 显示结果的 canvas 容器 
        this.sidebarImg = document.querySelector('.sidebar-img') // 侧边栏显示原图的容齐
        this.uploadFile = document.getElementById('uploadFile') // 上传 input
        this.ctx = this.canvas.getContext('2d')
        this.charCtx = this.charCanvas.getContext('2d')

        this.eventHandler()

    }

    eventHandler() {
        this.fileChangeHandler()
        this.viewStyleSwitch()
    }

    // 显示方式切换
    viewStyleSwitch() {
        const showPre = document.getElementById('showPre')
        const showCanvas = document.getElementById('showCanvas')
        const panelPre = document.querySelector('.panel-pre')
        const panelCanvas = document.querySelector('.panel-canvas')
        showPre.onclick = function () {
            panelPre.style.display = 'block'
            panelCanvas.style.display = 'none'
        }
        showCanvas.onclick = function () {
            panelPre.style.display = 'none'
            panelCanvas.style.display = 'block'
        }
    }

    fileChangeHandler() {
        this.showBtn.addEventListener('click', () => {
            const { files } = this.uploadFile
            const {
                canvas,
                img,
                sidebarImg,
                show,
                ctx,
                charCanvas,
            } = this
            const file = files && files[0]
            if (!file) {
                return alert("请选择展示文件")
            }
            const url = URL.createObjectURL(file)
            img.src = url
            img.onload = () => {
                const _this = this
                _this.clearFill()
                const {
                    width: imgWidth,
                    height: imgHeight
                } = img
                
                charCanvas.width = canvas.width = imgWidth
                charCanvas.height = canvas.height = imgHeight

                // 画上字符
                ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
                show.innerText = _this.toChars(ctx, imgWidth, imgHeight, (ch, output, pos_x, pos_y) => {
                    _this.charCtx.fillText(ch, pos_x, pos_y)
                })

                // 在页面插入图片
                // 如果直接 appendChild 会导致图片的尺寸变成 sidebarImg 的大小
                sidebarImg.innerHTML = ''
                sidebarImg.appendChild(img.cloneNode(true))
            }

        })
    }

    // 清空画布
    clearFill() {
        const {
            width,
            height
        } = this.img
        this.show.innerHTML = ''
        this.charCtx.clearRect(0, 0, width, height)
    }
}

new CharPicture()
