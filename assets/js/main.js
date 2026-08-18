/*
	Template Name: SaasRiver - SaaS & StartUp HTML Template
	Author: https://themexriver.com/
	Version: 1.0
*/


(function ($) {
"use strict";


/*
	no-scroll-restore — a reload half-way down the page would otherwise put the
	browser back at that offset after the scroll-driven triggers were measured,
	leaving every start/end point off by the restored amount
*/
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}


/*
	windows-load-function
*/


window.addEventListener('load', function(){

	// drop any scroll position gsap/the browser remembered, then measure the
	// triggers from a clean top-of-page state
	ScrollTrigger.clearScrollMemory("manual");
	window.scrollTo(0, 0);
	ScrollTrigger.refresh();

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


		// section-title-1 — lines slide up from behind their own mask
		if($(".wa_title_ani_1").length) {
			gsap.registerPlugin(SplitText);

			$(".wa_title_ani_1").each(function (index, el) {

				// double split: the second pass wraps each line in a mask
				var wa_title_line = new SplitText(el, {
					type: "lines",
					linesClass: "wa-split-line"
				});
				new SplitText(el, {
					type: "lines",
					linesClass: "wa-split-mask"
				});

				var wa_title_delay = parseFloat($(el).attr('data-split-delay')) || 0;

				gsap.set(wa_title_line.lines, {
					yPercent: 110,
					opacity: 0
				});

				gsap.to(wa_title_line.lines, {
					scrollTrigger: {
						trigger: el,
						start: "top 86%",
					},
					yPercent: 0,
					opacity: 1,
					duration: .9,
					ease: "power3.out",
					stagger: .1,
					delay: wa_title_delay
				});

			});
		}


		// hero-1-intro — everything else rides in right behind the titles
		if($(".wa_hero_ani_1").length) {
			var wa_hero_ani_1_tl = gsap.timeline({ delay: .25 });

			wa_hero_ani_1_tl
				.from(".wa_hero_ani_1 .lt-subtitle-1", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				})
				.from(".wa_hero_ani_1 .lt-hero-1-truck", {
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				}, "-=.35")
				.from(".wa_hero_ani_1 .lt-hero-1-disc", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				}, "-=.5")
				.from(".wa_hero_ani_1 .btn-elm > *", {
					y: 24,
					opacity: 0,
					duration: .8,
					stagger: .12,
					ease: "power3.out"
				}, "-=.5")
				.from(".wa_hero_ani_1 .lt-hero-1-accordion-item", {
					x: 40,
					opacity: 0,
					duration: .8,
					stagger: .12,
					ease: "power3.out"
				}, "-=.7");
		}


		// hero-2-intro — the artwork settles in as the preloader clears
		if($(".lt-hero-2-img-box").length) {
			var lt_hero2_imgs = gsap.utils.toArray(".lt-hero-2-img-main img");
			var lt_hero2_tl = gsap.timeline({ delay: .2 });

			// every visual waits below the frame, the first one rides up
			gsap.set(lt_hero2_imgs, { yPercent: 100 });

			lt_hero2_tl
				.from(".lt-hero-2-img-bg img", {
					scale: 1.35,
					duration: 1.8,
					ease: "power3.out"
				})
				.to(lt_hero2_imgs[0], {
					yPercent: 0,
					duration: 1.4,
					ease: "power3.out"
				}, "-=1.35");

			// then they keep taking turns: one drops away as the next rides up
			if (lt_hero2_imgs.length > 1) {
				var lt_hero2_loop = gsap.timeline({ repeat: -1 });

				lt_hero2_imgs.forEach(function (img, index) {
					var lt_hero2_next = lt_hero2_imgs[(index + 1) % lt_hero2_imgs.length];

					lt_hero2_loop
						.to({}, { duration: 2 })
						.to(img, {
							yPercent: 100,
							duration: .9,
							ease: "power3.in"
						})
						.fromTo(lt_hero2_next, {
							yPercent: 100
						}, {
							yPercent: 0,
							duration: .9,
							ease: "power3.out"
						});
				});

				lt_hero2_tl.add(lt_hero2_loop);
			}
		}


		// hero-3-intro — the hero settles in as the preloader clears
		if($(".lt-hero-3-area").length) {
			var lt_hero3_tl = gsap.timeline({ delay: .2 });

			lt_hero3_tl
				.from(".lt-hero-3-rating", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				})
				.from(".lt-hero-3-disc", {
					y: 24,
					opacity: 0,
					duration: .8,
					ease: "power3.out"
				}, "-=.6")
				.from(".lt-hero-3-form", {
					x: 60,
					opacity: 0,
					duration: 1,
					ease: "power3.out"
				}, "-=.85")

				// the glass cards fan out from behind the form
				.from(".lt-hero-3-form-box .ghost-card", {
					x: -24,
					y: -24,
					opacity: 0,
					duration: .8,
					stagger: .12,
					ease: "power3.out"
				}, "-=.55")
				.from(".lt-hero-3-line", {
					scaleX: 0,
					transformOrigin: "left center",
					duration: 1.1,
					ease: "power3.out"
				}, "<")
				.from(".lt-hero-3-bottom .btn-elm ", {
					y: 24,
					opacity: 0,
					duration: .7,
					stagger: .12,
					ease: "power3.out",

					// hand the transform back to css so the hover lift keeps working
					clearProps: "transform"
				}, "-=.5")
				.from(".lt-hero-3-partner", {
					opacity: 0,
					duration: .9,
					ease: "power2.out"
				}, "-=.5");
		}


		// footer-big-title — the letters keep driving in and out like a convoy
		function waFooterTitleAnim() {
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

			// only run the loop while the footer is on screen — always from the top,
			// so it never resumes half-way through a letter fly-out
			ScrollTrigger.create({
				trigger: ".lt-footer-1-big-title",
				start: "top bottom",
				end: "bottom top",
				markers: false,
				onToggle: function (self) {
					if (self.isActive) {
						lt_footer_title_tl.restart(true);
					} else {
						lt_footer_title_tl.pause(0);
					}
				}
				
			});

			// the layout shifts while images load — re-measure the trigger
			ScrollTrigger.refresh();
		}
		waFooterTitleAnim();

	}


	/*
		clip-anim-start
	*/
	function waClipAnim() {

		const waClipWraps = document.querySelectorAll(".wa_clip_anim");
		if (!waClipWraps.length) return;

		const waClipObserver = new IntersectionObserver((entries, obs) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				const wrap = entry.target;
				const img = wrap.querySelector(".wa_clip_anim_img[data-animate='true']");
				if (!img) return;

				const url = img.getAttribute("src");

				// ensure relative position
				if (getComputedStyle(wrap).position === "static") {
					wrap.style.position = "relative";
				}

				// remove old masks
				wrap.querySelectorAll(".mask").forEach((mask) => mask.remove());

				const waClipFragment = document.createDocumentFragment();

				for (let i = 0; i < 9; i++) {
					const mask = document.createElement("div");
					mask.className = `mask mask-${i + 1}`;
					mask.style.backgroundImage = `url(${url})`;
					waClipFragment.appendChild(mask);
				}

				wrap.appendChild(waClipFragment);

				// paint the closed state first, then play the reveal
				requestAnimationFrame(function () {
					requestAnimationFrame(function () {
						wrap.classList.add("animated");
					});
				});

				// stop observing after trigger
				obs.unobserve(wrap);
			});
		}, { threshold: 0.2 });

		waClipWraps.forEach((wrap) => waClipObserver.observe(wrap));
	}
	waClipAnim();
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

