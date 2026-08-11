/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";


/* 
	windows-load-function
*/


window.addEventListener('load', function(){


	if (document.querySelectorAll(".lt-preloader-1").length) {
		const loader = document.querySelector(".lt-preloader-1");
		
		setTimeout(() => {
			loader.classList.add("loaded");
			afterPreloader();
		});
		setTimeout(function () {
			loader.remove();
		}, 1500);

	} else {
		afterPreloader();
	}

	afterPageLoad();

})




/* 
	after-preloader-start
*/
function afterPreloader() {


	/* 
		only-LTR-direction
	*/
	if (getComputedStyle(document.body).direction !== "rtl") {

		// section-title-1
		if($(".el_title_ani_1").length) {
			var el_title_ani_1 = $(".el_title_ani_1");
			if(el_title_ani_1.length == 0) return;
			gsap.registerPlugin(SplitText);

			el_title_ani_1.each(function(index, el) {

				el.split = new SplitText(el, { 
					type: "lines",
					linesClass: "split-line"
				});

				gsap.set(el, { perspective: 2000, transformStyle: "preserve-3d" });

				if( $(el).hasClass('el_title_ani_1') ){
					gsap.set(el.split.lines, {
						yPercent: 100,
						opacity: 0,
						rotationX: -100
					});
				}

				var splitDelay = parseFloat($(el).attr('data-split-delay')) || 0;

				el.anim = gsap.to(el.split.lines, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
					},
					rotationX: 0,
					yPercent: 0,
					scaleX: 1,
					opacity: 1,
					duration: .4,
					stagger: 0.1,
					delay: splitDelay
				});

			});
		}


		// footer-big-title — the letters keep driving in and out like a convoy
		if($(".lt-footer-1-big-title").length) {
			gsap.registerPlugin(SplitText);

			var lt_footer_title = new SplitText(".lt-footer-1-big-title", {
				type: "chars",
				charsClass: "split-char"
			});

			var lt_footer_title_tl = gsap.timeline({
				repeat: -1,
				repeatDelay: .6,
				paused: true
			});

			lt_footer_title_tl
				.fromTo(lt_footer_title.chars, {
					xPercent: -160,
					skewX: 24,
					opacity: 0
				}, {
					xPercent: 0,
					skewX: 0,
					opacity: 1,
					duration: 1,
					ease: "power3.out",
					stagger: .07
				})
				.to(lt_footer_title.chars, {
					xPercent: 160,
					skewX: -24,
					opacity: 0,
					duration: .8,
					ease: "power2.in",
					stagger: .06
				}, "+=1.6");

			// only run the loop while the footer is on screen
			ScrollTrigger.create({
				trigger: ".lt-footer-1-big-title",
				start: "top bottom",
				end: "bottom top",
				onToggle: function (self) {
					if (self.isActive) {
						lt_footer_title_tl.play();
					} else {
						lt_footer_title_tl.pause();
					}
				}
			});
		}


	}


/*
	after-preloader-end
*/
}



/* 
	after-page-load-start
*/
function afterPageLoad() {

	/* 
		add-active-class
	*/
	const waAddClass = gsap.utils.toArray('.wa_add_class');
	waAddClass.forEach(waAddClassItem => {
		gsap.to(waAddClassItem, {
			scrollTrigger: {
				trigger: waAddClassItem,
				start: "top 90%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				toggleClass: "active",
				once: true,
				markers: false,
			}
		});
	});



	/* 
		wow-activation
	*/
	if($('.wow').length){
		var wow = new WOW({
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       100,
			mobile:       true,
			live:         true
		});
		wow.init();
	};




		

/* 
	after-page-load-start
*/
}

