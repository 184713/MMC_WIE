function WIE() {
    this._canvas = null;
}

WIE.prototype.rgb2hex = function (r, g, b) {
    return '#' +
        ("0" + parseInt(r,10).toString(16)).slice(-2) +
        ("0" + parseInt(g,10).toString(16)).slice(-2) +
        ("0" + parseInt(b,10).toString(16)).slice(-2);
};

WIE.prototype.deserializeState = function (data) {
    console.warn('[WIE] Deserialization (WIP) fired!', data);
};

WIE.prototype.serializeState = function () {
    console.warn('[WIE] Serialization (WIP) fired!', JSON.stringify(this._canvas));
    alert(JSON.stringify(this._canvas));
};

WIE.prototype._init = function (container, $) {
    var context = this;
    var options = {
        width: 800,
        height: 600,
        colors: [
            {color: '#F16472', name: 'red'},
            {color: '#F9A752', name: 'orange'},
            {color: '#FFE53C', name: 'yellow'},
            {color: '#C0DC8A', name: 'green'},
            {color: '#48BB8E', name: 'mint'},
            {color: '#B4CEEB', name: 'teal'},
            {color: '#6D87C3', name: 'blue'},
            {color: '#A27EB6', name: 'violet'},
            {color: '#AD5381', name: 'purple'},
            {color: '#BBBDC0', name: 'silver'},
            {color: '#FCB4BF', name: 'sred'},
            {color: '#FFD7B6', name: 'sorange'},
            {color: '#FCEEB6', name: 'syellow'},
            {color: '#EAFCC3', name: 'sgreen'},
            {color: '#B2F7E4', name: 'smint'},
            {color: '#D9E9F9', name: 'steal'},
            {color: '#D9E9F9', name: 'sblue'},
            {color: '#E5C9F7', name: 'sviolet'},
            {color: '#E5C9F7', name: 'spurple'},
            {color: '#E2E2E2', name: 'ssilver'},
            {color: '#000000', name: 'black'},
            {color: '#303333', name: 'gray1'},
            {color: '#7C8486', name: 'gray2'},
            {color: '#D8DCDC', name: 'gray3'},
            {color: '#F1F2F5', name: 'gray4'},
            {color: '#FFFFFF', name: 'white'}
        ],
        backgroundColor: '#FFFFFF',
        //image: 'http://lorempixel.com/output/abstract-q-c-800-600-6.jpg'
    };

    console.log('[WIE] Started', options);

    $('.gp', container).append('<canvas class="canvas"></canvas>').css('background-color', options.backgroundColor);
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
        $('.brush-color', container).append('<div class="set-brush-color" data-color="' + v.color + '" tabindex="1" style="background-color: ' + v.color + '"></div>');
    });

    $('.set-brush-size', container).on('click', function () {
        canvas.freeDrawingBrush.width = $(this).data('size');
        $(this).addClass('active').siblings().removeClass('active');
    }).first().trigger('click');

    $('.set-brush-color', container).on('click', function () {
        canvas.freeDrawingBrush.color = $(this).data('color');
        $(this).addClass('active').siblings().removeClass('active');
    }).first().trigger('click');

    $('.new-canvas', container).on('click', function () {
        canvas.clear();
    });

    $('.print-canvas', container).on('click', function () {
        $('.controls', container).hide();
        window.print();
        $('.controls', container).show();
    });

    $('.save-canvas', container).on('click', function () {
        context.serializeState();
    });

    $('.pipette', container).on('click', function () {
        if ($(container).hasClass('pipette-mode')) {
            canvas.isDrawingMode = true;
            canvas.forEachObject(function(object){
                object.selectable = true;
            });
            $(container).removeClass('pipette-mode');
            $(this).removeClass('active');
        } else {
            canvas.isDrawingMode = false;
            canvas.forEachObject(function(object){
                object.selectable = false;
            });
            $(container).addClass('pipette-mode');
            $(this).addClass('active');
        }
    });

    $('.canvas-container', container).on('click', function (event) {
        if ($(container).hasClass('pipette-mode')) {
            var x = event.pageX - $(this).offset().left;
            var y = event.pageY - $(this).offset().top;
            var data = $(this).find('.lower-canvas')[0].getContext('2d').getImageData(x, y, 1, 1).data;
            console.log('[WIE] Pipette tool used', data);

            canvas.freeDrawingBrush.color = context.rgb2hex(data[0], data[1], data[2]);

            canvas.isDrawingMode = true;
            canvas.forEachObject(function(object){
                object.selectable = true;
            });
            $(container).removeClass('pipette-mode');
            $('.pipette', container).removeClass('active');
        }
    });

    $('.move', container).on('click', function () {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        $(this).toggleClass('active');
    });
};
