/*
  Games UX Summit 2026 - Retro TV Website
  Simplified JavaScript for essential functionality
*/

$(document).ready(function() {
    
    // Countdown to Games UX Summit 2026 — 14 October 2026
    var eventDate = new Date('2026-10-14T09:00:00');

    function pad(n) {
        return n < 10 ? '0' + n : '' + n;
    }

    function updateCountdown() {
        var now = new Date();
        var diff = eventDate - now;

        if (diff <= 0) {
            $('.countdown-days').text('00');
            $('.countdown-hours').text('00');
            $('.countdown-mins').text('00');
            $('.countdown-secs').text('00');
            $('.countdown-title').text('EVENT LIVE!');
            return;
        }

        var days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var secs  = Math.floor((diff % (1000 * 60)) / 1000);

        $('.countdown-days').text(pad(days));
        $('.countdown-hours').text(pad(hours));
        $('.countdown-mins').text(pad(mins));
        $('.countdown-secs').text(pad(secs));
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Enhanced TV Screen effects
    function createTVNoise() {
        var canvas = $('.tv-glass canvas')[0];
        if (!canvas) return;
        
        var ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        function drawNoise() {
            var imageData = ctx.createImageData(canvas.width, canvas.height);
            var data = imageData.data;

            for (var i = 0; i < data.length; i += 4) {
                var noise = Math.random() * 255;
                data[i] = noise * 0.1;     // Red
                data[i + 1] = noise * 0.3; // Green  
                data[i + 2] = noise * 0.1; // Blue
                data[i + 3] = noise * 0.1; // Alpha
            }

            ctx.putImageData(imageData, 0, 0);
        }

        // Animate the noise
        setInterval(drawNoise, 100);
    }

    // Initialize TV noise effect
    createTVNoise();

    // =====================
    // TV Channel Carousel
    // =====================
    var currentSlide = 0;
    var totalSlides = $('.tv-slide').length;
    var isGlitching = false;

    function triggerChannelSwitch(direction) {
        if (isGlitching || totalSlides === 0) return;
        isGlitching = true;

        var $overlay = $('.tv-glitch-overlay');
        $overlay.addClass('glitching');

        setTimeout(function() {
            $('.tv-slide.active').removeClass('active');

            if (direction === 'next') {
                currentSlide = (currentSlide + 1) % totalSlides;
            } else {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            }

            $('[data-slide="' + currentSlide + '"]').addClass('active');

            $overlay.removeClass('glitching');
            isGlitching = false;
        }, 200);
    }

    $('.tv-btn-next').on('click', function() { triggerChannelSwitch('next'); });
    $('.tv-btn-prev').on('click', function() { triggerChannelSwitch('prev'); });

    // Also allow keyboard arrow keys when on the page
    $(document).on('keydown', function(e) {
        if (e.which === 39) triggerChannelSwitch('next'); // right arrow
        if (e.which === 37) triggerChannelSwitch('prev'); // left arrow
    });

    // Summit Text Animation Sequence
    function animateSummitText() {
        var $title = $('.summit-title');
        var $subtitle = $('.summit-subtitle');
        var $year = $('.summit-year');
        var $date = $('.summit-date');

        // Initially hide all elements
        $title.css('opacity', '0');
        $subtitle.css('opacity', '0');
        $year.css('opacity', '0');
        $date.css('opacity', '0');

        // Animate them in sequence
        setTimeout(() => $title.animate({opacity: 1}, 500), 500);
        setTimeout(() => $subtitle.animate({opacity: 1}, 500), 1000);
        setTimeout(() => $year.animate({opacity: 1}, 800), 1500);
        setTimeout(() => $date.animate({opacity: 1}, 500), 2300);
    }

    // Start the text animation after page load
    setTimeout(animateSummitText, 1000);

    // Console power button effect
    $('.console-power-indicator').click(function() {
        $(this).toggleClass('powered-off');
        if ($(this).hasClass('powered-off')) {
            $(this).css('background', '#333');
            $('.tv-content-text').fadeOut(300);
        } else {
            $(this).css('background', '#ff0000');
            $('.tv-content-text').fadeIn(300);
        }
    });

    // TV power button 
    $('.pw-btn').click(function(e) {
        e.preventDefault();
        $('.tv-content-text').fadeToggle(500);
        $('.tv-glass-vintage').fadeToggle(500);
        return false;
    });

    // Controller button interactions
    $('.controller-nes-btn i').mousedown(function() {
        $(this).css('transform', 'scale(0.9)');
    }).mouseup(function() {
        $(this).css('transform', 'scale(1)');
    });

    // D-pad interaction
    $('.controller-nes-pad').click(function() {
        // Cycle through different summit info
        var infos = [
            {
                title: 'GAMES UX',
                subtitle: 'SUMMIT', 
                year: '2026',
                date: 'APRIL 9-11'
            },
            {
                title: 'USER EXP',
                subtitle: 'DESIGN',
                year: '2026', 
                date: 'APRIL 9-11'
            },
            {
                title: 'GAME DEV',
                subtitle: 'FUTURE',
                year: '2026',
                date: 'APRIL 9-11'
            },
            {
                title: 'GAMES UX',
                subtitle: 'SUMMIT',
                year: '2026',
                date: 'APRIL 9-11'
            }
        ];

        var currentIndex = parseInt($(this).data('info-index') || '0');
        var nextIndex = (currentIndex + 1) % infos.length;
        $(this).data('info-index', nextIndex);

        var info = infos[nextIndex];
        
        $('.summit-title').fadeOut(200, function() {
            $(this).text(info.title).fadeIn(200);
        });
        $('.summit-subtitle').fadeOut(200, function() {
            $(this).text(info.subtitle).fadeIn(200);
        });
        $('.summit-year').fadeOut(200, function() {
            $(this).text(info.year).fadeIn(200);
        });
        $('.summit-date').fadeOut(200, function() {
            $(this).text(info.date).fadeIn(200);
        });
    });

    // Add some interactivity to the poster
    $('.wall-poster').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
            $(this).css('transition', 'transform 0.3s ease');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // Screen flicker effect on mouse movement
    var lastFlicker = 0;
    $(document).mousemove(function(e) {
        var now = Date.now();
        if (now - lastFlicker > 100) { // Throttle to avoid too much flickering
            $('.tv-content-text').addClass('flicker');
            setTimeout(() => $('.tv-content-text').removeClass('flicker'), 50);
            lastFlicker = now;
        }
    });

    // Add flicker class CSS dynamically
    $('<style>')
        .prop('type', 'text/css')
        .html('.flicker { opacity: 0.8; transition: opacity 0.05s; }')
        .appendTo('head');

    // Ambient sound simulation (visual feedback)
    function createAmbientEffect() {
        setInterval(function() {
            if (Math.random() < 0.1) { // 10% chance every interval
                $('.tv-noise').css('opacity', Math.random() * 0.5 + 0.1);
                setTimeout(() => {
                    $('.tv-noise').css('opacity', '0.3');
                }, 100);
            }
        }, 200);
    }

    createAmbientEffect();

    // Easter egg: Konami code
    var konamiCode = [];
    var pattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A

    $(document).keydown(function(e) {
        konamiCode.push(e.which);
        if (konamiCode.length > pattern.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === pattern.length) {
            var match = true;
            for (var i = 0; i < pattern.length; i++) {
                if (konamiCode[i] !== pattern[i]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                // Secret summit message
                $('.tv-content-text').html(`
                    <div class="summit-title">RETRO</div>
                    <div class="summit-subtitle">UNLOCK</div>
                    <div class="summit-year">∞</div>
                    <div class="summit-date">ETERNAL</div>
                `);
                
                // Add special effect
                $('.tv-glass').css('background', 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 100%)');
                
                setTimeout(() => {
                    location.reload(); // Reset after 3 seconds
                }, 3000);
                
                konamiCode = []; // Reset the code
            }
        }
    });

    console.log('🎮 Games UX Summit 2026 - Retro TV Experience Ready!');
    console.log('💡 Try clicking the D-pad, power button, or controller buttons!');
    console.log('🎯 Easter egg: Try the Konami code... ↑↑↓↓←→←→BA');
});