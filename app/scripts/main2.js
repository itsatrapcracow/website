 /* global $ Snap */
'use strict';
(function () {
    function prepareApp() {
        var app = {};

        app.isMobile = function() {
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
               return true;
            }
            return false;
        };
        /* jshint ignore:start */
        //app.booking = new TimekitBooking();
        /* jshint ignore:end */
        app.ui = {
            body: $('body'),
            scrollNav: $('.scroll-nav'),
            snapNext: $('.scroll-nav-down'),
            snapPrev: $('.scroll-nav-up'),
            menuLink: $('.toggle-menu'),
            bookLink: $('.book-now'),
            fixedBookLink: $('.fixed-navs-item.book-now'),
            fixedNavs: $('.fixed-navs'),
            splashMenu: $('.splash-menu'),
            galleryImg: $('.section-gallery-list-item'),
            galleryZoom: $('.section-gallery-zoom-item'),
            commentsDots: $('.comments-dots-item'),
            comments: $('.comment')
        };

        app.bindEvents = function() {
            this.ui.bookLink.on('click', function() {
                this.ui.menuLink.removeClass('active');
                this.ui.body.addClass('with-splash-book');
                this.ui.fixedNavs.addClass('hidden');
                //app.booking.render();
            }.bind(this));

            this.ui.menuLink.on('click', function() {
                this.ui.menuLink.toggleClass('active');
                this.ui.body.toggleClass('with-splash-menu').removeClass('with-splash-book');
            }.bind(this));

            this.ui.splashMenu.on('click', 'a', function() {
                  this.ui.menuLink.removeClass('active');
                  this.ui.body.removeClass('with-splash-menu');
            }.bind(this));

            this.ui.galleryImg.on('click', this.zoomImage);
            this.ui.commentsDots.on('click', function(e){
                this.changeQuote($(e.currentTarget).data('id'));
            }.bind(this));
        };

        app.closeBooking = function(){
            this.ui.body.removeClass('with-splash-book');
            this.ui.fixedNavs.removeClass('hidden');
        };

        app.checkProportions = function() {
            var windowWidth = $(window).width(),
                windowHeight = $(window).height(),
                proportions = windowWidth / windowHeight;

            if (proportions > 1.50 && windowWidth > 1024 && !this.isMobile()) {
                var fontSize = windowHeight * 0.135;
                $('body').addClass('full-page');
                $('body, .column').css('font-size', fontSize + 'px');
                $('body').panelSnap('enable');
            } else {
                $('body').removeClass('full-page');
                $('body, .column').css('font-size', '9vw');
                $('body').panelSnap('disable');
                app.loadDefaultSVG();
            }
        };

        app.setPanelSnap = function() {
            var self = this;
            var options = {
                $menu: $('.splash-menu, .scroll-nav, .rooms-columns'),
                menuSelector: '[data-panel]',
                navigation: {
                    buttons: {
                        $nextButton: self.ui.snapNext,
                        $prevButton: self.ui.snapPrev
                    }
                },
                panelSelector: '.panel',
                namespace: '.panelSnap',
                onSnapStart: function() {},
                onSnapFinish: function(panel) {
                    if (panel.data('panel') === 'attic' && !panel.hasClass('jsLoaded')) {
                        app.animateAttic();
                        app.loadRoom(panel);
                    }
               },
                directionThreshold: 30,
                slideSpeed: 300
            };

            $('body').panelSnap(options);
        };

        //AnimateRoom
        app.loadRoom = function(panel) {
            panel.addClass('jsLoaded');
            setTimeout(function(){
                setTimeout(function(){ panel.find('.room-section-svg-wrapper').addClass('loaded'); }, 100);
                setTimeout(function(){ panel.find('.room-section-header').addClass('loaded'); }, 800);
                setTimeout(function(){ panel.find('.room-column:eq(0)').addClass('loaded'); }, 1700);
                setTimeout(function(){ panel.find('.room-column:eq(1)').addClass('loaded'); }, 2000);
                setTimeout(function(){ panel.find('.room-column:eq(2)').addClass('loaded'); }, 2300);

                setTimeout(function(){ panel.find('.room-paragraph').addClass('loaded'); }, 3100);
                setTimeout(function(){ panel.find('.button').addClass('loaded'); }, 3700);
            }, 4000);
        };

        //comments slider
        app.changeQuote = function(id) {
            app.ui.comments.removeClass('active');
            app.ui.commentsDots.removeClass('active');
            setTimeout(function () {
                app.ui.comments.closest('[data-id="' + id + '"]').addClass('active');
                app.ui.commentsDots.closest('[data-id="' + id + '"]').addClass('active');
            }, 600);
        };
        // app.quoteAutoplayInterval = false;
        // app.quoteAutoplay = function(){
        //   console.log(app.ui.comments.closest('.active'));
        //
        // }

        //Zoom Gallery images
        app.zoomImage = function(e) {
            var src = $(e.currentTarget).find('img').attr('src');
            app.ui.galleryZoom.addClass('active').css('background-image', 'url(' + src + ')');
        };

        //Playing with SVG
        app.loadDefaultSVG = function(){
            $('.atticSvgContainer').html('');
            var animSnap = Snap;
            var svg = animSnap('.atticSvgContainer');
            animSnap.load('/images/svg/attic-icon-def.svg', function(icon){
              svg.append(icon.select('#styles'));
              svg.append(icon.select('#icon'));
              svg.append(icon.select('#text'));

              svg.select('#innerCircle').attr({mask: icon.select('#clipTriangle')});
              svg.select('#bigTriangles').attr({mask: icon.select('#clipSmallCircles')});
              svg.select('#angleLines').attr({mask: icon.select('#clipSmallCircles2')});
              svg.select('#icon').attr({mask: icon.select('#clipKey')});

            });
        };
        app.animateAttic = function() {
            $('.atticSvgContainer').html('');
            var animSnap = Snap;
            var svg = animSnap('.atticSvgContainer');
            animSnap.load('/images/svg/attic-icon.svg', function (icon){

                svg.append(icon.select('#styles'));
                svg.append(icon.select('#icon'));
                svg.append(icon.select('#text'));

                svg.select('#innerCircle').attr({mask: icon.select('#clipTriangle')});
                svg.select('#bigTriangles').attr({mask: icon.select('#clipSmallCircles')});
                svg.select('#angleLines').attr({mask: icon.select('#clipSmallCircles2')});
                svg.select('#icon').attr({mask: icon.select('#clipKey')});

                setTimeout(function(){
                    svg.select('#outerCircle').animate({'stroke-dashoffset': 0}, 5250);
                    setTimeout(function(){ svg.select('#bigLine1').animate({'stroke-dashoffset': 0}, 1500); }, 750);
                    setTimeout(function(){ svg.select('#bigLine2').animate({'stroke-dashoffset': 0}, 1500); }, 1500);
                    setTimeout(function(){ svg.select('#bigLine3').animate({'stroke-dashoffset': 0}, 1500); }, 2250);

                    setTimeout(function(){ svg.select('#bigLine4').animate({'stroke-dashoffset': 0}, 1500); }, 750);
                    setTimeout(function(){ svg.select('#bigLine5').animate({'stroke-dashoffset': 0}, 1500); }, 1500);
                    setTimeout(function(){ svg.select('#bigLine6').animate({'stroke-dashoffset': 0}, 1500); }, 2250);

                    setTimeout(function(){svg.select('#innerCircle').animate({'stroke-dashoffset': 0}, 2250); }, 1500);

                    setTimeout(function(){svg.select('#angleLine1').animate({'stroke-dashoffset': 0}, 750); }, 3000);
                    setTimeout(function(){svg.select('#angleLine2').animate({'stroke-dashoffset': 0}, 750); }, 3000);
                    setTimeout(function(){svg.select('#angleLine3').animate({'stroke-dashoffset': 0}, 750); }, 3000);

                    setTimeout(function(){svg.select('#smallCircle2').animate({'stroke-dashoffset': 0}, 450); }, 1125);
                    setTimeout(function(){svg.select('#smallCircle5').animate({'stroke-dashoffset': 0}, 450); }, 1125);
                    setTimeout(function(){svg.select('#smallCircle1').animate({'stroke-dashoffset': 0}, 450); }, 1875);
                    setTimeout(function(){svg.select('#smallCircle4').animate({'stroke-dashoffset': 0}, 450); }, 1875);
                    setTimeout(function(){svg.select('#smallCircle3').animate({'stroke-dashoffset': 0}, 450); }, 2625);
                    setTimeout(function(){svg.select('#smallCircle6').animate({'stroke-dashoffset': 0}, 450); }, 2625);

                    setTimeout(function(){svg.select('#smallLine2').animate({'stroke-dashoffset': 0}, 1500); }, 1425);
                    setTimeout(function(){svg.select('#smallLine5').animate({'stroke-dashoffset': 0}, 1500); }, 1425);
                    setTimeout(function(){svg.select('#smallLine3').animate({'stroke-dashoffset': 0}, 1500); }, 2125);
                    setTimeout(function(){svg.select('#smallLine4').animate({'stroke-dashoffset': 0}, 1500); }, 2125);
                    setTimeout(function(){svg.select('#smallLine1').animate({'stroke-dashoffset': 0}, 1500); }, 2925);
                    setTimeout(function(){svg.select('#smallLine6').animate({'stroke-dashoffset': 0}, 1500); }, 2925);

                    setTimeout(function(){svg.select('#middleCircle').animate({'stroke-dashoffset': 0}, 450); }, 2250);
                    setTimeout(function(){svg.select('#key').animate({'opacity': 1}, 1000); }, 3000);
                    setTimeout(function(){svg.select('#clipKeyPath').animate({'opacity': 1}, 500); }, 3000);
                    setTimeout(function(){svg.select('#textBgr').animate({'opacity': 1}, 500); }, 3500);
                    setTimeout(function(){svg.select('#text').animate({'opacity': 1}, 500); }, 3700);

                }, 100);
            });
        };

        //app.booking = new TimekitBooking();
        app.bookingConfig = {
            name: 'Tajemnica Rodu Cromwell',
            email: 'itsatrapescape@gmail.com',
            apiToken: '3D7sVhBPvB9X2iXcpEgQ0KtnGJhMJ6Dz',
            calendar: '43c56a63-1886-423d-ad3f-6d9ea02241df',
            avatar: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
            bookingGraph: 'confirm_decline',
            timekitFindTime: {
                filters: {
                    or: [
                        { 'specific_time': {'start': 13, 'end': 14} },
                        { 'specific_time': {'start': '14:30', 'end': '15:30'} },
                        { 'specific_time': {'start': 16, 'end': 17} },
                        { 'specific_time': {'start': '17:30', 'end': '18:30'} },
                        { 'specific_time': {'start': 19, 'end': 20} },
                        { 'specific_time': {'start': '20:30', 'end': '21:30'} },
                        { 'specific_time': {'start': 22, 'end': 23} }
                    ]
                },
                future: '6 months',
                length: '1 hours'
              //  ignore_all_day_events: true // eslint-disable-line no-use-before-define
            },
            fullCalendar: {
                businessHours: false,
                lang: 'pl',
                height: 'auto',
                contentHeight: 'auto',
                minTime: '13:00:00',
                maxTime: '24:00:00',
                timeFormat: 'H:mm',
                dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
                dayNamesShort: ['NIE', 'PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB'],
                monthNames: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipies', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
                monthNamesShort: [ 'Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
                views: {
                   agenda: {
                       columnFormat: 'ddd \n DD MMM'
                   }
                },
                firstDay: '1',
                nowIndicator: false,
                customButtons: {
                    closeButton: {
                        text: 'Zamknij',
                        click: function() {
                            app.closeBooking();
                        }
                    }

                },
                buttonText: {
                     today: 'Dzisiaj'
                },
                header: {
                   right: 'today, prev, next, closeButton'
                }
            },
            localization: {
                showTimezoneHelper: false,
                timeDateFormat: '24h-dmy-mon',
                bookingDateFormat: 'MMMM D, YYYY', // Override the default date format on the booking page
                bookingTimeFormat: 'h:mma',
                strings: {
                    submitText: 'Rezerwuj',
                    successMessageTitle: 'Dziękujemy za rezerwację!',
                    successMessageBody: 'Na twój adres email zostało wysłane potwierdzenie rezerwacji.',
                    timezoneHelperLoading: 'Ładowanie..'
                }
            },
            bookingFields: {
                name: {
                  placeholder: 'Imię i nazwisko',
                  prefilled: false,
                  locked: false
                },
                email: {
                  placeholder: 'Adres E-mail',
                  prefilled: false,
                  locked: false
                },
                phone: {
                  placeholder: 'Numer telefonu',
                  prefilled: false,
                  locked: false,
                  required: true,
                  enabled: true
                },
                comment: {
                  enabled: true,
                  placeholder: 'Komentarz (np. grupa anglojęzyczna)',
                  prefilled: false,
                  required: false,
                  locked: false
                }
            }
        };

        return app;
    }

    $(document).ready(function(){
        var app = prepareApp();
        app.setPanelSnap();
        app.checkProportions();
        app.bindEvents();
        //app.quoteAutoplayInterval =  setInterval(function(){ app.quoteAutoplay() }, 1000);
        //app.booking.init(app.bookingConfig);

        setTimeout(function(){
            $('body').addClass('loaded');
            window.scrollTo(0, 0);
        }, 3000);

        $(window).on('resize', function(){
            app.checkProportions();
        });
    });
})();