// header-2-menu — the offcanvas button slides the menu out, and it stays open
// until the pointer leaves the whole right-hand group
if ($(".lt-header-2-right").length) {
	var lt_header2_right = document.querySelector(".lt-header-2-right");
	var lt_header2_btn = lt_header2_right.querySelector(".lt-offcanvas-btn-2");

	if (lt_header2_btn) {
		lt_header2_btn.addEventListener("mouseenter", function () {
			lt_header2_right.classList.add("menu-open");
		});

		lt_header2_right.addEventListener("mouseleave", function () {
			lt_header2_right.classList.remove("menu-open");
		});
	}
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


/*
	clip-anim-end
*/


// about-1-container — lands from above, then keeps swinging
if($(".lt-about-1-posi-img").length) {
	var lt_about_posi_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-about-1-area",
			start: "top 30%",
		}
	});

	lt_about_posi_tl
		.from(".lt-about-1-posi-img", {
			yPercent: -100,
			duration: 1.3,
			ease: "power3.out"
		})
		.from(".lt-about-1-img-2", {
			yPercent: -70,
			duration: 1.3,
			ease: "power3.out"
		},"<")
		.set(".lt-about-1-posi-img", {
			transformOrigin: "top center"
		})
		.to(".lt-about-1-posi-img", {
			rotation: 2.2,
			duration: 1.6,
			ease: "sine.inOut"
		})
		.to(".lt-about-1-posi-img", {
			rotation: -2.2,
			duration: 3.2,
			ease: "sine.inOut",
			yoyo: true,
			repeat: -1
		});
}


