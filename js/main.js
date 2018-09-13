class App {

    constructor() {
        console.log('Object App instanciated');
        this.fabric = null;
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
        if (this.fabric) {
            this.fabric.renderAll();
        }
    }

    init() {
        console.log('call init in object App');
        this.prepareCanvas();
        console.log('Instanciate an fabric.Canvas');

        this.fabric = new fabric.Canvas('cv1', this.canvasOptions());

        this.drawRedRect1();
        this.drawRedRect2();
        this.drawRedRect3();
        this.drawGreenCircle();
        this.drawBlueTriangle();
        this.drawRedRect4();
        this.heritage();
        this.canvasGetObjects();
        this.drawImage();
        this.drawImageFromURL();
        this.drawPath();
        this.drawModifyPath();
        this.drawComplexPath();
    }

    drawRedRect1() {
        //draw
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        })
        this.fabric.add(rect);
        return rect;
    }

    drawRedRect2() {
        //draw
        const rect = new fabric.Rect({
            left: 200,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20,
            angle: 45
        })
        this.fabric.add(rect);
        return rect;
    }

    drawRedRect3() {
        //draw
        const rect = new fabric.Rect({
            left: 300,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20,
            angle: 45
        })
        this.fabric.add(rect);
        rect.set({ left: 20, top: 50 });

        this.fabric.renderAll();

        rect.set('fill', 'red');
        rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
        rect.set({ width: 100, height: 200, fill: '#f55', opacity: 0.7 });
        rect.set('angle', 15).set('flipY', true);

        return rect;
    }

    drawRedRect4() {
        //draw
        const rect = new fabric.Rect();
        // Opções padrão
        /*
        rect.getWidth(); // 0
        rect.getHeight(); // 0
        rect.getLeft(); // 0
        rect.getTop(); // 0
        rect.getFill(); // rgb(0,0,0)
        rect.getStroke(); // null
        rect.getOpacity(); // 1
        */
        this.fabric.add(rect);
        return rect;
    }

    drawGreenCircle() {
        const circle = new fabric.Circle({
            radius: 50,
            fill: 'green',
            left: 350,
            top: 50
        });
        this.fabric.add(circle);
        return circle;
    }

    drawBlueTriangle() {
        const triangle = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: 'blue',
            left: 250,
            top: 50
        });
        this.fabric.add(triangle);
        return triangle;
    }

    heritage() {
        fabric.Object.prototype.getAngleInRadians = function () {
            return this.angle / 180 * Math.PI;
        };

        var rect = new fabric.Rect({ angle: 45 });
        console.log(rect.getAngleInRadians()); // 0.785...

        var circle = new fabric.Circle({ angle: 30, radius: 10 });
        console.log(circle.getAngleInRadians()); // 0.523...

        console.log(circle instanceof fabric.Circle); // true
        console.log(circle instanceof fabric.Object); // true
    }

    canvasGetObjects() {
        let objs = this.fabric.getObjects();
        console.log(objs);
        return objs;
    }

    canvasOptions() {
        return {
            backgroundColor: 'rgb(200,200,200)',
            selectionColor: 'blue',
            selectionLineWidth: 2,
            selection: false
        }
    }

    drawImage() {
        const self = this;
        const img = new Image();
        img.src = 'http://leanmagazine.net/wordpress/wp-content/uploads/2012/01/men-in-boxes-500x300.jpg';
        img.onload = () => {
            let imgInstance = new fabric.Image(img, {
                left: 1000,
                top: 0,
                angle: 30,
                opacity: 0.85
            })
            self.fabric.add(imgInstance)
        }
    }

    drawImageFromURL() {
        const self = this;
        let src = 'http://leanmagazine.net/wordpress/wp-content/uploads/2012/01/men-in-boxes-500x300.jpg';
        fabric.Image.fromURL(src, (oImg) => {
            oImg.set({ left: 1000, top: 100 })
            oImg.filters.push(new fabric.Image.filters.Grayscale());
            oImg.filters.push(new fabric.Image.filters.Sepia());
            // oImg.applyFilters(self.fabric.renderAll.bind(self.fabric));
            // oImg.applyFilters(self.fabric.renderAll.bind(self.fabric));
            self.fabric.add(oImg);
        })
    }

    drawPath() {
        const path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
        path.set({ left: 700, top: 50 });
        this.fabric.add(path)
    }

    drawModifyPath() {
        const path = new fabric.Path('M 0 0 L 300 100 L 200 300 z');
        path.set({ fill: 'red', stroke: 'green', opacity: 0.5 });
        this.fabric.add(path)
    }

    drawComplexPath() {
        const path = new fabric.Path('M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
        c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
        0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
        c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
        -2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
        12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
        -20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z');
        this.fabric.add(path.set({ left: 900, top: 20 }));
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const app = new App();
    app.init();
    window.onresize = () => {
        app.prepareCanvas();
    }
});
