class App2 {
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
        // custom filterImageGray
        // WRONG
        fabric.Image.filters.Redify = fabric.util.createClass(fabric.Image.filters.BaseFilter, {
            type: 'Redify',
            applyTo: function (canvasEl) {
                console.log(canvasEl);
                let context = canvasEl.targetCanvas.getContext('2d');
                let imageData = context.getImageData(0, 0, canvasEl.targetCanvas.width, canvasEl.targetCanvas.height);
                let data = imageData.data;
                for (var i = 0, len = data.length; i < len; i += 4) {
                    data[i] = 250;
                    data[i + 1] = 0;
                    data[i + 2] = 0;
                }
                context.putImageData(imageData, 0, 0);
            },
        });
        fabric.Image.filters.Redify.fromObject = function (object) {
            return new fabric.Image.filters.Redify(object);
        };
        //
        this.prepareCanvas();
        this.canvas = new fabric.Canvas('cv2', {});
        this.canvas.on('mouse:down', function (options) {
            if (options.target) {
                console.log('an object was clicked! ', options.target.type);
            }
        });

        this.animateRect();
        this.filterImageGray();
        this.filterImageSepia();
        this.filterImageMult();
        this.filterImageMy();
        this.getColors();
        this.drawGradientCircle();
        this.drawText();
    }

    animateRect() {
        const rect = new fabric.Rect({
            left: 100,
            top: 10,
            fill: 'red',
            width: 50,
            height: 50,
        })
        this.canvas.add(rect);
        const self = this;
        rect.animate('angle', 45, {
            onChange: self.canvas.renderAll.bind(self.canvas),
            duration: 2000,
            easing: fabric.util.ease.easeOutBounce
        });
        rect.animate('left', '1000', {
            onChange: self.canvas.renderAll.bind(self.canvas),
            duration: 2000,
            easing: fabric.util.ease.easeInElastic,
            onComplete: () => {
                rect.animate('angle', '0', {
                    onChange: self.canvas.renderAll.bind(self.canvas),
                    duration: 1000,
                    easing: fabric.util.ease.easeInBack
                });
            }
        });
    }

    filterImageGray() {
        const self = this;
        let src = '/img/men-in-boxes-500x300.jpg';
        fabric.Image.fromURL(src, (img) => {
            img.set({ top: 100, scaleY: 0.5, scaleX: 0.5 })
            const f_gray = new fabric.Image.filters.Grayscale();
            img.filters.push(f_gray);
            img.applyFilters();
            self.canvas.add(img);
        })
    }

    filterImageSepia() {
        const self = this;
        let src = '/img/men-in-boxes-500x300.jpg';
        fabric.Image.fromURL(src, (img) => {
            img.set({ top: 100, scaleY: 0.5, scaleX: 0.5, left: 250 })
            const f_sepia = new fabric.Image.filters.Sepia();
            img.filters.push(f_sepia);
            img.applyFilters();
            self.canvas.add(img);
        })
    }

    filterImageMult() {
        const self = this;
        let src = '/img/men-in-boxes-500x300.jpg';
        fabric.Image.fromURL(src, (img) => {
            img.set({ top: 100, scaleY: 0.5, scaleX: 0.5, left: 500 })
            img.filters.push(
                new fabric.Image.filters.Sepia(),
                new fabric.Image.filters.Brightness({ brightness: -0.5 }),
                new fabric.Image.filters.Pixelate({ blocksize: 4 })
            );
            img.applyFilters();
            self.canvas.add(img);
        })
    }

    filterImageMy() {
        const self = this;
        let src = '/img/men-in-boxes-500x300.jpg';
        fabric.Image.fromURL(src, (img) => {
            img.set({ top: 100, scaleY: 0.5, scaleX: 0.5, left: 750 });
            self.canvas.add(img);
            const myFiter = new fabric.Image.filters.Redify();
            img.filters.push(myFiter);
            img.applyFilters([myFiter], true);
        })
    }

    getColors() {
        const red = new fabric.Color('#F00');
        const green = new fabric.Color('0f0');
        const blue = new fabric.Color('#00F');
        const cian = new fabric.Color('rgba(0,255,255,1)');
        const teal = new fabric.Color('rgb(0,128,128)');
        let cs = {
            rgb: {
                red: red.toRgb(),
                green: green.toRgb(),
                blue: blue.toRgb(),
                blue_overlay_green: blue.overlayWith(green).toRgb(),
                cian: cian.toRgb(),
                teal: teal.toRgb(),
                teal_overlay_red: teal.overlayWith(red).toRgb(),
                teal_gray: teal.toGrayscale().toRgb()
            },
            rgba: {
                red: red.toRgba(),
                green: green.toRgba(),
                blue: blue.toRgba(),
                blue_overlay_green: blue.overlayWith(green).toRgba(),
                cian: cian.toRgba(),
                teal: teal.toRgba(),
                teal_overlay_red: teal.overlayWith(red).toRgba(),
                teal_gray: teal.toGrayscale().toRgba(),
            },
            hex: {
                red: red.toHex(),
                green: green.toHex(),
                blue: blue.toHex(),
                blue_overlay_green: blue.overlayWith(green).toHex(),
                cian: cian.toHex(),
                teal: teal.toHex(),
                teal_overlay_red: teal.overlayWith(red).toHex(),
                teal_gray: teal.toGrayscale().toHex(),
            },
            hexa: {
                red: red.toHexa(),
                green: green.toHexa(),
                blue: blue.toHexa(),
                blue_overlay_green: blue.overlayWith(green).toHexa(),
                cian: cian.toHexa(),
                teal: teal.toHexa(),
                teal_overlay_red: teal.overlayWith(red).toHexa(),
                teal_gray: teal.toGrayscale().toHexa(),
            },
            hsl: {
                red: red.toHsl(),
                green: green.toHsl(),
                blue: blue.toHsl(),
                blue_overlay_green: blue.overlayWith(green).toHsl(),
                cian: cian.toHsl(),
                teal: teal.toHsl(),
                teal_overlay_red: teal.overlayWith(red).toHsl(),
                teal_gray: teal.toGrayscale().toHsl(),
            },
            hsla: {
                red: red.toHsla(),
                green: green.toHsla(),
                blue: blue.toHsla(),
                blue_overlay_green: blue.overlayWith(green).toHsla(),
                cian: cian.toHsla(),
                teal: teal.toHsla(),
                teal_overlay_red: teal.overlayWith(red).toHsla(),
                teal_gray: teal.toGrayscale().toHsla(),
            },
        }
        console.log(cs);
        let l = 0;
        Object.keys(cs.rgb).forEach((cor) => {
            const rect = new fabric.Rect({
                left: l,
                top: 450,
                width: 50,
                height: 50,
                fill: cs.rgb[cor] + '',
            })
            l = l + 50;
            this.canvas.add(rect);
        });
    }

    drawGradientCircle() {
        const circle = new fabric.Circle({
            left: 450,
            top: 400,
            radius: 50
        });
        circle.setGradient('fill', {
            type: 'linear',
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 100,
            colorStops: {
                0: "red",
                0.2: "orange",
                0.4: "yellow",
                0.6: "green",
                0.8: "blue",
                1: "purple"
            }
        });
        this.canvas.add(circle);

        const circle2 = new fabric.Circle({
            left: 550,
            top: 400,
            radius: 50
        });
        circle2.setGradient('fill', {
            type: 'radial',
            x1: 50,
            y1: 50,
            x2: 50,
            y2: 50,
            r1: 0,
            r2: 50,
            colorStops: {
                0: "red",
                0.2: "orange",
                0.4: "yellow",
                0.6: "green",
                0.8: "blue",
                1: "purple"
            }
        });
        this.canvas.add(circle2);
    }

    drawText() {
        const text = new fabric.Text('hello world', {
            left: 0,
            top: 250
        })
        this.canvas.add(text);

        const tahomaText = new fabric.Text("I'm in Tahoma", {
            left: 220,
            top: 250,
            fontFamily: 'Tahoma'
        });
        this.canvas.add(tahomaText);

        const arialText = new fabric.Text("I'm in arial", {
            left: 500,
            top: 250,
            fontFamily: 'arial'
        });
        this.canvas.add(arialText);

        var text40 = new fabric.Text("I'm at fontSize 40", {
            left: 700,
            top: 250,
            fontSize: 40,
        });
        this.canvas.add(text40);

        var text20 = new fabric.Text("I'm at fontSize 20", {
            left: 0,
            top: 300,
            fontSize: 20,
        });
        this.canvas.add(text20);

        var normalText = new fabric.Text("I'm a normal text", {
            left: 150,
            top: 300,
            fontWeight: 'normal'
        });
        this.canvas.add(normalText);

        var boldText = new fabric.Text("I'm at bold text", {
            left: 450,
            top: 300,
            fontWeight: 'bold'
        });
        this.canvas.add(boldText);

        var underlineText = new fabric.Text("I'm underlined text", {
            left: 750,
            top: 300,
            underline: true
        });
        this.canvas.add(underlineText);

        var strokeThroughText = new fabric.Text("I'm stroke-through text", {
            left: 0,
            top: 350,
            linethrough: true
        });
        this.canvas.add(strokeThroughText);

        var overlineText = new fabric.Text("I'm overlined text", {
            left: 400,
            top: 350,
            overline: true
        });
        this.canvas.add(overlineText);

        var shadowText1 = new fabric.Text("I'm a text with shadow", {
            left: 0,
            top: 400,
            shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
        });
        this.canvas.add(shadowText1);

        var shadowText2 = new fabric.Text("And another shadow", {
            left: 400,
            top: 400,
            fill: "#fff",
            shadow: 'rgba(0,0,0,0.5) 0 0 5px'
        });
        this.canvas.add(shadowText2);

        var shadowText3 = new fabric.Text("Lorem ipsum dolor sit", {
            left: 750,
            top: 400,
            shadow: 'green -5px -5px 3px'
        });
        this.canvas.add(shadowText3);

        var italicText = new fabric.Text("A very fancy italic text", {
            left: 0,
            top: 450,
            fontStyle: 'italic',
            fontFamily: 'fantasy'
        });
        this.canvas.add(italicText);

        var anotherItalicText = new fabric.Text("another italic text", {
            left: 400,
            top: 450,
            fontStyle: 'italic',
            fontFamily: 'cursive'
        });
        this.canvas.add(anotherItalicText);

        var textWithStroke = new fabric.Text("Text with a stroke", {
            top: 450,
            left: 800,
            stroke: 'green',
            strokeWidth: 2
        });
        this.canvas.add(textWithStroke);

        var loremIpsumDolor = new fabric.Text("Lorem ipsum dolor", {
            left: 1100,
            top: 450,
            fontFamily: 'arial black',
            fill: "#fff",
            stroke: 'red',
            strokeWidth: 2
        });
        this.canvas.add(loremIpsumDolor);

        var alignedRightText = new fabric.Text('this is\na multiline\ntext\naligned right!', {
            left: 1100,
            top: 250,
            textAlign: 'right',
            backgroundColor: 'rgb(0,200,0)'
        });
        this.canvas.add(alignedRightText);

        var alignedRightText2 = new fabric.Text('this is\na multiline\ntext\naligned center!', {
            left: 1100,
            fill: "#fff",
            top: 20,
            angle: 15,
            textAlign: 'center',
            lineHeight: 2,
            backgroundColor: 'rgb(0,0,20)'
        });
        this.canvas.add(alignedRightText2);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const app2 = new App2();
    app2.init();
    // app2.loadBase64();
});
