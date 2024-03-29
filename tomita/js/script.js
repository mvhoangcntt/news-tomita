(function() {
    var $;
    $ = this.jQuery || window.jQuery;
    win = $(window), body = $('body'), doc = $(document);

    $.fn.hc_accordion = function() {
        var acd = $(this);
        acd.find('ul>li').each(function(index, el) {
            if ($(el).find('ul li').length > 0) $(el).prepend('<button type="button" class="acd-drop"></button>');
        });
        acd.on('click', '.acd-drop', function(e) {
            e.preventDefault();
            var ul = $(this).nextAll("ul");
            if (ul.is(":hidden") === true) {
                ul.parent('li').parent('ul').children('li').children('ul').slideUp(180);
                ul.parent('li').parent('ul').children('li').children('.acd-drop').removeClass("active");
                $(this).addClass("active");
                ul.slideDown(180);
            } else {
                $(this).removeClass("active");
                ul.slideUp(180);
            }
        });
    }

    $.fn.hc_menu = function(options) {
        var settings = $.extend({
                open: '.open-mnav',
            }, options),
            this_ = $(this);
        var m_nav = $('<div class="m-nav"><button class="m-nav-close">&times;</button><div class="nav-ct"></div></div>');
        body.append(m_nav);

        m_nav.find('.m-nav-close').click(function(e) {
            e.preventDefault();
            mnav_close();
        });

        m_nav.find('.nav-ct').append(this_.children().clone());

        var mnav_open = function() {
            m_nav.addClass('active');
            body.append('<div class="m-nav-over"></div>').css('overflow', 'hidden');
        }
        var mnav_close = function() {
            m_nav.removeClass('active');
            body.children('.m-nav-over').remove();
            body.css('overflow', '');
        }

        doc.on('click', settings.open, function(e) {
            e.preventDefault();
            if (win.width() <= 1199) mnav_open();
        }).on('click', '.m-nav-over', function(e) {
            e.preventDefault();
            mnav_close();
        });

        m_nav.hc_accordion();
    }

    $.fn.hc_countdown = function(options) {
        var settings = $.extend({
                date: new Date().getTime() + 1000 * 60 * 60 * 24,
            }, options),
            this_ = $(this);

        var countDownDate = new Date(settings.date).getTime();

        var count = setInterval(function() {
            var now = new Date().getTime();
            var distance = countDownDate - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this_.html('<div class="item"><span>' + days + '</span> ngày</div>' +
                '<div class="item"><span>' + hours + '</span> giờ</div>' +
                '<div class="item"><span>' + minutes + '</span> phút </div>' +
                '<div class="item"><span>' + seconds + '</span> giây </div>'
            );
            if (distance < 0) {
                clearInterval(count);
            }
        }, 1000);
    }

    $.fn.hc_upload = function(options) {
        var settings = $.extend({
                multiple: false,
                result: '.hc-upload-pane',
            }, options),
            this_ = $(this);

        var input_name = this_.attr('name');
        this_.removeAttr('name');

        this_.change(function(e) {
            if ($(settings.result).length > 0) {
                var files = event.target.files;
                if (settings.multiple) {
                    for (var i = 0, files_len = files.length; i < files_len; i++) {
                        var path = URL.createObjectURL(files[i]);
                        var name = files[i].name;
                        var size = Math.round(files[i].size / 1024 / 1024 * 100) / 100;
                        var type = files[i].type.slice(files[i].type.indexOf('/') + 1);

                        var img = $('<img src="' + path + '">');
                        var input = $('<input type="hidden" name="' + input_name + '[]"' +
                            '" value="' + path +
                            '" data-name="' + name +
                            '" data-size="' + size +
                            '" data-type="' + type +
                            '" data-path="' + path +
                            '">');
                        var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img).append(input);
                        $(settings.result).append(elm);
                    }
                } else {
                    var path = URL.createObjectURL(files[0]);
                    var img = $('<img src="' + path + '">');
                    var elm = $('<div class="hc-upload"><button type="button" class="hc-del smooth">&times;</button></div>').append(img);
                    $(settings.result).html(elm);
                }
            }
        });

        body.on('click', '.hc-upload .hc-del', function(e) {
            e.preventDefault();
            this_.val('');
            $(this).closest('.hc-upload').remove();
        });
    }

}).call(this);


