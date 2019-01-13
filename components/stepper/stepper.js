(function ($) {
    'use strict';

    $.fn.stepper = function (settings) {
        var defaults = {
            incrementBtnSelector: '.js-increment',
            decrementBtnSelector: '.js-decrement',
        };
        var config = $.extend({}, defaults, settings);

        var $container = $(this);
        var $input = $container.find('input');
        var minValue = (typeof $input.data('min') === 'undefined' ? Number.MIN_VALUE : parseInt($input.data('min')));
        var maxValue = (typeof $input.data('max') === 'undefined' ? Number.MAX_VALUE : parseInt($input.data('max')));

        /**
         * Check if value is smaller than allowed minimum value
         * @param {number} value - value to check
         * @returns {boolean}
         */
        var isSmallerThanMinValue = function (value) {
            return (value < minValue);
        }

        /**
         * Check if value is bigger than allowed maximum value
         * @param {number} value - value to check
         * @returns {boolean}
         */
        var isBiggerThanMaxValue = function (value) {
            return (value > maxValue);
        }

        /**
         * Check if value is not between allowed minimum and maximum values
         * @param {number} value - value to check
         * @returns {boolean}
         */
        var isNotInRange = function (value) {
            return (isSmallerThanMinValue(value) || isBiggerThanMaxValue(value));
        };

        /**
         * Get parsed integer value
         * @returns {number}
         */
        var getValue = function () {
            return parseInt($input.val());
        };

        /**
         * Check value against allowed minimum and maximu values and set value to input
         * @param {(string|number)} value - value to check and set
         */
        var setValue = function (value) {
            if (!isNotInRange(value)) {
                $input.val(value);
            } else if (isSmallerThanMinValue(value)) {
                $input.val(minValue);
            } else if (isBiggerThanMaxValue(value)) {
                $input.val(maxValue);
            }
        };

        /**
         * Increment value
         */
        var increment = function () {
            setValue(getValue() + 1);
        };

        /**
         * Decrement value
         */
        var decrement = function () {
            setValue(getValue() - 1);
        };

        /**
         * Events
         */
        // click on increment button
        $container.on('click', config.incrementBtnSelector, function () {
            increment();
        });

        // click on decrement button
        $container.on('click', config.decrementBtnSelector, function () {
            decrement();
        });

        // field input
        $input.on('input', function (e) {
            if (isNaN(getValue())) {
                setValue(minValue);
            } else {
                setValue(getValue());
            }
        });

        /**
         * Global methods
         */
        this.getValue = getValue;
        this.setValue = setValue;
    };
} (jQuery));

$('.js-stepper').stepper();
