$(document).ready(function() {

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        $clock = $('h4.countdown');
        $days = $clock.find('.days');
        $hours = $clock.find('.hours');
        $minutes = $clock.find('.minutes');
        $seconds = $clock.find('.seconds');

        function updateClock() {
            var $t = getTimeRemaining(endtime);

            // If lower than 10, then add 0;
            if( $t.days < 10 ) $days.html('0' + $t.days);
            if( $t.hours < 10 ) $hours.html('0' + $t.hours);
            if( $t.minutes < 10 ) $minutes.html('0' + $t.minutes);
            if( $t.seconds < 10 ) $seconds.html('0' + $t.seconds);

            // If higher than don't add anything.
            if( $t.days > 10 ) $days.html($t.days);
            if( $t.hours > 10 ) $hours.html($t.hours);
            if( $t.minutes > 10 ) $minutes.html($t.minutes);
            if( $t.seconds > 10 ) $seconds.html($t.seconds);

            if ($t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
    initializeClock('h4.countdown', deadline);

});