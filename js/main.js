$(document).ready(function() {

    // Global variables
    $navigationActive = false;
    $activeBio = false;

    $fade = $('.fadeMe');
    $button = $('button.btn-navigation');
    $navigation = $('nav.menu-appear');
    $hero = $('section.background-video .main');
    $heroButtonDiv = $hero.find('.button-div');
    $heroText = $hero.find('h1');
    $heroButton = $hero.find('button');
    $blogPost = $('.blog-post');

    $workshop = $('.workshop-wrapper');
    $workshopText = $workshop.find('a.workshop-text');
    $workshopButton = $workshop.find('a.workshop-button');

    $orderedNavigation = $('ol.navigation-ol');
    $buttonText = $button.find("span:first-child");
    $upperLine = $button.find("span:nth-child(2)");
    $bottomLine = $button.find('span:nth-child(5)');
    $bothLines = $button.find('span:nth-child(2), span:nth-child(5)');
    $middleLines = $button.find('span:nth-child(3), span:nth-child(4)');

    $transitionName = 'easeOutCubic';
    $transitionCloseName = 'easeInCubic';
    $animationTime = 300;
    $hoverTransitionTime = 400;


    function centerButton(path) {

        if( $(window).width() > 768 ) {
            $buttonWidth = $(path).find('a.workshop-button').width();
            $workshopWrapper = $(path);
            $widthLeft = $buttonWidth + 70;
            $workshopWrapper.css({ marginLeft: $widthLeft });
        }
    }

    function heroPanelFadeIn() {
        // Variables
        $animationSpeed = 500;
        $x = 0;

        while($x < 5) {

            // Checks if $x equals to a span which is a last text of the hero panel H1.
            if( $x == 4 ) {
                $heroText.find('span:nth-child(5)').delay($animationSpeed * 3).queue(function(next) {
                    $(this).addClass('fadeIn');
                });

                $heroButton.parent().delay($animationSpeed * 4).queue(function(next) {
                    $(this).addClass('fadeIn');
                });

            } else {
                $heroText.find('span:nth-child(' + ($x + 1) + ')').delay($x * $animationSpeed).queue(function(next) {
                    $(this).addClass('fadeIn');
                });
            }
            $x++;
        }
    }

    function fadeInOpacity() {
        $fade.stop().css({ display: 'inherit' }).animate({ opacity: '0.88' }, $animationTime, $transitionName);
    }

    function fadeOutOpacity() {
        $fade.stop().css({ display: 'inherit' }).animate({ opacity: '0.5' }, $animationTime, $transitionCloseName);
    }

    function openNavigation() {
        // Variables
        $lines = $orderedNavigation.find('li').length;
        $x = 1;
        $navigationActive = true;

        // Moving the navigation to right: 0 instantly, without any animation, then animate the navigation footer to fade in.
        $navigation.stop(true, true).css({ right: 0 });

        if( $(window).width() < 768 ) {
            $fade.stop(true, true).delay(300).css({ display: 'inherit' }).animate({ opacity: '0.95' }, $animationTime, $transitionName);
            $navigation.find('footer').stop(true, true).delay(600).animate({ opacity: '1' }, $animationTime, $transitionCloseName);
            $('html, body').css('overflow', 'hidden');
        } else {
            $fade.stop(true, true).delay(300).css({ display: 'inherit' }).animate({ opacity: '0.88' }, $animationTime, $transitionName);
            $navigation.find('footer').stop(true, true).delay(600).animate({ opacity: '0.4' }, $animationTime, $transitionCloseName);
        }

        // Using while function to find each line and animate it with giving 50ms delay, dublicating it for each transition.
        while($x < $lines) {

            // Fades in first 4 list items.
            if( $x <= 5 || $x >= 8 ) $orderedNavigation.find('li.front-line:nth-child(' + $x + ')').stop(true, true).delay( (50 * $x) ).animate({ left: 0 }, $hoverTransitionTime, $transitionCloseName);

            // Fades in fifth list item (dashed line).
            if( $x == 6 ) $orderedNavigation.find('li.item-free-content').stop(true, true).delay( (50 * $x) ).animate({ left: 0 }, $hoverTransitionTime, $transitionCloseName);

            // Fades in sixth list item, its the item with unondered list and also dashed line.
            if( $x == 7 ) {
                $orderedNavigation.find('ul li').stop(true, true).delay(250).animate({ left: 0 }, $hoverTransitionTime, $transitionCloseName);
                $orderedNavigation.find('li.front-line:nth-child(7)').stop(true, true).delay( ((50 * $x)) ).animate({ left: 0 }, $hoverTransitionTime, $transitionCloseName);
            }

            $x++;
        }

        // Animating bottom and top lines to width: 25px and changing it's backgroundColor to almost red, as well as animating button text color to transparent.
        $bothLines.stop(true, true).addClass('halfway-open').removeClass('extended');
        $buttonText.stop(true, true).animate({ color: 'transparent' }, $animationTime, $transitionName);

        // Animating button padding to 0 38px, when this animation is halfway done, we're rotating top and bottom lines to make an X and disappearing middle lines.
        $button.stop(true, true).animate({ padding: '0 38px' }, ($animationTime - 150), $transitionName, function() {

            setTimeout(function() {
                $bothLines.stop(true, true).addClass('opened').removeClass('halfway-open');
            }, 150);

            $middleLines.stop(true, true).animate({ width: 0 }, 150, $transitionName);
        });
    }

    function closeNavigation() {
        // Variables
        $navigationActive = false;

        // Closing the navigation and moving each li to left by 300 pixels, as well as fading out footer, after the animation hiding the $navigation.
        $orderedNavigation.find('li.front-line').stop(true, true).animate({ left: '300px' }, $hoverTransitionTime, $transitionCloseName, function() {
            $navigation.stop(true, true).css({ right: '-300px' });
        });
        $navigation.find('footer').stop(true, true).animate({ opacity: 0 }, $hoverTransitionTime, $transitionCloseName);

        // Fading out and disappearing the .fadeMe background.
        $fade.stop(true, true).animate({ opacity: 0 }, $animationTime, $transitionCloseName, function() {
            $fade.delay(300).css({ display: 'none' });
        });

        $('html, body').css('overflow', 'auto');

        // Animating middle lines to width: 25px, after the animation we're rotating upper and bottom lines to horizontal line as well as extending it's width to 25 pixels. Changing button text color to make it look like it's fading in goes at the same time with top and bottom lines rotation.
        $middleLines.stop(true, true).animate({ width: '25px' }, ($animationTime - 225), $transitionCloseName, function(e) {
            $bothLines.stop(true, true).removeClass('opened halfway-open');
            $buttonText.stop(true, true).delay(100).animate({ color: 'white' }, $animationTime, $transitionCloseName);
        });
    }

    // Changing sections height property in coming-soon page
    function changeSectionHeight() {
        $section = $('section.landing-main');
        $section.css({ height: '100%' });
        $sectionHeight = $section.height();
        if( $(window).height() > 767 ) {
            $section.css({ height: 'calc(100vh - 75px)' });
        } else {
            $section.css({ height: 'calc(100vh - 55px)' });
        }

        if( $(window).height() < $sectionHeight ) $section.css({ height: '100%' });
    }
    changeSectionHeight();

    // Fade in Hero Panel heading text and button
    heroPanelFadeIn();

    // Center buttons with read more or other appearing buttons.
    centerButton('section.blog-posts .container .workshop-wrapper');
    centerButton('section.beyond-training-program .container .content .workshop-wrapper');

    if( $(window).width() < 768 ) {
        $height = $('section.background-video').outerHeight();
        $('section.background-video').css({ height: $height - 25 });
    }


    // Moving content up when you open 'The Bio's' tab when screen is higher than 992px
    if( $(window).width() > 992 ) {
        $('section.about-us-container .container ul.nav li').click(function() {
            $container = $('section.about-us-container .container');
            $backgroundPicture = $('section.about-us-container .background');
            $ul = $container.find('ul.nav');

            if( $(this).hasClass('bio') && !$(this).hasClass('active') || !$(this).hasClass('bio') && !$(this).hasClass('active') ) {
                $container.toggleClass('moved-up');
                $backgroundPicture.toggleClass('active');
                $ul.toggleClass('moved-up');
            }
        });
    }


    $('.button-div').find('span').on({
        mouseenter: function() {
            $(this).parent().find('button').stop(true, true).css({ transitionDuration: '700ms' }).addClass('active');
            $(this).parent().find('.button-wipe').stop(true, true).css({ transitionDuration: '700ms' }).addClass('active');
            $(this).css({ transitionDuration: '700ms' }).stop(true, true).addClass('active');
            $(this).find('i').css({ transitionDuration: '600ms' }).stop(true, true).addClass('active');
        },
        mouseleave: function() {
            $(this).parent().find('button').stop(true, true).css({ transitionDuration: '300ms' }).removeClass('active');
            $(this).parent().find('.button-wipe').stop(true, true).css({ transitionDuration: '300ms' }).removeClass('active');
            $(this).css({ transitionDuration: '600ms' }).stop(true, true).removeClass('active');
            $(this).find('i').stop(true, true).css({ transitionDuration: '500ms' }).removeClass('active');
        }
    });

    $blogPost.on({
        mouseenter: function() {
            $(this).find('img').css({ transitionDuration: '2000ms' }).addClass('active');
            $(this).find('.after-image').addClass('active');
        },
        mouseleave: function() {
            $(this).find('img').css({ transitionDuration: '500ms' }).removeClass('active');
            $(this).find('.after-image').removeClass('active');
        }
    });

    if( $(window).width() > 768 ) {
        $workshop.on({
            mouseenter: function() {
                $(this).find('a.workshop-button').addClass('active');
            },
            mouseleave: function() {
                $(this).find('a.workshop-button').removeClass('active');
            }
        });

        $workshopText.on({
            mouseenter: function() {
                $(this).addClass('active');
                $(this).children().addClass('active');
            },
            mouseleave: function() {
                $(this).removeClass('active');
                $(this).children().removeClass('active');
            }
        });
    }

    // Close navigation when you click outside of it.
    $(document).click(function (e)
    {
        if ( !$navigation.is(e.target) && !$button.is(e.target) )
        {
            if( $button.find('span').is(e.target) || $navigation.find('footer').is(e.target) || $navigation.find('footer').find('*').is(e.target) ) return false;
            closeNavigation();
        }
    });

    // Fade background opacity changes when hovering outside of the $navigation.
    $navigation.on({
        mouseenter: function() {

            // Changing the fade opacity to 0.8 if you enter in the $navigation with your mouse.
            if( $navigationActive ) fadeInOpacity();

        },
        mouseleave: function() {

            if( $navigationActive ) {
                // Checks if you hover over a close button when the navigation is active. If you're hovering over it, the fade background won't change and stay the same.
                // $button.one('mouseenter', function(e) { $fade.stop().css({ display: 'inherit' }).animate({ opacity: '0.8' }, $animationTime, $transitionName) });
                $button.one('mouseenter', function() { if($navigationActive) fadeInOpacity(); });

                // Changes the fade opacity to 0.5 if you hover over outside of the $navigation
                fadeOutOpacity();
            }

        }
    });

    // Hover over a li:a item, animation is sliding underline from left to right.
    $orderedNavigation.find('li a').on({
        mouseenter: function () {

            // Variables
            $line = $(this).parent().find('.dashed-line');
            $aWidth = $(this).width();
            $animation = { width: $aWidth};

            // Animating the line from left to right and changing the text color on hover.
            $line.stop().animate($animation, $hoverTransitionTime, $transitionName);
            $(this).stop().animate({ color: '#eb5b5b' }, $hoverTransitionTime, $transitionName);
        },
        mouseleave: function () {

            // Variables
            $line = $(this).parent().find('.dashed-line');

            // Animating the line from right to left and making it disappear and changing the text color to white on hover out.
            $line.stop().animate({ width: 0 }, $animationTime, $transitionCloseName);
            $(this).stop().animate({ color: 'white' }, $animationTime, $transitionCloseName);
        }
    });

    // Hover over on navigation footer, opacity animation.
    $navigation.find('footer').on({
        mouseenter: function () {
            $(this).stop().animate({ opacity: '1' }, $animationTime, $transitionName);
        },
        mouseleave: function () {
            $(this).stop().animate({ opacity: '0.4' }, $animationTime, $transitionCloseName);
        }
    });


    // Hover over a hamburger menu text and icon in the header.
    $button.on({
        click: function() {
            if( !$navigationActive ) {
                openNavigation();
            } else {
                closeNavigation();
            }
        },
        mouseenter: function () {

            // ON MOUSE ENTER BUTTON [NAVIGATION IS NOT ACTIVE]: Changing button padding to center the text when the upper and bottom lines extends to 80 pixels and gets red. Then we hide the middle lines and make their width 0 pixels.
            if( !$navigationActive ) {
                $button.stop(true, true).animate({ padding: '0 21px' }, 0, $transitionName);
                // $bothLines.stop(true, true).animate({ width: '80px', backgroundColor: '#bf3e3e' }, 0, $transitionName);
                $bothLines.addClass('extended');
                $middleLines.stop(true, true).animate({ width: 0 }, 0, $transitionName);
            }

            // if( !$navigationActive ) {
            //     $bothLines.stop(true, true).animate({ width: '80px', backgroundColor: '#bf3e3e' }, 150, $transitionName, function() {
            //         $button.stop(true, true).animate({ padding: '0 21px' }, 150, $transitionName);
            //     })
            //     $middleLines.stop(true, true).animate({ width: 0 }, 150, $transitionName);
            // }

        },
        mouseleave: function () {

            // ON MOUSE LEAVE BUTTON [NAVIGATION IS NOT ACTIVE]: Changing button padding to align text to left from the lines and shrink lines to 25 pixels wide and set white color. Also appear middle lines.
            if( !$navigationActive ) {
                $button.stop(true, true).animate({ padding: '0 38px', width: 'inherit' }, 0, $transitionCloseName);
                // $bothLines.stop(true, true).animate({ width: '25px', backgroundColor: 'white' }, 0, $transitionCloseName);
                $bothLines.removeClass('extended');
                $middleLines.stop(true, true).animate({ width: '25px' }, 0, $transitionCloseName);
                $buttonText.stop(true, true).delay(200).animate({ color: 'white' }, $animationTime, $transitionCloseName);
            }
        }
    });
});