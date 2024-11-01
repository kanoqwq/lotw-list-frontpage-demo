export function QSLInfo({ canvasId, imgSrc, fontInfo }) {

    this.canvas = document.querySelector(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.image = new Image();
    this.image.src = imgSrc;
    this.fontInfo = fontInfo

    this.setAndRender = (obj, name, value, _) => {
        obj.value = value;
        this.ctx.fillText(value, obj.x, obj.y);
        return true
    }


    this.datePos = {
        x: 200, y: 630
    }
    this.timePos = {
        x: 560, y: 665
    }
    this.freqPos = {
        x: 1030, y: 630
    }
    this.modePos = {
        x: 1310, y: 630
    }
    this.RSTPos = {
        x: 1540, y: 630
    }
    this.TRXPos = {
        x: 120, y: 900
    }
    this.powerPos = {
        x: 380, y: 900
    }
    this.antPos = {
        x: 580, y: 900
    }
    this.pseCardPos = {
        x: 780, y: 750
    }
    this.tnxCardPos = {
        x: 780, y: 850
    }
    this.commentPos = {
        x: 1245, y: 780
    }
    this.gridPos = {
        x: 185, y: 1108
    }
    this.addrPos = {
        x: 185, y: 1042
    }
    this.CQPos = {
        x: 1670, y: 386
    }
    this.ITUPos = {
        x: 1670, y: 440
    }
    this.QSOPos = {
        x: 720, y: 440
    }
    this.SWLPos = {
        x: 970, y: 440
    }
    this.OPPos = {
        x: 1410, y: 1130
    }
    this.callsignPos = {
        x: 1100, y: 350
    }


    this.date = new Proxy({ value: undefined, ...this.datePos }, {
        set: this.setAndRender
    })
    this.time = new Proxy({ value: undefined, ...this.timePos }, {
        set: this.setAndRender
    })
    this.freq = new Proxy({ value: undefined, ...this.freqPos }, {
        set: this.setAndRender
    })
    this.mode = new Proxy({ value: undefined, ...this.modePos }, {
        set: this.setAndRender
    })
    this.rst = new Proxy({ value: undefined, ...this.RSTPos }, {
        set: this.setAndRender
    })
    this.trx = new Proxy({ value: undefined, ...this.TRXPos }, {
        set: this.setAndRender
    })
    this.power = new Proxy({ value: undefined, ...this.powerPos }, {
        set: this.setAndRender
    })
    this.ant = new Proxy({ value: undefined, ...this.antPos }, {
        set: this.setAndRender
    })
    this.pseCard = new Proxy({ value: undefined, ...this.pseCardPos }, {
        set: this.setAndRender
    })
    this.tnxCard = new Proxy({ value: undefined, ...this.tnxCardPos }, {
        set: this.setAndRender
    })
    this.op = new Proxy({ value: undefined, ...this.OPPos }, {
        set: this.setAndRender
    })
    this.comment = new Proxy({ value: undefined, ...this.commentPos }, {
        set: this.setAndRender
    })
    this.grid = new Proxy({ value: undefined, ...this.gridPos }, {
        set: this.setAndRender
    })
    this.addr = new Proxy({ value: undefined, ...this.addrPos }, {
        set: this.setAndRender
    })
    this.CQ = new Proxy({ value: undefined, ...this.CQPos }, {
        set: this.setAndRender
    })
    this.ITU = new Proxy({ value: undefined, ...this.ITUPos }, {
        set: this.setAndRender
    })
    this.QSO = new Proxy({ value: undefined, ...this.QSOPos }, {
        set: this.setAndRender
    })
    this.SWL = new Proxy({ value: undefined, ...this.SWLPos }, {
        set: this.setAndRender
    })
    this.callsign = new Proxy({ value: undefined, ...this.callsignPos }, {
        set: this.setAndRender
    })

}

QSLInfo.prototype.drawImage = function ({ width }) {
    this.canvas.width = this.image.width
    this.canvas.height = this.image.height
    this.canvas.style.width = width ? width : '800px'
    this.ctx.clearRect(0, 0, this.image.width, this.image.height)
    this.ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height)
    this.ctx.font = this.fontInfo.font;
}

QSLInfo.prototype.drawWatermark = function ({ pos, width, height, imgSrc }) {
    let image = new Image();
    image.src = imgSrc;
    image.onload = () => {
        this.ctx.drawImage(image, pos.x, pos.y, width, height)
    }
}