// solution-1-scroll — the truck drives across while the tabs switch
if($(".lt-solution-1-height").length) {
	var lt_solution_truk = document.querySelector(".lt-solution-1-truk");
	var lt_solution_truk_img = document.querySelector(".lt-solution-1-truk .truk-img");
	var lt_solution_tabs = document.querySelectorAll(".lt-solution-1-tabs-btn .nav-link");
	var lt_solution_index = 0;



	if (lt_solution_truk_img && lt_solution_tabs.length) {

		// only where the section is pinned — keep in sync with the sticky/height
		// media query in scss/layout/_solution.scss
		gsap.matchMedia().add("(min-width: 1800px)", function () {
			lt_solution_index = 0;

			gsap.to(lt_solution_truk_img, {
				x: function () {
					return lt_solution_truk.offsetWidth - lt_solution_truk_img.offsetWidth;
				},
				ease: "none",
				scrollTrigger: {
					trigger: ".lt-solution-1-height",
					start: "top top",
					end: "bottom bottom",
					scrub: 1,
					markers: false,

					// each third of the scroll owns one tab
					onUpdate: function (self) {
						var index = Math.min(lt_solution_tabs.length - 1, Math.floor(self.progress * lt_solution_tabs.length));

						if (index !== lt_solution_index) {
							lt_solution_index = index;
							bootstrap.Tab.getOrCreateInstance(lt_solution_tabs[index]).show();
						}
					}
				}
			});
		});
	}
}


// price-1-ani-img — grows in from the top-right corner as the section scrolls up
if($(".lt-price-1-ani-img").length) {
	gsap.from(".lt-price-1-ani-img", {
		scrollTrigger: {
			trigger: ".lt-price-1-ani-img",
			start: "top bottom",
			end: "top 35%",
			scrub: 1,
		},
		scale: .45,
		xPercent: 18,
		yPercent: -18,
		transformOrigin: "top right",
		ease: "none"
	});
}


// projects-1-ani-img — drives in from the right as the section scrolls up
if($(".lt-projects-1-ani-img").length) {
	gsap.from(".lt-projects-1-ani-img", {
		scrollTrigger: {
			trigger: ".lt-projects-1-ani-img",
			start: "top bottom",
			end: "top 35%",
			scrub: 1,
		},
		xPercent: 280,
		ease: "none"
	});
}


// choose-1-ship — sails in small from the right and grows into place
if($(".lt-choose-1-bg-ani .bg-ship").length) {
	gsap.from(".lt-choose-1-bg-ani .bg-ship", {
		scrollTrigger: {
			trigger: ".lt-choose-1-bg-ani",
			start: "top bottom",
			end: "top 35%",
			scrub: 1,
		},
		scale: .35,
		xPercent: 70,
		transformOrigin: "right center",
		ease: "none"
	});
}


