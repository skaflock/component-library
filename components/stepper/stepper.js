(function ($) {
    'use strict';

    $.fn.stepper = function (settings) {
        console.log('stepper initialized');
        var defaults = {
            incrementBtnSelector: '.js-increment',
            decrementBtnSelector: '.js-decrement',
        };
        var config = $.extend({}, defaults, settings);

        var $container = $(this);
        var $input = $container.find('input');
        var minValue = (typeof $input.data('min') === 'undefined' ? Number.MIN_VALUE : parseInt($input.data('min')));
        var maxValue = (typeof $input.data('max') === 'undefined' ? Number.MAX_VALUE : parseInt($input.data('max')));

        console.log(minValue, maxValue);

        var isSmallerThanMinValue = function (value) {
            return (value < minValue);
        }

        var isBiggerThanMaxValue = function (value) {
            return (value > maxValue);
        }

        var isNotInRange = function (value) {
            return (isSmallerThanMinValue(value) || isBiggerThanMaxValue(value));
        };

        var getValue = function () {
            return parseInt($input.val());
        };

        var setValue = function (value) {
            if (!isNotInRange(value)) {
                $input.val(value);
            } else if (isSmallerThanMinValue(value)) {
                $input.val(minValue);
            } else if (isBiggerThanMaxValue(value)) {
                $input.val(maxValue);
            }
        };

        var increment = function () {
            setValue(getValue() + 1);
        };

        var decrement = function () {
            setValue(getValue() - 1);
        };

        $container.on('click', config.incrementBtnSelector, function () {
            increment();
        });

        $container.on('click', config.decrementBtnSelector, function () {
            decrement();
        });

        $input.on('input', function (e) {
            if (isNaN(getValue())) {
                setValue(minValue);
            } else {
                setValue(getValue());
            }
        });
    };
} (jQuery));

$('.js-stepper').stepper();
