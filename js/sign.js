class SignToPNG {
    constructor() {
        if (!this.checkRequires()) {
            throw new Error('Error on contructor');
        }
        this.canvas = null;
        this.fabric = null;
    }

    prepareCanvas() {
        let parent = null
        if (!this.fabric) {
            parent = this.canvas.parentElement;
        } else {
            parent = this.canvas.parentElement.parentElement;
        }
        this.canvas.width = parent.offsetWidth - 40;
        this.canvas.height = parent.offsetHeight - 200;

        if (this.fabric) {
            this.fabric.renderAll();
        }
    }

    init() {
        // canvas
        this.canvas = document.querySelector('#canvas');
        this.prepareCanvas();

        // fabric
        let options = {
            isDrawingMode: true,
        };
        this.fabric = new fabric.Canvas('canvas', options);
    }

    changeBrush(color, width) {
        if (color !== '') {
            this.fabric.freeDrawingBrush.color = color;
        }
        if (width) {
            this.fabric.freeDrawingBrush.width = width;
        }
        this.fabric.renderAll();
    }

    clear() {
        this.fabric.clear();
        this.fabric.renderAll();
    }

    checkRequires() {
        if (!fabric) {
            console.error('Some files are required. Include Fabricjs');
            return false;
        }
        if (document.querySelectorAll('canvas').length <= 0) {
            console.error('Some tag are required. Include a canvas tag on html');
            return false;
        }
        if (!document.querySelector('#canvas')) {
            console.error('Some tag are required. Include a tag with id like `canvas` on html');
            return false;
        }
        if (document.querySelector('#canvas').nodeName !== 'CANVAS') {
            console.error('Some tag are required. The tag with id like `canvas` need to be a canvas element');
            return false;
        }
        return true;
    }

    getBase64Image() {
        let b64 = this.fabric.toDataURL('png');
        this.fabric.renderAll();
        return b64;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    let lineSize = 4;
    let lineColor = 'rgb(0,0,0)';
    const app = new SignToPNG();
    app.init();
    app.changeBrush(lineColor, lineSize);

    document.querySelector('#btn-clear').addEventListener('click', () => {
        app.clear();
    })

    document.querySelector('#btn-color').addEventListener('click', (evt) => {
        evt.preventDefault();
        document.querySelector('#color-picker').click();
    })

    document.querySelector('#color-picker').addEventListener('change', () => {
        lineColor = document.querySelector('#color-picker').value;
        document.querySelector('#color-picker-view').style = "background-color:" + lineColor + "!important;opacity: 1!important;";
        app.changeBrush(lineColor);
    })

    document.querySelector('#line-size').addEventListener('change', (evt) => {
        lineSize = evt.target.value;
        app.changeBrush(lineColor, lineSize);
    })


    document.querySelector('#btn-save').addEventListener('click', () => {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";

        fetch(app.getBase64Image())
            .then(res => res.blob())
            .then(blob => {
                url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = 'signfile.png';
                a.click();
                window.URL.revokeObjectURL(url);
            });
    })

    window.addEventListener('resize', () => {
        // app.prepareCanvas();
    })
})