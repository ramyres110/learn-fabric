class App {

    constructor() {
        console.log('Object App instanciated');
        this.fabric = null;
    }

    init() {
        console.log('call init in object App');
        this.prepareCanvas();
        console.log('Instanciate an fabric.Canvas');
        // this.fabric = new fabric.StaticCanvas('cv1', {
        this.fabric = new fabric.Canvas('cv1', {
            backgroundColor: 'rgb(200,200,200)',
            selection: false,
            selectionColor: 'yellow',
            selectionLineWidth: 2,
            // backgroundImage: 'http://leanmagazine.net/wordpress/wp-content/uploads/2012/01/men-in-boxes-500x300.jpg',
        });
        this.fabric.on('mouse:down', function (options) {
            console.log(options.e.clientX, options.e.clientY);
            if (options.target) {
                console.log('an object was clicked! ', options.target.type);
            }
        });
        // First Lesson
        let r = this.drawRedRect();
        this.drawGreenCircle();
        this.drawBlueTriangle();
        this.drawImage();
        this.drawImageFromURL();
        this.drawPath();
        this.drawComplexPath();
        //
        this.alterPropRedRect(this.drawRedRect());
        this.manipRedRect(this.drawRedRect());
        //
        this.getObjs();
        //
        this.animateRect(r);
        //
        //
        // this.getColors();
        // this.drawGradientCircle();
        //
        this.drawText();
        //
        this.drawGroup();
        this.drawGroupOfCircles();
        //
        this.getJSONData();
        this.getSVGData();
        this.getDataURL();
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

    drawGroup() {
        var circle = new fabric.Circle({
            radius: 100,
            fill: '#eef',
            scaleY: 0.5
        });

        var text = new fabric.Text('hello world', {
            fontSize: 30,
            left: 25,
            top: 30,
        });

        var group = new fabric.Group([circle, text], {
            left: 1150,
            top: 0,
            angle: -10
        });

        this.fabric.add(group);
        group.item(1).set({
            text: 'trololo',
            fill: 'white'
        });
        group.item(0).set({ fill: 'red' });

        group.add(new fabric.Rect({
            width: 50,
            height: 50,
            left: 100,
            top: 100
        }));
        group.addWithUpdate(new fabric.Rect({
            width: 50,
            height: 50,
            fill: 'green',
            left: group.left,
            top: group.top
        }));
    }

    drawGroupOfCircles() {
        var circle1 = new fabric.Circle({
            radius: 50,
            fill: 'green',
            left: 0
        });
        var circle2 = new fabric.Circle({
            radius: 50,
            fill: 'yellow',
            left: 100
        });
        var circle3 = new fabric.Circle({
            radius: 50,
            fill: 'red',
            left: 200
        });

        var group = new fabric.Group([circle1, circle2, circle3], {
            left: 1200,
            top: 400,
            angle: 270
        });

        this.fabric.add(group);
    }

    drawRect(color, w, h, l, t) {
        const rect = new fabric.Rect({
            left: l,
            top: t,
            fill: color,
            width: w,
            height: h,
        })
        this.fabric.add(rect);
    }

    drawRedRect() {
        let l = 50;
        //draw
        const rect = new fabric.Rect({
            left: l,
            top: 50,
            fill: 'red',
            width: (100 / Math.sqrt(2)),
            height: (100 / Math.sqrt(2)),
            angle: 45
        })
        this.fabric.add(rect);
        return rect;
    }

    alterPropRedRect(rect) {
        // alter properties
        let l = 50;
        const self = this;
        let fat = 1;
        const t = setInterval(() => {
            l = l + (10 * fat);
            rect.set({ left: l, top: 50, });
            self.fabric.renderAll();
            if (l >= document.querySelector('#cv1').offsetWidth && fat > 0) {
                fat = -1;
            } else if (l <= 0 && fat < 0) {
                fat = 1;
            }
        }, 100);
    }

    manipRedRect(rect) {
        rect.set('fill', 'yellow');
        rect.set({ left: 550, strokeWidth: 5, stroke: 'rgba(100,100,100,0.5)', angle: 0 });
        let ang = 15;
        const self = this;
        setInterval(() => {
            rect.set('angle', ang).set('flipX', true);
            ang = ang + 5;
            self.fabric.renderAll();
        }, 100);
    }

    getObjs() {
        console.log(this.fabric.getObjects());//Array
        console.log(this.fabric.item(0));//Array

    }

    drawGreenCircle() {
        const circle = new fabric.Circle({
            radius: 50,
            fill: 'green',
            left: 150,
            top: 50
        });
        this.fabric.add(circle);
        return circle;
    }

    drawGradientCircle() {
        const circle = new fabric.Circle({
            left: 1100,
            top: 100,
            radius: 50
        });
        circle.setGradientFill({
            x1: 0,
            y1: circle.height / 2,
            x2: circle.width,
            y2: circle.height / 2,
            colorStops: {
                0: "red",
                0.2: "orange",
                0.4: "yellow",
                0.6: "green",
                0.8: "blue",
                1: "purple"
            }
        });
        this.fabric.add(circle);
        return circle;
    }

    drawText() {
        const text = new fabric.Text('hello world', {
            left: 0,
            top: 250
        })
        this.fabric.add(text);

        const tahomaText = new fabric.Text("I'm in Tahoma", {
            left: 220,
            top: 250,
            fontFamily: 'Tahoma'
        });
        this.fabric.add(tahomaText);

        const arialText = new fabric.Text("I'm in arial", {
            left: 500,
            top: 250,
            fontFamily: 'arial'
        });
        this.fabric.add(arialText);

        var text40 = new fabric.Text("I'm at fontSize 40", {
            left: 700,
            top: 250,
            fontSize: 40,
        });
        this.fabric.add(text40);

        var text20 = new fabric.Text("I'm at fontSize 20", {
            left: 0,
            top: 300,
            fontSize: 20,
        });
        this.fabric.add(text20);

        var normalText = new fabric.Text("I'm a normal text", {
            left: 150,
            top: 300,
            fontWeight: 'normal'
        });
        this.fabric.add(normalText);

        var boldText = new fabric.Text("I'm at bold text", {
            left: 450,
            top: 300,
            fontWeight: 'bold'
        });
        this.fabric.add(boldText);

        var underlineText = new fabric.Text("I'm underlined text", {
            left: 750,
            top: 300,
            textDecoration: 'underline'
        });
        this.fabric.add(underlineText);

        var strokeThroughText = new fabric.Text("I'm stroke-through text", {
            left: 0,
            top: 350,
            textDecoration: 'line-through'
        });
        this.fabric.add(strokeThroughText);

        var overlineText = new fabric.Text("I'm overlined text", {
            left: 400,
            top: 350,
            textDecoration: 'overline',
        });
        this.fabric.add(overlineText);

        var shadowText1 = new fabric.Text("I'm a text with shadow", {
            left: 0,
            top: 400,
            textShadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
        });
        this.fabric.add(shadowText1);

        var shadowText2 = new fabric.Text("And another shadow", {
            left: 400,
            top: 400,
            textShadow: 'rgba(0,0,0,0.2) 0 0 5px'
        });
        this.fabric.add(shadowText2);

        var shadowText3 = new fabric.Text("Lorem ipsum dolor sit", {
            left: 750,
            top: 400,
            textShadow: 'black -5px -5px 3px'
        });
        this.fabric.add(shadowText3);

        var italicText = new fabric.Text("A very fancy italic text", {
            left: 0,
            top: 450,
            fontStyle: 'italic',
            fontFamily: 'fantasy'
        });
        this.fabric.add(italicText);

        var anotherItalicText = new fabric.Text("another italic text", {
            left: 400,
            top: 450,
            fontStyle: 'italic',
            fontFamily: 'cursive'
        });
        this.fabric.add(anotherItalicText);

        var textWithStroke = new fabric.Text("Text with a stroke", {
            top: 450,
            left: 800,
            strokeStyle: 'green',
            strokeWidth: 1
        });
        this.fabric.add(textWithStroke);

        var loremIpsumDolor = new fabric.Text("Lorem ipsum dolor", {
            left: 1100,
            top: 450,
            fontFamily: 'Tahoma',
            strokeStyle: 'red',
            strokeWidth: 3
        });
        this.fabric.add(loremIpsumDolor);

        var alignedRightText = new fabric.Text('this is\na multiline\ntext\naligned right!', {
            left: 1100,
            top: 250,
            textAlign: 'right',
            lineHeight: 0.8,
            backgroundColor: 'rgb(0,200,0)'
        });
        this.fabric.add(alignedRightText);
    }

    drawBlueTriangle() {
        const triangle = new fabric.Triangle({
            width: 100,
            height: 100,
            fill: 'blue',
            left: 300,
            top: 50
        });
        this.fabric.add(triangle);
        return triangle;
    }

    drawImage() {
        const self = this;
        const img = new Image();
        img.src = 'http://leanmagazine.net/wordpress/wp-content/uploads/2012/01/men-in-boxes-500x300.jpg';
        img.onload = () => {
            let imgInstance = new fabric.Image(img, {
                left: 1500,
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
            oImg.set({ left: 1400 })
            oImg.filters.push(new fabric.Image.filters.Grayscale());
            oImg.filters.push(new fabric.Image.filters.Sepia());
            // oImg.applyFilters(self.fabric.renderAll.bind(self.fabric));
            // oImg.applyFilters(self.fabric.renderAll.bind(self.fabric));
            self.fabric.add(oImg);
        })
    }

    drawPath() {
        const path = new fabric.Path('M 0 0 L 200 0 L 0 100 z');
        path.set({ left: 700, top: 50 });
        path.set({ fill: 'red', stroke: 'green', opacity: 0.5 });
        this.fabric.add(path)
    }

    animateRect(rect) {
        const self = this;
        rect.animate('angle', -5, {
            onChange: self.fabric.renderAll.bind(self.fabric),
            duration: 1000,
            easing: fabric.util.ease.easeOutBounce
        });
    }

    drawSVGFromString(str) { }

    drawSVGFromURL(url) { }

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

    getColors() {
        // const red = fabric.Color('#F00');
        // console.log(red.toRgb());

        // const green = fabric.Color('#0F0');
        // console.log(green);

        // const blue = fabric.Color('#00F');
        // console.log(blue);

        // const cian = fabric.Color('rgb(0,255,255)');
        // console.log(cian);

        // const teal = fabric.Color('rgb(0,128,128)');
        // console.log(teal);


        return {}
        // return {
        //     rgb: {
        //         red: red.toRgb(),
        //         green: green.toRgb(),
        //         blue: blue.toRgb(),
        //         cian: cian.toRgb(),
        //         teal: teal.toRgb(),
        //         teal_overlay_red: teal.overlayWith(red).toRgb(),
        //         teal_gray: teal.toGrayscale().toRgb()
        //     },
        //     hex: {
        //         red: red.toHex(),
        //         green: green.toHex(),
        //         blue: blue.toHex(),
        //         cian: cian.toHex(),
        //         teal: teal.toHex(),
        //         teal_overlay_red: teal.overlayWith(red).toHex(),
        //         teal_gray: teal.toGrayscale().toHex()
        //     },
        // }
    }

    getJSONData() {
        const json = JSON.stringify(this.fabric);
        // console.log(json);
        return json;
    }

    getSVGData() {
        const svg = this.fabric.toSVG();
        // console.log(svg);
        return svg;
    }

    getDataURL() {
        const png = this.fabric.toDataURL('png');
        // console.log(png);
        return png;

    }
}


document.addEventListener('DOMContentLoaded', function () {
    const app = new App();
    app.init();

    window.onresize = () => {
        app.prepareCanvas();
    }
});





class main2{
    
    drawGroup() {
        var circle = new fabric.Circle({
            radius: 100,
            fill: '#eef',
            scaleY: 0.5
        });

        var text = new fabric.Text('hello world', {
            fontSize: 30,
            left: 25,
            top: 30,
        });

        var group = new fabric.Group([circle, text], {
            left: 1150,
            top: 0,
            angle: -10
        });

        this.canvas.add(group);
        group.item(1).set({
            text: 'trololo',
            fill: 'white'
        });
        group.item(0).set({ fill: 'red' });

        group.add(new fabric.Rect({
            width: 50,
            height: 50,
            left: 100,
            top: 100
        }));
        group.addWithUpdate(new fabric.Rect({
            width: 50,
            height: 50,
            fill: 'green',
            left: group.left,
            top: group.top
        }));
    }

    drawGroupOfCircles() {
        var circle1 = new fabric.Circle({
            radius: 50,
            fill: 'green',
            left: 0
        });
        var circle2 = new fabric.Circle({
            radius: 50,
            fill: 'yellow',
            left: 100
        });
        var circle3 = new fabric.Circle({
            radius: 50,
            fill: 'red',
            left: 200
        });

        var group = new fabric.Group([circle1, circle2, circle3], {
            left: 1200,
            top: 400,
            angle: 270
        });

        this.canvas.add(group);
    }

    alterPropRedRect(rect) {
        // alter properties
        let l = 50;
        const self = this;
        let fat = 1;
        const t = setInterval(() => {
            l = l + (10 * fat);
            rect.set({ left: l, top: 50, });
            self.fabric.renderAll();
            if (l >= document.querySelector('#cv1').offsetWidth && fat > 0) {
                fat = -1;
            } else if (l <= 0 && fat < 0) {
                fat = 1;
            }
        }, 100);
    }

    manipRedRect(rect) {
        rect.set('fill', 'yellow');
        rect.set({ left: 550, strokeWidth: 5, stroke: 'rgba(100,100,100,0.5)', angle: 0 });
        let ang = 15;
        const self = this;
        setInterval(() => {
            rect.set('angle', ang).set('flipX', true);
            ang = ang + 5;
            self.fabric.renderAll();
        }, 100);
    }

    getObjs() {
        console.log(this.fabric.getObjects());//Array
        console.log(this.fabric.item(0));//Array

    }




    // animateRect(rect) {
    //     const self = this;
    //     rect.animate('angle', -5, {
    //         onChange: self.fabric.renderAll.bind(self.fabric),
    //         duration: 1000,
    //         easing: fabric.util.ease.easeOutBounce
    //     });
    // }

    drawSVGFromString(str) { }

    drawSVGFromURL(url) { }

    getJSONData() {
        const json = JSON.stringify(this.fabric);
        // console.log(json);
        return json;
    }

    getSVGData() {
        const svg = this.fabric.toSVG();
        // console.log(svg);
        return svg;
    }

    getDataURL() {
        const png = this.fabric.toDataURL('png');
        // console.log(png);
        return png;

    }

    request(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText)
            }
        };
        xhr.open('GET', url, true)
        xhr.send()
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
}