// parallax-images
if ($(".wa_magnetic_1_trigger").length) {
    var waMagnets2v2 = document.querySelectorAll('.wa_magnetic_1_trigger');
    var waStrength2v2 = 30;

    waMagnets2v2.forEach((magnet) => {
        magnet.addEventListener('mousemove', moveMagnet2);
        magnet.addEventListener('mouseout', function(event) {
            const innerElements = event.currentTarget.querySelectorAll('.wa_magnetic_1_elm');
            innerElements.forEach((elm) => {
                gsap.to(elm, {
                    x: 0,
                    y: 0,
					scale: 1.05,
                    duration: 1,
                    ease: "ease1"
                });
            });
        });
    });

    function moveMagnet2(event) {
        var magnetButton = event.currentTarget;
        var bounding = magnetButton.getBoundingClientRect();
        const innerElements = magnetButton.querySelectorAll('.wa_magnetic_1_elm');

        const xMove = (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * waStrength2v2;
        const yMove = (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * waStrength2v2;

        innerElements.forEach((elm) => {
            gsap.to(elm, {
                x: xMove,
                y: yMove,
				scale: 1.05,
                duration: 1,
                ease: "ease1"
            });
        });
    }
}

// clients-1-slider
var lt_services1_slider = new Swiper(".lt_services1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 24,
    slidesPerView: "auto",

	pagination: {
		el: '.lt_services1_slider_pagination',
		type: 'fraction',
	},
	navigation: {
		nextEl: '.lt_services1_slider_next',
		prevEl: '.lt_services1_slider_prev',
	},
});

// projects-1-slider
var lt_projects1_total = $('.lt_projects1_slider .swiper-slide').length;

// free space after the last slide, so every card can reach the left edge
// of the slider and become the featured one
function lt_projects1_offset(swiper) {
	var offset = Math.max(0, swiper.width - swiper.slides[swiper.activeIndex].offsetWidth);

	if (swiper.params.slidesOffsetAfter !== offset) {
		swiper.params.slidesOffsetAfter = offset;
		swiper.update();
	}
}

var lt_projects1_slider = new Swiper(".lt_projects1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 28,
	slidesPerView: "auto",

	pagination: {
		el: '.lt_projects1_slider_pagination',
		type: 'fraction',
		renderFraction: function (currentClass, totalClass) {
			return '<span class="' + currentClass + '"></span>/<span class="' + totalClass + '"></span>';
		},
		formatFractionCurrent: function (number) {
			return ('0' + number).slice(-2);
		},
		formatFractionTotal: function () {
			return lt_projects1_total;
		},
	},
	navigation: {
		nextEl: '.lt_projects1_slider_next',
		prevEl: '.lt_projects1_slider_prev',
	},

	on: {
		afterInit: function () {
			lt_projects1_offset(this);
		},
		resize: function () {
			lt_projects1_offset(this);
		},
		// the featured card is wider than the rest, so the grid has to be
		// re-measured the moment the active class moves to another slide
		slideChangeTransitionStart: function () {
			this.updateSlides();
			this.updateSlidesOffset();
			this.updateProgress();

			var translate = -this.slidesGrid[this.activeIndex];
			translate = Math.min(Math.max(translate, this.maxTranslate()), this.minTranslate());
			this.setTranslate(translate);
		},
	},
});

// choose-1-slider
var lt_choose1_slider = new Swiper(".lt_choose1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 16,
	slidesPerView: 1,

	navigation: {
		nextEl: '.lt_choose1_slider_next',
		prevEl: '.lt_choose1_slider_prev',
	},

	breakpoints: {
		768: {
			slidesPerView: 2,
		},
		1200: {
			slidesPerView: 3,
		},
	},
});

// testimonial-1-slider
var lt_testimonial1_imgs = [];

$('.lt_testimonial1_slider .swiper-slide .item-img img').each(function () {
	lt_testimonial1_imgs.push($(this).attr('src'));
});

// the two thumbs beside the card preview the previous / next slide
function lt_testimonial1_preview(swiper) {
	var total = lt_testimonial1_imgs.length;
	if (!total) return;

	$('.lt_testimonial1_prev_img img').attr('src', lt_testimonial1_imgs[(swiper.realIndex - 1 + total) % total]);
	$('.lt_testimonial1_next_img img').attr('src', lt_testimonial1_imgs[(swiper.realIndex + 1) % total]);
}

var lt_testimonial1_slider = new Swiper(".lt_testimonial1_slider", {
	loop: true,
	speed: 800,
	spaceBetween: 28,
	slidesPerView: 1,

	pagination: {
		el: '.lt_testimonial1_slider_pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.lt_testimonial1_slider_next',
		prevEl: '.lt_testimonial1_slider_prev',
	},

	on: {
		afterInit: function () {
			lt_testimonial1_preview(this);
		},
		slideChange: function () {
			lt_testimonial1_preview(this);
		},
	},
});


// shipping-1-form-select
if ($('.lt-shipping-1-form .has-select select').length) {
	$('.lt-shipping-1-form .has-select select').niceSelect();
}


// shipping-1-distance-range
$('.lt_shipping1_range').each(function () {
	var $min = $(this).find('.range-min');
	var $max = $(this).find('.range-max');
	var $fill = $(this).find('.fill');
	var $value = $(this).find('.range-value');

	function ltShipping1Pad(number) {
		return number < 10 ? '0' + number : '' + number;
	}

	function ltShipping1Range() {
		var start = parseInt($min.attr('min'), 10);
		var span = parseInt($min.attr('max'), 10) - start;
		var low = Math.min(+$min.val(), +$max.val());
		var high = Math.max(+$min.val(), +$max.val());

		$fill.css({
			left: ((low - start) / span * 100) + '%',
			width: ((high - low) / span * 100) + '%'
		});

		$value.text(ltShipping1Pad(low) + ' - ' + ltShipping1Pad(high));
	}

	$min.add($max).on('input', ltShipping1Range);
	ltShipping1Range();
});


// price-1-monthly-annually-toggle
$('.lt-price-1-toggle-btn .single-btn').on('click', function () {
	var isAnnually = $(this).index() === 1;

	$(this).addClass('active').siblings().removeClass('active');

	$('.lt-price-1-card .price').each(function () {
		var value = isAnnually ? $(this).data('annually') : $(this).data('monthly');
		if (value === undefined) return;
		this.firstChild.nodeValue = value + ' ';
	});
});








})(jQuery);