/* -------------------------------------------

Name: 		Aquarelle
Version:    1.0
�������أ�Http://www.bootstrapmb.com

p.s. I am available for Freelance hire (UI design, web development). mail: miller.themes@gmail.com

------------------------------------------- */

$(function () {

    "use strict";

    /* -------------------------------------------

    preloader

    ------------------------------------------- */
    // $("#header").load("components/header.html");
    // $("#footer").load("components/footer.html");
    // console.log($("#header"))
    // 从 localStorage 获取上次选择的语言，如果没有则根据浏览器语言选择
    let currentLang = localStorage.getItem('selectedLanguage') || (navigator.language.startsWith('zh') ? 'cn' : 'en');

    // 动态加载 i18next 库
    $.getScript("https://unpkg.com/i18next@21.8.10/dist/umd/i18next.min.js", function () {
        // 语言资源加载
        const resources = {
            en: '/locales/en.json',
            cn: '/locales/cn.json'
        };

        // 加载当前语言的 JSON 文件
        loadLanguage(currentLang);

        // 点击多语言图标切换语言
        $('#lang-toggle').click(function () {
            currentLang = currentLang === 'en' ? 'cn' : 'en'; // 在英文和中文之间切换
            localStorage.setItem('selectedLanguage', currentLang); // 将选择的语言存储到 localStorage
            loadLanguage(currentLang);
        });

        // 加载并初始化对应的语言资源
        function loadLanguage(lang) {
            $.getJSON(resources[lang], function (data) {
                i18next.init({
                    lng: lang, // 设置当前语言
                    debug: true, // 打开调试模式
                    resources: {
                        [lang]: {
                            translation: data
                        }
                    }
                }, function (err, t) {
                    if (err) {
                        console.error('Language initialization error:', err);
                        return;
                    }
                    updateContent(); // 更新页面内容
                });
            }).fail(function () {
                console.error('Failed to load language resource file:', resources[lang]);
            });
        }

        // 替换页面上的所有 data-i18n 元素
        function updateContent() {
            $('[data-i18n]').each(function () {
                const key = $(this).attr('data-i18n');
                $(this).text(i18next.t(key));
            });
        }
    });

    // Web3.js集成
    // 动态加载 Web3.js 库
    $.getScript("https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.5.2/dist/web3.min.js", function () {
        let web3;

        // 初始化 Web3
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);

            // 连接钱包按钮点击事件
            $('#wallet-connect-btn').click(async function () {
                try {
                    // 请求用户授权连接钱包
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    const walletAddress = accounts[0];

                    // 将钱包地址显示在按钮上
                    $('#wallet-connect-btn').text(walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4));
                } catch (error) {
                    console.error("User denied wallet connection", error);
                }
            });

            // 监听钱包账户更改
            ethereum.on('accountsChanged', function (accounts) {
                if (accounts.length > 0) {
                    const walletAddress = accounts[0];
                    $('#wallet-connect-btn').text(walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4));
                } else {
                    $('#wallet-connect-btn').text("Connect Wallet");
                }
            });
        } else {
            console.error("No Web3 provider found. Please install MetaMask.");
        }
    });
    setTimeout(function () {
        $(".mil-loader-content").addClass("mil-active");
    }, 200);
    $(document).ready(function () {
        simulateContentLoading();
    });

    function simulateContentLoading() {
        var progressBar = $(".mil-loader-bar");
        var percentText = $(".mil-loader-percent");

        var interval = setInterval(function () {
            var currentWidth = progressBar.width();
            var maxWidth = $(".mil-loader-progress").width();
            var currentPercent = Math.round((currentWidth / maxWidth) * 100);

            if (currentPercent < 101) {
                progressBar.width(currentWidth + 1);
                percentText.text(currentPercent + "%");
            } else {
                clearInterval(interval);

                setTimeout(function () {
                    $(".mil-loader-content").removeClass("mil-active");
                }, 400);
                setTimeout(function () {
                    $(".mil-loader").removeClass("mil-active");
                }, 800);
            }
        }, 5);
    }
    /* -------------------------------------------

    scrollbar

    ------------------------------------------- */
    $(window).scroll(function () {
        progressIndicator();
    });

    function progressIndicator() {
        var winScroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var scrolled = (winScroll / height) * 100;
        $(".mil-progressbar").css("height", scrolled + "%");
    }
    /* -------------------------------------------

    datepicker

    ------------------------------------------- */
    $('.datepicker-here').datepicker({
        language: 'en',
        minDate: new Date(),
        autoClose: true,
    });
    /* -------------------------------------------

    sliders

    ------------------------------------------- */
    var menu = ['<div class="mil-custom-dot mil-slide-1"></div>', '<div class="mil-custom-dot mil-slide-2"></div>', '<div class="mil-custom-dot mil-slide-3"></div>', '<div class="mil-custom-dot mil-slide-4"></div>', '<div class="mil-custom-dot mil-slide-5"></div>', '<div class="mil-custom-dot mil-slide-6"></div>', '<div class="mil-custom-dot mil-slide-7"></div>']
    var mySwiper = new Swiper('.mil-reviews-slider', {
        // If we need pagination
        pagination: {
            el: '.mil-revi-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + (menu[index]) + '</span>';
            },
        },
        speed: 800,
        effect: 'fade',
        parallax: true,
        navigation: {
            nextEl: '.mil-revi-next',
            prevEl: '.mil-revi-prev',
        },
    });

    var swiper = new Swiper('.mil-card-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        parallax: true,
        effect: 'fade',
        speed: 600,
        pagination: {
            el: '.mil-card-pagination',
            clickable: true,
        },
        navigation: {
            prevEl: '.mil-card-prev',
            nextEl: '.mil-card-next',
        },
    });

    var swiper = new Swiper('.mil-reco-slider', {
        slidesPerView: 1,
        spaceBetween: 40,
        speed: 600,
        navigation: {
            prevEl: '.mil-reco-prev',
            nextEl: '.mil-reco-next',
        },
        breakpoints: {
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
        },
    });

    var swiper = new Swiper('.mil-room-slider', {
        slidesPerView: 3,
        spaceBetween: 40,
        parallax: true,
        loop: true,
        centeredSlides: true,
        slidesPerView: "auto",
        speed: 800,
        pagination: {
            el: '.mil-room-pagination',
            clickable: true,
            type: 'fraction',
        },
        navigation: {
            prevEl: '.mil-room-prev',
            nextEl: '.mil-room-next',
        },
    });
    /* -------------------------------------------

    scroll animation

    ------------------------------------------- */
    function addRemoveClass() {
        $('.mil-fade-up').each(function (i) {
            var bottom_of_object = $(this).offset().top;
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            var isDesktop = $(window).width() > 768;

            if ((isDesktop && bottom_of_window > bottom_of_object) || (!isDesktop)) {
                $(this).addClass('mil-active');
            } else {
                $(this).removeClass('mil-active');
            }
        });
    }

    $(window).scroll(function () {
        addRemoveClass();
    });

    $(document).ready(function () {
        addRemoveClass();
    });

    /* -------------------------------------------

    top panel scroll animation

    ------------------------------------------- */
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();

        var isDesktop = $(window).width() > 768;

        if ((isDesktop && scroll >= 60) || (!isDesktop)) {
            $(".mil-top-panel").addClass("mil-active");
        } else {
            $(".mil-top-panel").removeClass("mil-active");
        }
    });

    /* -------------------------------------------

    menu

    ------------------------------------------- */
    $('.mil-menu-btn').on('click', function () {
        console.log('object')
        $('.mil-menu-btn , .mil-mobile-menu').toggleClass('mil-active');
    });
    /* -------------------------------------------

    popup

    ------------------------------------------- */
    $('.mil-open-book-popup').on('click', function () {
        $('.mil-book-popup-frame').addClass('mil-active');
        $('html, body').css({
            overflow: 'hidden',
        });
    });

    $('.mil-close-button').on('click', function () {
        $('.mil-book-popup-frame').removeClass('mil-active');
        $('html, body').css({
            overflow: 'scroll',
        });
    });

    $(document).mouseup(function (e) {
        var div = $(".mil-book-popup , .datepickers-container");
        if (!div.is(e.target) &&
            div.has(e.target).length === 0) {
            $('.mil-book-popup-frame').removeClass('mil-active');
            $('html, body').css({
                overflow: 'scroll',
            });
        }
    });

    $('.mil-reply').on('click', function () {
        $('.mil-comment-popup-frame').addClass('mil-active');
        $('html, body').css({
            overflow: 'hidden',
        });
    });

    $('.mil-close-button').on('click', function () {
        $('.mil-comment-popup-frame').removeClass('mil-active');
        $('html, body').css({
            overflow: 'scroll',
        });
    });

    /* -------------------------------------------

    faq

    ------------------------------------------- */
    const faqItems = document.querySelectorAll(".mil-faq-item");

    faqItems.forEach(function (item) {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
        });
    });
    /* -------------------------------------------

    counter up

    ------------------------------------------- */

    var myElement = document.querySelector('.mil-counter-number');

    if (myElement) {
        var count = 0;
        $(window).scroll(function () {
            var oTop = $('.mil-counter-number h2').offset().top - window.innerHeight;
            if (count == 0 && $(window).scrollTop() > oTop) {
                $('.mil-counter-number h2').each(function () {
                    var $this = $(this),
                        countTo = $this.attr('data-number');
                    $({
                        countNum: $this.text()
                    }).animate({
                        countNum: countTo
                    }, {
                        duration: 3000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                        }
                    });
                });
                count = 1;
            }
        });
    }

    /* -------------------------------------------

    sticky

    ------------------------------------------- */
    var stickyElement = document.querySelector('.mil-sticky');

    if (stickyElement) {
        var sticky = new Sticky('.mil-sticky');
        if ($(window).width() < 992) {
            sticky.destroy();
        }
    }

});
