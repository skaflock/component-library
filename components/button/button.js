(function () {
    'use strict';

    $(document).on('click', '.js-btn', function () {
        console.log('button has been clicked');
        $(this).toggleClass('btn--accent');
    });
} ());