// process-1-bg — drives in from the right as the section scrolls up
if($(".lt-process-1-bg-img").length) {
	gsap.from(".lt-process-1-bg-img", {
		scrollTrigger: {
			trigger: ".lt-process-1-bg-img",
			start: "top bottom",
			end: "top 35%",
			scrub: 1,
		},
		xPercent: 280,
		ease: "none"
	});
}


// team-2-collage — the members start stacked in the middle and fan out to their
// own spots when the collage scrolls in
if($(".lt-team-2-wrap").length) {
	var lt_team_wrap = document.querySelector(".lt-team-2-wrap");
	var lt_team_members = gsap.utils.toArray(".lt-team-2-member");

	// offsetLeft/Top stay put while the tween runs, unlike getBoundingClientRect
	function lt_team_center_x(member) {
		return (lt_team_wrap.offsetWidth / 2) - (member.offsetLeft + member.offsetWidth / 2);
	}

	function lt_team_center_y(member) {
		return (lt_team_wrap.offsetHeight / 2) - (member.offsetTop + member.offsetHeight / 2);
	}

	// only where the scattered layout exists — keep in sync with scss/layout/_team.scss
	gsap.matchMedia().add("(min-width: 1200px)", function () {
		var lt_team_tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".lt-team-2-wrap",
				start: "top 50%",
				invalidateOnRefresh: true,
			}
		});

		lt_team_members.forEach(function (member, index) {
			lt_team_tl.fromTo(member, {
				x: function () {
					return lt_team_center_x(member);
				},
				y: function () {
					return lt_team_center_y(member);
				},
				scale: .4,
				opacity: 0
			}, {
				x: 0,
				y: 0,
				scale: 1,
				opacity: 1,
				duration: 1.1,
				ease: "power3.out"
			}, index * .08);
		});
	});
}


// services-2-ani-img — the collage assembles when the section scrolls in
if($(".lt-services-2-ani-img").length) {
	var lt_services2_ani_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-services-2-ani-img",
			start: "top 85%",
		}
	});

	lt_services2_ani_tl

		// the orange plate drops in from above the frame
		.from(".lt-services-2-ani-img .bg-img", {
			yPercent: -100,
			duration: 1.2,
			ease: "power3.out"
		})

		// the cutout comes out of the left edge, small at first
		.from(".lt-services-2-ani-img .main-img img", {
			xPercent: -60,
			scale: .4,
			opacity: 0,
			transformOrigin: "left center",
			duration: 1.3,
			ease: "power3.out"
		}, "-=.3");
}

// cta-3-plane — the plane comes down from the top right and lands
if($(".lt-cta-3-plane").length) {
	gsap.from(".lt-cta-3-plane", {
		scrollTrigger: {
			trigger: ".lt-cta-3-area",
			start: "top 90%",
		},
		xPercent: 80,
		yPercent: -170,
		rotation: 14,
		opacity: 0,
		duration: 1.6,
		ease: "power3.out"
	});
}

