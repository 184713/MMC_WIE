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
        width: 800,
        height: 600,
        colors: [
            {color: '#000000', name: 'black'},
            {color: '#FF0000', name: 'red'},
            {color: '#00FF00', name: 'green'},
            {color: '#0000FF', name: 'blue'}
        ],
        image: 'http://lorempixel.com/output/abstract-q-c-800-600-6.jpg'
    };

    console.log('[WIE] Started', options);

    $('.gp', container).append('<canvas class="canvas"></canvas>');
    this._canvas = new fabric.Canvas(container.find('.canvas')[0], {
        isDrawingMode: true
    });
    var canvas = this._canvas;
    canvas.setWidth(options.width);
    canvas.setHeight(options.height);

    if (options.image) {
        console.log('[WIE] Loading custom background image', options.image);
        $('.canvas-container', container).append('<img src="' + options.image + '" alt="">');
    }

    $(options.colors).each(function (i, v) {
        $('.brush-color', container).append('<button class="btn set-brush-color" data-color="' + v.color + '" tabindex="1">Brush color: ' + v.name + '</button>')
    });

    $('.set-brush-size', container).on('click', function() {
        canvas.freeDrawingBrush.width = $(this).data('size');
        $(this).addClass('active').siblings().removeClass('active');
    }).first().trigger('click');

    $('.set-brush-color', container).on('click', function() {
        canvas.freeDrawingBrush.color = $(this).data('color');
        $(this).addClass('active').siblings().removeClass('active');
    }).first().trigger('click');
};