jQuery(function($) {
    var win = $(window),
        body = $('body'),
        doc = $(document);

    var FU = {
        get_Ytid: function(url) {
            var rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            if (url) var arr = url.match(rx);
            if (arr) return arr[1];
        },
        get_currency: function(str) {
            if (str) return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        animate: function(elems) {
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function() {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function() {
                    $this.removeClass($animationType);
                });
            });
        },
    };

    var UI = {
        mMenu: function() {

        },
        header: function() {
            var elm = $('header'),
                h = elm.innerHeight(),
                offset = 200,
                mOffset = 0;
            var fixed = function() {
                elm.addClass('fixed');
                body.css('margin-top', h);
            }
            var unfixed = function() {
                elm.removeClass('fixed');
                body.css('margin-top', '');
            }
            var Mfixed = function() {
                elm.addClass('m-fixed');
                body.css('margin-top', h);
            }
            var unMfixed = function() {
                elm.removeClass('m-fixed');
                body.css('margin-top', '');
            }
            if (win.width() > 991) {
                win.scrollTop() > offset ? fixed() : unfixed();
            } else {
                win.scrollTop() > mOffset ? Mfixed() : unMfixed();
            }
            win.scroll(function(e) {
                if (win.width() > 991) {
                    win.scrollTop() > offset ? fixed() : unfixed();
                } else {
                    win.scrollTop() > mOffset ? Mfixed() : unMfixed();
                }
            });
        },
        backTop: function() {
            var back_top = $('.back-to-top'),
                offset = 800;

            back_top.click(function() {
                $("html, body").animate({ scrollTop: 0 }, 800);
                return false;
            });

            if (win.scrollTop() > offset) {
                back_top.fadeIn(200);
            }

            win.scroll(function() {
                if (win.scrollTop() > offset) back_top.fadeIn(200);
                else back_top.fadeOut(200);
            });
        },
        slider: function() {
            /*$('.slider-cas').slick({
            	nextArrow: '<img src="images/next.png" class="next" alt="Next">',
            	prevArrow: '<img src="images/prev.png" class="prev" alt="Prev">',
            })
            FU.animate($(".slider-cas .slick-current [data-animation ^= 'animated']"));
            $('.slider-cas').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            	if(currentSlide!=nextSlide){
            		var aniElm = $(this).find('.slick-slide').find("[data-animation ^= 'animated']");
            		FU.animate(aniElm);
            	}
            });*/

            /*$('.pro-cas').slick({
	            slidesToShow: 4,
	            slidesToScroll: 1,
	            nextArrow: '<i class="cas-arrow smooth next"></i>',
	            prevArrow: '<i class="cas-arrow smooth prev"></i>',
	            dots: true,
	            autoplay: true,
	            swipeToSlide: true,
	            autoplaySpeed: 4000,
	            responsive: [
	            {
	                breakpoint: 1199,
	                settings: {
	                    slidesToShow: 3,
	                }
	            },
	            {
	                breakpoint: 991,
	                settings: {
	                    slidesToShow: 3,
	                }
	            },
	            {
	                breakpoint: 700,
	                settings: {
	                    slidesToShow: 2,
	                }
	            },
	            {
	                breakpoint: 480,
	                settings: {
	                    slidesToShow: 1,
	                }
	            }
	            ],
	        })*/

            $('.sl-home').owlCarousel({
                items: 1,
		        loop: true,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                responsiveClass: true,
                nav: false,
                dots: true,
                autoplay: true,
                autoPlaySpeed: 8000,
                autoplayTimeout: 8000,
                smartSpeed: 800,
                /*navClass: ["sl-arrow prev", "sl-arrow next"],
                navText: ["<i class='arrow_left_alt'></i>", "<i class='arrow_right_alt'></i>"],*/
                onChanged: slider_change,
		    })
            function slider_change(e) {
                var aniElm = $('.sl-home .owl-item').eq(e.item['index']).find("[data-animation ^= 'animated']");
                FU.animate(aniElm);
            }

            var member = $('.member-cas').owlCarousel({
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                loop: true,
                responsiveClass:true,
                nav: true,
                smartSpeed: 100,
                items: 1,
                margin: 0,
                navText: ["<span class='smooth arrow-cas prev'></span>", "<span class='smooth arrow-cas next'></span>"],
                onChanged: callback,
                // onInitialized: business_load,
            })
            function callback(event) {
                if(event.page['index'] != '-1'){
                    $('.member-list .item.active').removeClass('active');
                    $('.member-list .item').eq(event.page['index']).addClass('active');
                }
            }
            $('.member-list .item').click(function(e) {
                e.preventDefault();
                var this_ = $(this);
                $('.member-list .item.active').removeClass('active');
                this_.addClass('active');
                member.trigger('to.owl.carousel', this_.index());
            });
            // end member carousel


            $('.cas-gallery').owlCarousel({
                loop: false,
                margin: 30,
                dots: false,
                nav: true,
                navText: ["<span class='smooth arrow-cas prev'></span>", "<span class='smooth arrow-cas next'></span>"],
                autoplay: false,
                autoplayTimeout: 5000,
                smartSpeed: 800,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        stagePadding: 30,
                        margin: 10,
                    },
                    450: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    },
                    1199: {
                        items: 3,
                    },
                    1366: {
                        items: 3,
                    }
                }
            });
            $('.cas-member').owlCarousel({
                loop: false,
                responsiveClass: true,
                nav: true,
                dots: false,
                dotsClass: 'dots',
                smartSpeed: 500,
                margin: 30,
                autoplay: false,
                autoplayTimeout: 5000,
                navClass: ["slide-icon prev", "slide-icon next"],
                navText: ["<i class='arrow_left_alt'></i>", "<i class='arrow_right_alt'></i>"],
                responsive: {
                    1199: {
                        items: 5,
                    },
                    991: {
                        items: 4,
                    },
                    768: {
                        items: 3,
                    },
                    0: {
                        items: 3,
                    }
                }
            });
        },
        input_number: function() {
            doc.on('keydown', '.numberic', function(event) {
                if (!(!event.shiftKey &&
                        !(event.keyCode < 48 || event.keyCode > 57) ||
                        !(event.keyCode < 96 || event.keyCode > 105) ||
                        event.keyCode == 46 ||
                        event.keyCode == 8 ||
                        event.keyCode == 190 ||
                        event.keyCode == 9 ||
                        event.keyCode == 116 ||
                        (event.keyCode >= 35 && event.keyCode <= 39)
                    )) {
                    event.preventDefault();
                }
            });
            doc.on('click', '.i-number .up', function(e) {
                e.preventDefault();
                var input = $(this).parents('.i-number').children('input');
                var max = Number(input.attr('max')),
                    val = Number(input.val());
                if (!isNaN(val)) {
                    if (!isNaN(max) && input.attr('max').trim() != '') {
                        if (val >= max) {
                            return false;
                        }
                    }
                    input.val(val + 1);
                    input.trigger('number.up');
                }
            });
            doc.on('click', '.i-number .down', function(e) {
                e.preventDefault();
                var input = $(this).parents('.i-number').children('input');
                var min = Number(input.attr('min')),
                    val = Number(input.val());
                if (!isNaN(val)) {
                    if (!isNaN(min) && input.attr('max').trim() != '') {
                        if (val <= min) {
                            return false;
                        }
                    }
                    input.val(val - 1);
                    input.trigger('number.down');
                }
            });
        },
        yt_play: function() {
            doc.on('click', '.yt-box .play', function(e) {
                var id = FU.get_Ytid($(this).closest('.yt-box').attr('data-url'));
                $(this).closest('.yt-box iframe').remove();
                $(this).closest('.yt-box').append('<iframe src="https://www.youtube.com/embed/' + id + '?rel=0&amp;autoplay=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
            });
        },
        psy: function() {
            var btn = '.psy-btn',
                sec = $('.psy-section'),
                pane = '.psy-pane';
            doc.on('click', btn, function(e) {
                e.preventDefault();
                $(this).closest(pane).find(btn).removeClass('active');
                $(this).addClass('active');
                $("html, body").animate({ scrollTop: $($(this).attr('href')).offset().top - 40 }, 600);
            });

            var section_act = function() {
                sec.each(function(index, el) {
                    if (win.scrollTop() + (win.height() / 2) >= $(el).offset().top) {
                        var id = $(el).attr('id');
                        $(pane).find(btn).removeClass('active');
                        $(pane).find(btn + '[href="#' + id + '"]').addClass('active');
                    }
                });
            }
            section_act();
            win.scroll(function() {
                section_act();
            });
        },
        toggle: function() {
            var ani = 100;
            $('[data-show]').each(function(index, el) {
                var ct = $($(el).attr('data-show'));
                $(el).click(function(e) {
                    e.preventDefault();
                    ct.fadeToggle(ani);
                });
            });
            win.click(function(e) {
                $('[data-show]').each(function(index, el) {
                    var ct = $($(el).attr('data-show'));
                    if (ct.has(e.target).length == 0 && !ct.is(e.target) && $(el).has(e.target).length == 0 && !$(el).is(e.target)) {
                        ct.fadeOut(ani);
                    }
                });
            });
        },
        uiCounterup: function() {
            var item = $('.hc-couter'),
                flag = true;
            if (item.length > 0) {
                run(item);
                win.scroll(function() {
                    if (flag == true) {
                        run(item);
                    }
                });

                function run(item) {
                    if (win.scrollTop() + 70 < item.offset().top && item.offset().top + item.innerHeight() < win.scrollTop() + win.height()) {
                        count(item);
                        flag = false;
                    }
                }

                function count(item) {
                    item.each(function() {
                        var this_ = $(this);
                        var num = Number(this_.text().replace(".", ""));
                        var incre = num / 80;

                        function start(counter) {
                            if (counter <= num) {
                                setTimeout(function() {
                                    this_.text(FU.get_currency(Math.ceil(counter)));
                                    counter = counter + incre;
                                    start(counter);
                                }, 20);
                            } else {
                                this_.text(FU.get_currency(num));
                            }
                        }
                        start(0);
                    });
                }
            }
        },
        ready: function() {
            //UI.mMenu();
            //UI.header();
            UI.slider();
            UI.backTop();
            // UI.toggle();
            //UI.input_number();
            //UI.uiCounterup();
            // UI.yt_play();
            // UI.psy();
        },
    }


    UI.ready();


    /*custom here*/
    $('.d-nav').hc_menu({
        open: '.open-mnav',
    })
    $('.ic-search').click(function(event) {
        $(this).children('i').toggleClass('fa-search fa-close');
        $('.header-search .form-search').toggleClass('show');
    });
    //menu header scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) $('header').addClass('scroll');
        else $('header').removeClass('scroll toggle-menu');
    });
    if ($(window).width() > 991) {
        if ($('.sb-news').length > 0) {
            $('.sb-news').stick_in_parent({
                offset_top: 110,
            });
        }
    }
    /*if($("[data-fancybox]").length){
        $("[data-fancybox]").fancybox({
            thumbs : {
                autoStart : true,
                axis      : 'x'
            }
        })
    }*/
})
function initMap() {
    // to the map type control.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 21.0310908, lng: 105.768407 },
        zoom: 18,
        scrollwheel: false,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'
            ]
        }
    });

    //Associate the styled map with the MapTypeId and set it to display.
    var myMarker = new google.maps.Marker({
        position: { lat: 21.0310908, lng: 105.768407 },
        map: map,
        title: "Apecsoft",
        //icon: "images/icon-map.png",
        label: {
            color: 'red',
            fontWeight: '400',
            fontSize: '16px',
            text: 'Tomita Farm',

        },
        icon: {
            labelOrigin: new google.maps.Point(11, 70),
            url: 'images/icon-map.png',
            size: new google.maps.Size(38, 54),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(11, 40),
        },
    });
    var contentString = '<div id="content" style="max-width: 250px;">' +
        '<h1 style="font-size:14px;color:#01b1e0;font-weight:500;text-align: center;">Địa chỉ: Tầng 3, TTTM CTM Complex Cầu Giấy, 139 Cầu Giấy, Hà Nội</h1>' +
        '<span style="float:left;font-size:13px;color:#2e2e2e;width: 100%; text-align: center;font-weight:500;margin-top: 10px;">Phone: 0969.001.511</span>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    myMarker.addListener('click', function() {
        infowindow.open(map, myMarker);
    });
}