// faqs-2-shapes — the side shapes slide in from their own edge
if($(".lt-faqs-2-bg-shape-1, .lt-faqs-2-bg-shape-2").length) {
	var lt_faqs_shape_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-faqs-2-area",
			start: "top 50%",
		}
	});

	lt_faqs_shape_tl

		// inside shape-1 the panel and the ribbons come from opposite sides
		.from(".lt-faqs-2-bg-shape-1 .elm-1", {
			xPercent: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},)
		.from(".lt-faqs-2-bg-shape-2 .elm-1", {
			xPercent: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<")
		.from(".lt-faqs-2-bg-shape-1 .elm-2", {
			xPercent: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<30%")
		.from(".lt-faqs-2-bg-shape-2 .elm-2", {
			xPercent: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<")
		.from(".lt-faqs-2-bg-shape-1 .elm-3", {
			xPercent: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<30%")
		.from(".lt-faqs-2-bg-shape-2 .elm-3", {
			xPercent: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		},"<")

}


// achieve-2-img — the photo cluster drops into place on scroll-in
if($(".lt-achieve-2-img").length) {
	var lt_achieve_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-achieve-2-img",
			start: "top 80%",
		}
	});

	lt_achieve_tl
		.from(".lt-achieve-2-img .has-pos-1", {
			x: -60,
			scale: .9,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		})
		.from(".lt-achieve-2-img .has-pos-2", {
			y: -60,
			scale: .9,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		}, "-=.75")
		.from(".lt-achieve-2-img .has-pos-3", {
			y: 60,
			scale: .9,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		}, "-=.75");
}


// awards-2-left — the client mosaic builds itself up on scroll-in
if($(".lt-awards-2-left").length) {
	var lt_awards_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-awards-2-left",
			start: "top 80%",
		}
	});

	lt_awards_tl
		.from(".lt-awards-2-big-title", {
			x: -60,
			opacity: 0,
			duration: 1,
			ease: "power3.out"
		})
		.from(".lt-awards-2-logo .single-logo", {
			scale: .6,
			opacity: 0,
			duration: .7,
			stagger: {
				each: .06,
				from: "random"
			},
			ease: "power3.out"
		}, "-=.7")
		.from(".lt-awards-2-counter", {
			scale: .8,
			opacity: 0,
			duration: .9,
			ease: "back.out(1.6)"
		}, "-=.45");
}


// projects-2-stack — each card opens up through the star mask while its photo
// zooms out, one card per screen of pinned scroll
if($(".lt-projects-2-height").length) {
	var lt_projects2_cards = gsap.utils.toArray(".lt-projects-2-card");

	// only where the section is pinned — keep in sync with scss/layout/_projects.scss
	gsap.matchMedia().add("(min-width: 992px)", function () {
		var lt_projects2_tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".lt-projects-2-height",
				start: "top 30%",
				end: "bottom bottom",
				scrub: 1,
			}
		});

		lt_projects2_cards.forEach(function (card, index) {
			var lt_projects2_img = card.querySelector(".img-elm img");
			var lt_projects2_content = card.querySelectorAll(".tag-elm, .title, .dvr-line, .disc, .lt-projects-2-btn");

			lt_projects2_tl
				.fromTo(card, {
					"--wa-mask": "0px"
				}, {
					"--wa-mask": "5000px",
					ease: "none",
					duration: 1
				}, index)
				.fromTo(lt_projects2_img, {
					scale: 1.3
				}, {
					scale: 1,
					ease: "none",
					duration: 1
				}, index)

				// the copy rides in once the card is half open
				.from(lt_projects2_content, {
					y: 40,
					opacity: 0,
					duration: .5,
					stagger: .08,
					ease: "power3.out"
				}, index + .3);
		});
	});
}


// blog-1-btn-wrap — the rails draw out and the dots ride in from both sides
if($(".lt-blog-1-btn-wrap").length) {
	var lt_blog_btn_lines = document.querySelectorAll(".lt-blog-1-btn-wrap .line");
	var lt_blog_btn_dots = document.querySelectorAll(".lt-blog-1-btn-wrap .dot-elm");

	var lt_blog_btn_tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".lt-blog-1-btn-wrap",
			start: "top 88%",
		}
	});

	lt_blog_btn_tl
		.from(lt_blog_btn_lines[0], {
			scaleX: 0,
			transformOrigin: "left center",
			duration: 1,
			ease: "power3.out"
		})
		.from(lt_blog_btn_lines[1], {
			scaleX: 0,
			transformOrigin: "right center",
			duration: 1,
			ease: "power3.out"
		}, "<")
		.from(lt_blog_btn_dots[0], {
			x: -60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		}, "-=.6")
		.from(lt_blog_btn_dots[1], {
			x: 60,
			opacity: 0,
			duration: .8,
			ease: "power3.out"
		}, "<");
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


var lt_about2_slider = new Swiper(".lt_about2_slider", {
	loop: true,
	spaceBetween: 0,
	speed: 500,
	slidesPerView: 1,
	effect: 'fade',
	fadeEffect: {
		crossFade: true 
	},
	  
	navigation: {
		prevEl: ".lt_about2_slider_prev",
		nextEl: ".lt_about2_slider_next",
	},

});








})(jQuery);