class App3 {
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
        this.prepareCanvas();
        this.canvas = new fabric.Canvas('cv3', {});
        this.drawGroup();
        this.drawGroup2();
        this.drawGroupOfCircles();
        this.drawGroupOfImages();

        this.drawElementOnGroup(this.drawGroup());
        this.drawPoint();
        this.drawLabeledRect()
    }

    drawGroup() {
        const circle = new fabric.Circle({
            radius: 100,
            fill: '#eef',
            scaleY: 0.5
        });

        const text = new fabric.Text('hello world', {
            fontSize: 30,
            left: 25,
            top: 30,
        });

        const group = new fabric.Group([circle, text], {
            left: 100,
            top: 100,
            angle: -10
        });

        this.canvas.add(group);
        return group;
    }

    drawGroup2() {
        const circle = new fabric.Circle({
            radius: 100,
            fill: '#eef',
            scaleY: 0.5
        });

        const text = new fabric.Text('hello world', {
            fontSize: 30,
            left: 25,
            top: 30,
        });

        const group = new fabric.Group([circle, text], {
            left: 100,
            top: 250,
            angle: -10
        });

        this.canvas.add(group);

        group.item(1).set({
            text: 'trololo',
            fill: 'white'
        });

        group.item(0).set({ fill: 'red' });
    }

    drawGroupOfCircles() {
        const circle1 = new fabric.Circle({
            radius: 50,
            fill: 'green',
            left: 0
        });
        const circle2 = new fabric.Circle({
            radius: 50,
            fill: 'yellow',
            top: 110
        });
        const circle3 = new fabric.Circle({
            radius: 50,
            fill: 'red',
            top: 220
        });

        const group = new fabric.Group([circle1, circle2, circle3], {
            left: 1000,
            top: 10,
        });

        this.canvas.add(group);
    }

    drawGroupOfImages() {
        const canvas = this.canvas;
        fabric.Image.fromURL('/img/men-in-boxes-500x300.jpg', function (img) {
            const img1 = img.scale(0.5).set({ left: 100, top: 100 });

            fabric.Image.fromURL('/img/men-in-boxes-500x300.jpg', function (img) {
                const img2 = img.scale(0.5).set({ left: 175, top: 175 });

                fabric.Image.fromURL('/img/men-in-boxes-500x300.jpg', function (img) {
                    const img3 = img.scale(0.5).set({ left: 250, top: 250 });

                    const group = new fabric.Group([img1, img2, img3], { left: 1200, top: 0 });
                    canvas.add(group)
                });
            });
        });
    }

    drawElementOnGroup(group) {
        group.set({ left: 1100, top: 300 })
        // Para adicionar um retângulo no centro de um grupo (left=0, top=0):
        group.add(new fabric.Rect({
            width: 50,
            height: 50,
            fill: 'red'
        }));
        // Para adicionar um retângulo deslocado 100px do centro de um grupo:
        group.add(new fabric.Rect({
            width: 50,
            height: 50,
            fill: 'teal',
            left: 50,
            top: 50
        }));
        // Para adicionar um retângulo no centro do grupo E atualizar as dimensões do grupo:
        group.addWithUpdate(new fabric.Rect({
            width: 50,
            height: 50,
            fill: 'green',
            left: group.left,
            top: group.top
        }));
        // Para adicionar um retângulo deslocado 100px do centro do grupo E atualizar as dimensões do grupo:
        group.addWithUpdate(new fabric.Rect({
            width: 50,
            height: 50,
            fill: 'cyan',
            left: group.left + 100,
            top: group.top + 100
        }));
    }

    getSerializedToObject() {
        return this.canvas.toObject();
    }

    getSerializedToJson() {
        return this.canvas.toJSON();
    }

    getSerializedWithJSON() {
        return JSON.stringify(this.canvas);
    }

    getDataURL() {
        const png = this.canvas.toDataURL('png');
        return png;
    }

    loadJSON() {
        const canvas = this.canvas;
        this.request('/data/cv1.json', (result) => {
            canvas.loadFromJSON(result);
        });
    }

    loadSVG() {
        const canvas = this.canvas;
        this.request('/data/cv1.svg', (result) => {
            fabric.loadSVGFromString(result, function (objects, options) {
                var obj = fabric.util.groupSVGElements(objects, options);
                canvas.add(obj).renderAll();
            });
        });
    }

    loadURLSVG() {
        const canvas = this.canvas;
        fabric.loadSVGFromURL('/data/cv1.svg', function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).renderAll();
        });
    }

    loadBase64() {
        const canvas = this.canvas;
        this.request('/data/cv1.base64', (result) => {
            let img = new Image();
            img.onload = () => {
                var imgInstance = new fabric.Image(img, {
                    left: 0,
                    top: 0
                });
                canvas.add(imgInstance);
            }
            img.src = result;
        });
    }

    //subclass
    drawPoint() {
        var Point = fabric.util.createClass({
            initialize: function (x, y) {
                this.x = x || 0;
                this.y = y || 0;
            },
            toString: function () {
                return this.x + '/' + this.y;
            }
        });
        var point = new Point(10, 20);
        point.x; // 10
        point.y; // 20
        console.log(point.toString()); // "10/20"
        var ColoredPoint = fabric.util.createClass(Point, {
            initialize: function (x, y, color) {
                this.callSuper('initialize', x, y);
                this.color = color || '#000';
            },
            toString: function () {
                return this.callSuper('toString') + ' (color: ' + this.color + ')';
            }
        });
        var redPoint = new ColoredPoint(15, 33, '#f55');
        redPoint.x; // 15
        redPoint.y; // 33
        redPoint.color; // "#f55"
        console.log(redPoint.toString()); "15/35 (color: #f55)"
    }

    drawLabeledRect() {
        var LabeledRect = fabric.util.createClass(fabric.Rect, {
            type: 'labeledRect',
            initialize: function (options) {
                options || (options = {});
                this.callSuper('initialize', options);
                this.set({ width: 100, height: 50 });
                this.set('label', options.label || '');
            },
            toObject: function () {
                return fabric.util.object.extend(this.callSuper('toObject'), {
                    label: this.get('label')
                });
            },
            _render: function (ctx) {
                this.callSuper('_render', ctx);
                ctx.font = this.labelFont;
                ctx.fillStyle = this.labelFill;
                ctx.fillText(this.label, -this.width / 2, -this.height / 2 + 20);
            }
        });
        var labeledRect = new LabeledRect({
            left: 250,
            top: 100,
            label: 'test',
            fill: '#faa'
        });
        this.canvas.add(labeledRect);
        labeledRect.set({
            label: 'trololo',
            labelFill: '#000',
            labelFont: 'tahoma',
            fill: '#aaf',
            rx: 10,
            ry: 10
        });
    }
}



document.addEventListener('DOMContentLoaded', function () {
    const app3 = new App3();
    app3.init();
    // setTimeout(() => {
    //     console.log(app3.getSerializedToObject());
    //     console.log('=============');
    //     console.log(app3.getSerializedToJson());
    //     console.log('=============');
    //     console.log(app3.getSerializedWithJSON());
    // }, 1000);
});
