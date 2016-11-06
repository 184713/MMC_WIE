function WIE() {
    this._canvas = null;
}

WIE.prototype.deserializeState = function (data) {
    console.warn('[WIE] Deserialization (WIP) fired!');
};

WIE.prototype.serializeState = function () {
    console.warn('[WIE] Serialization (WIP) fired!');
};

WIE.prototype._init = function (container, $) {
    var context = this;
    var options = {
        height: 800,
        width: 600
    };

    console.log('[WIE] Started', options);

    $('.gp', container).append('<canvas class="canvas"></canvas>');
    this._canvas = new fabric.Canvas(container.find('.canvas')[0], {
    });
    var canvas = this._canvas;
};
