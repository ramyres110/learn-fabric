class App4 {
    constructor() {
        this.canvas = null;
    }

    prepareCanvas() {
        // console.log('call prepareCanvas in object App');
        let rule = document.querySelector('#rule');
        const w = rule.offsetWidth;
        const h = 500;
        document.querySelectorAll('canvas').forEach(cv => {
            cv.width = w;
            cv.height = h;
        });
        if (this.canvas) {
            this.canvas.renderAll();
        }
    }

    init() {
        this.bw = 40;
        const self = this;
        this.prepareCanvas();
        this.canvas = new fabric.Canvas('cv4', {
            isDrawingMode: true,
            freeDrawingCursor: 'pointer'
        });

        this.changeColor('#000');
        this.changeShadow('rgba(0,0,0,0.3) 15px 15px 5px');
        this.changeWidth(this.bw);
        this.changeCap('round');
        this.changeJoin('round');

        this.canvas.on('mouse:up', function (options) {
            let r = parseInt(Math.random() * 255);
            let g = parseInt(Math.random() * 255);
            let b = parseInt(Math.random() * 255);
            let c = 'rgb(' + r + ',' + g + ',' + b + ')';
            self.changeColor(c);
        });

        this.drawRedRect();
    }

    selection(sel) {
        this.canvas.isDrawingMode = !sel;
        this.canvas.renderAll();
    }

    changeColor(color) {
        this.canvas.freeDrawingBrush.color = color;
    }

    changeShadow(shadow) {
        this.canvas.freeDrawingBrush.shadow = shadow;
    }

    changeCap(cap) {
        // "butt", "round", "square"
        this.canvas.freeDrawingBrush.strokeLineCap = cap;
    }

    changeJoin(join) {
        // (one of "bevel", "round", "miter") 
        this.canvas.freeDrawingBrush.strokeLineJoin = join;
    }

    changeWidth(width) {
        this.canvas.freeDrawingBrush.width = width;
        this.bw = width;
    }

    drawRedRect() {
        //draw
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 200,
            height: 200,
            hasBorders: true,
            borderColor: 'red',
            cornerColor: 'green',
            cornerSize: 6,
            centeredRotation: false,
            angle: 45
        })
        this.canvas.add(rect);
        return rect;
    }

    drawLockedRect() {
        //draw
        const rect = new fabric.Rect({
            left: 300,
            top: 100,
            fill: 'green',
            width: 200,
            height: 200,
            hasBorders: false,
            hasControls: false,
            lockMovementX: false,
            lockMovementY: true,
            lockRotation: true,
            lockScaling: true,
            selectable: false,
            stroke: 'red',
            strokeDashArray: [15, 5],
            strokeWidth: 10
        })
        this.canvas.add(rect);
        return rect;
    }

    drawCircleRealClick() {
        let circle = new fabric.Circle({
            left: 500,
            top: 100,
            radius: 50,
            fill: 'yellow',
            perPixelTargetFind: true
        })
        this.canvas.add(circle);
    }

    customizeSelection() {
        this.canvas.selectionColor = 'rgba(0,255,0,0.3)';
        this.canvas.selectionBorderColor = 'red';
        this.canvas.selectionLineWidth = 5;
        this.canvas.selectionDashArray = [10, 5];
    }

    setBackgoundColor(color) {
        this.canvas.backgroundColor = color;
        this.canvas.renderAll();
    }
    setBackgroundImage() {
        this.canvas.setBackgroundImage('/img/men-in-boxes-500x300.jpg', this.canvas.renderAll.bind(this.canvas));
        this.canvas.renderAll();
    }
    setForegroundImage() {
        this.canvas.setOverlayImage('/img/jail_PNG39.png', this.canvas.renderAll.bind(this.canvas));
        this.canvas.renderAll();
    }
}



document.addEventListener('DOMContentLoaded', function () {
    const app4 = new App4();
    app4.init();
    app4.selection(true);
    app4.drawLockedRect();
    app4.customizeSelection();
    app4.drawCircleRealClick();
    app4.setBackgoundColor('teal');
    app4.setBackgroundImage();
    app4.setForegroundImage();
    document.querySelector('#inpSelection').addEventListener('change', (evt) => {
        app4.selection(evt.target.checked);
    })
});
