import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './global.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
	const containerRef = useRef<HTMLDivElement>(null);
	const loaderRef = useRef<HTMLDivElement>(null);
	const barLoaderRef = useRef<HTMLDivElement>(null);
	const [loading, setLoading] = useState(true);

	// Initialize Lenis Smooth Scroll
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.5,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
			gestureOrientation: 'vertical',
			smoothWheel: true,
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
		lenis.on('scroll', ScrollTrigger.update);

		return () => {
			lenis.destroy();
		};
	}, []);

	// GSAP Scroll Animations
	useGSAP(
		() => {
			const sectionTrigger = (trigger: string, start = 'top center', end = 'top top') => ({
				trigger,
				start,
				end,
				scrub: true,
			});

			const mm = gsap.matchMedia();
			const pageSurface = containerRef.current;

			// 1. Intro Loader Timeline
			const loaderTl = gsap.timeline({
				onComplete: () => {
					setLoading(false);
					document.body.style.overflow = 'visible';
					gsap.set(loaderRef.current, { display: 'none' });
					ScrollTrigger.refresh();
				},
			});

			// Prevent scrolling during load
			document.body.style.overflow = 'hidden';

			loaderTl
				// Progress bar load
				.to(barLoaderRef.current, {
					width: '100%',
					duration: 2.2,
					ease: 'power3.inOut',
				})
				// Slide/fade loader masks
				.to('.mask-load', {
					yPercent: (index) => (index === 0 ? -100 : 100),
					duration: 0.8,
					stagger: 0.1,
					ease: 'power4.inOut',
				})
				// Fade out the loader container
				.to(
					loaderRef.current,
					{
						opacity: 0,
						pointerEvents: 'none',
						visibility: 'hidden',
						duration: 0.4,
					},
					'-=0.4'
				)
				// Initial page entrance fade-in
				.fromTo(
					['.nav', '.logo__img', '.wrapper-hero', '.second-scroll', '.wrap-bg'],
					{ opacity: 0 },
					{ opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' },
					'-=0.2'
				)
				// Title fade and slide
				.fromTo(
					'.heading-30',
					{ y: 50, opacity: 0 },
					{ y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
					'-=0.8'
				);

			// Webflow's original IX2 data hides these expansion layers until the
			// slot section. Without that initial state they cover the phone early.
			gsap.set('._w-expand-slot', { autoAlpha: 0, pointerEvents: 'none' });
			const isCompactViewport = window.matchMedia('(max-width: 991px)').matches;
			const screenOffset = isCompactViewport ? 511 : 730;
			const feedScrollDistance = isCompactViewport ? -300 : -430;
			const searchScrollDistance = -screenOffset;
			const slotScrollDistance = -screenOffset * 6;

			gsap.set('.app-sc.fold', { autoAlpha: 0, top: `${screenOffset}px`, y: 0 });
			gsap.set('.wrapper-section .inner__content', { opacity: 1, y: 0 });
			gsap.set('.over-img', { autoAlpha: 1 });
			gsap.set('.iphone-wrapper-device.base .app-sc', { opacity: 1 });
			gsap.set(
				[
					'._01-app-feed',
					'._02-app-friends',
					'._03-app-search',
					'._04-app-news',
					'._05-app-profile',
					'._06-app-slot',
				],
				{
					top: `${screenOffset}px`,
					y: 0,
					opacity: 1,
				}
			);
			gsap.set('._w-friends-app', { y: 0 });
			gsap.set(['.ui-friends-header', '.ui-friends-feed'], { y: 0 });
			gsap.set(
				[
					'.hero__pagination',
					'.nav-scroll',
					'._w-hero-ttitle',
					'.wrapper_content',
					'.iphone__mockup',
					'.content__sliders',
				],
				{ autoAlpha: 1 }
			);
			gsap.set('.pin-scroll', { x: 0 });
			const bgTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: pageSurface,
					start: 'top top',
					end: 'bottom bottom',
					scrub: true,
				},
			});

			bgTimeline
				.set(document.body, { backgroundColor: '#1f1f1f' })
				.to(document.body, { backgroundColor: '#4e86a7', duration: 800, ease: 'none' }, 3100)
				.to(document.body, { backgroundColor: '#547d6d', duration: 1600, ease: 'none' }, 4800)
				.to(document.body, { backgroundColor: '#b6486b', duration: 1400, ease: 'none' }, 6400)
				.to(document.body, { backgroundColor: '#a54888', duration: 1200, ease: 'none' }, 7800)
				.to(document.body, { backgroundColor: '#654188', duration: 1400, ease: 'none' }, 9000)
				.to(document.body, { backgroundColor: '#363364', duration: 1400, ease: 'none' }, 10400)
				.to(document.body, { backgroundColor: '#181818', duration: 2000, ease: 'none' }, 11800);

			// 2. Parallax Background scroll effect
			gsap.fromTo(
				'.wrap__parallax',
				{ y: 0, rotateX: 5, rotateY: -3, transformPerspective: 2000 },
				{
					y: -300,
					rotateX: -5,
					rotateY: 3,
					ease: 'none',
					scrollTrigger: {
						trigger: '.main-container',
						start: 'top top',
						end: 'bottom bottom',
						scrub: true,
					},
				}
			);

			mm.add('(min-width: 992px)', () => {
				// Set initial positions and sizes of floating pictures
				gsap.set('.picture.w-hidden-medium', {
					x: '25vw',
					y: '-80vh',
					width: 400,
					height: 400,
					opacity: 1,
					rotation: 0,
				});
				gsap.set('.wrap-pictures.w-hidden-medium .picture-2', {
					x: '39vw',
					y: '-100vh',
					width: 360,
					height: 400,
					opacity: 1,
					rotation: 0,
				});
				gsap.set('.wrap-pictures.w-hidden-medium .picture-3', {
					x: '18vw',
					y: '-103vh',
					width: 360,
					height: 420,
					opacity: 1,
					rotation: 0,
				});
				gsap.set('.wrap-pictures.w-hidden-medium .picture-4', {
					x: '9vw',
					y: '-60vh',
					width: 360,
					height: 269,
					opacity: 1,
					rotation: 0,
				});
				gsap.set('.wrap-pictures.w-hidden-medium .picture-5', {
					x: '41vw',
					y: '-64vh',
					width: 360,
					height: 269,
					opacity: 1,
					rotation: 0,
				});
				gsap.set('.wrap-pictures.w-hidden-medium .picture-6', {
					x: '39vw',
					y: '-123vh',
					width: 360,
					height: 269,
					opacity: 1,
					rotation: 0,
				});
				gsap.set('.wrap-pictures.w-hidden-medium', { opacity: 1 });

				const heroScrollTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.top',
						start: 'top top',
						end: () => '+=' + Math.round(window.innerHeight * 1.111),
						scrub: true,
					},
				});

				heroScrollTimeline
					.fromTo('.wrapper_content', { y: '100vh' }, { y: 0, ease: 'none' }, 0)
					.fromTo(
						'.iphone__mockup',
						{ y: '100vh', scale: 0.75 },
						{ y: 0, scale: 1, ease: 'none' },
						0
					)
					.fromTo('.iphone-wrapper-device.base', { scale: 0.7 }, { scale: 1, ease: 'none' }, 0)
					.to('.picture.w-hidden-medium', { x: 0, y: 0, ease: 'none' }, 0)
					.to('.wrap-pictures.w-hidden-medium .picture-2', { x: 0, y: 0, ease: 'none' }, 0)
					.to('.wrap-pictures.w-hidden-medium .picture-3', { x: 0, y: 0, ease: 'none' }, 0)
					.to('.wrap-pictures.w-hidden-medium .picture-4', { x: 0, y: 0, ease: 'none' }, 0)
					.to('.wrap-pictures.w-hidden-medium .picture-5', { x: 0, y: 0, ease: 'none' }, 0)
					.to('.wrap-pictures.w-hidden-medium .picture-6', { x: 0, y: 0, ease: 'none' }, 0)
					.to('.picture.w-hidden-medium', { width: 360, height: 269, ease: 'none' }, 0)
					.to('.wrap-pictures.w-hidden-medium .picture-2', { height: 269, ease: 'none' }, 0)
					.to('.wrap-pictures.w-hidden-medium .picture-3', { height: 269, ease: 'none' }, 0)
					.to(
						'.picture.w-hidden-medium',
						{
							keyframes: {
								'0%': { rotation: 0 },
								'50%': { rotation: 33 },
								'100%': { rotation: 0 },
							},
							ease: 'none',
						},
						0
					)
					.to(
						'.wrap-pictures.w-hidden-medium .picture-2',
						{
							keyframes: {
								'0%': { rotation: 0 },
								'50%': { rotation: -24 },
								'100%': { rotation: 0 },
							},
							ease: 'none',
						},
						0
					)
					.to(
						'.wrap-pictures.w-hidden-medium .picture-3',
						{
							keyframes: {
								'0%': { rotation: 0 },
								'50%': { rotation: 22 },
								'100%': { rotation: 0 },
							},
							ease: 'none',
						},
						0
					)
					.to(
						'.wrap-pictures.w-hidden-medium .picture-4',
						{
							keyframes: {
								'0%': { rotation: 0 },
								'50%': { rotation: -12 },
								'100%': { rotation: 0 },
							},
							ease: 'none',
						},
						0
					)
					.to(
						'.wrap-pictures.w-hidden-medium .picture-5',
						{
							keyframes: {
								'0%': { rotation: 0 },
								'50%': { rotation: 17 },
								'100%': { rotation: 0 },
							},
							ease: 'none',
						},
						0
					)
					.to(
						'.wrap-pictures.w-hidden-medium .picture-6',
						{
							keyframes: {
								'0%': { rotation: 0 },
								'50%': { rotation: -20 },
								'100%': { rotation: 0 },
							},
							ease: 'none',
						},
						0
					);

				// Fade out wrap-pictures from Y = 1000 to Y = (window.innerHeight * 1.019)
				gsap.to('.wrap-pictures.w-hidden-medium', {
					opacity: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: '.wrapper-section.top',
						start: 'top+=1000 top',
						end: () => `top+=${Math.round(window.innerHeight * 1.019)} top`,
						scrub: true,
					},
				});

				// Fade out picture 1 from Y = 1000 to Y = (window.innerHeight * 1.111)
				gsap.to('.picture.w-hidden-medium', {
					opacity: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: '.wrapper-section.top',
						start: 'top+=1000 top',
						end: () => `top+=${Math.round(window.innerHeight * 1.111)} top`,
						scrub: true,
					},
				});

				// Fade out over-img from Y = 1000 to Y = (window.innerHeight * 1.111)
				gsap.to('.over-img', {
					opacity: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: '.wrapper-section.top',
						start: 'top+=1000 top',
						end: () => `top+=${Math.round(window.innerHeight * 1.111)} top`,
						scrub: true,
					},
				});
			});

			mm.add('(max-width: 991px)', () => {
				gsap.set('.picture.mobile', { y: '-57vh', x: '-18vw', opacity: 1 });
				gsap.set('.wrap-pictures.cc-mobile', { y: '-55vh', x: '6vw', opacity: 1 });

				gsap.to(document.body, {
					backgroundColor: '#5d806d',
					ease: 'none',
					scrollTrigger: {
						trigger: '.wrapper-section._001',
						start: 'top 20%',
						end: 'top top',
						scrub: true,
					},
				});

				const mobileHeroTimeline = gsap.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.top',
						start: 'top top',
						end: () => '+=' + Math.round(window.innerHeight * 1.111),
						scrub: true,
					},
				});

				mobileHeroTimeline
					.fromTo('.wrapper_content', { x: 0, y: '100vh' }, { x: -39, y: 0, ease: 'none' }, 0)
					.fromTo(
						'.iphone__mockup',
						{ x: 0, y: '100vh', scale: 1 },
						{ x: -39, y: 0, scale: 1, ease: 'none' },
						0
					)
					.fromTo('.iphone-wrapper-device.base', { scale: 1 }, { scale: 1, ease: 'none' }, 0)
					.to('.picture.mobile', { y: 0, x: 0, opacity: 0, ease: 'none' }, 0)
					.to('.wrap-pictures.cc-mobile', { y: 0, x: 0, opacity: 0, ease: 'none' }, 0);

				// Fade out over-img from Y = 1000 to Y = (window.innerHeight * 1.111) on mobile
				gsap.to('.over-img', {
					opacity: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: '.wrapper-section.top',
						start: 'top+=1000 top',
						end: () => `top+=${Math.round(window.innerHeight * 1.111)} top`,
						scrub: true,
					},
				});
			});

			// 3.5 Title Translation and Fade (0 to 2200px)
			const titleTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '.main-container',
					start: 'top top',
					end: '+=2200px',
					scrub: true,
				},
			});

			titleTimeline
				.to('._w-hero-ttitle', { x: '-208vw', ease: 'none', duration: 2200 }, 0)
				.to('._w-hero-ttitle', { opacity: 0, ease: 'none', duration: 1400 }, 900);

			// 4. Section Scroll & Mockup screen slide transitions
			// We build a master timeline coordinating the fixed mockup animations with vertical scrolling
			const mainScrollTrigger = {
				trigger: '.main-container',
				start: 'top top',
				end: 'bottom bottom',
				scrub: true,
			};

			// Autoplay slot machine reel animation for _w-slot
			const autoplaySlot = gsap.timeline({ repeat: -1 });
			for (let i = 1; i <= 6; i++) {
				autoplaySlot.to(
					'._w-slot',
					{
						y: -screenOffset * i,
						duration: 0.15,
						ease: 'power1.inOut',
					},
					`+=${0.7}`
				);
			}
			autoplaySlot.set('._w-slot', { y: 0 });

			const revolutionOverlayTimeline = gsap.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: sectionTrigger('.wrapper-section._001', 'top top', 'bottom top'),
			});

			revolutionOverlayTimeline
				.set(
					'.app-sc.fold.cc-revolution',
					{ autoAlpha: 1, top: `${screenOffset}px`, y: 0, opacity: 1 },
					0
				)
				.to('.iphone-wrapper-device.base .app-sc', { opacity: 1, duration: 0.11 }, 0)
				.to('.app-sc.fold.cc-revolution', { y: -screenOffset, duration: 0.55 }, 0)
				.to('.iphone-wrapper-device.base .app-sc', { opacity: 0, duration: 0.44 }, 0.11)
				.to('.app-sc.fold.cc-revolution', { opacity: 0, duration: 0.44 }, 0.11)
				.to({}, { duration: 0.45 }, 0.55); // Pad timeline to 1.0 duration

			ScrollTrigger.create({
				trigger: '.wrapper-section.slot',
				start: 'top bottom',
				onEnter: () => autoplaySlot.pause(),
				onLeaveBack: () => autoplaySlot.play(),
			});

			gsap.to('.hero__pagination', {
				autoAlpha: 0,
				pointerEvents: 'none',
				ease: 'none',
				scrollTrigger: sectionTrigger('.wrapper-section.cc-feed', 'top bottom', 'top center'),
			});

			// Initialize rail titles position
			gsap.set(
				[
					'._w-title-feed',
					'._w-title-friends',
					'._w-title-search',
					'._w-title-news',
					'._w-title-profile',
					'._w-title-slot',
				],
				{
					x: '-50vw',
					y: 0,
					opacity: 0,
				}
			);

			// Title animations
			const titleFadeIn = (selector: string, trigger: string) => {
				gsap.to(selector, {
					opacity: 1,
					y: 0,
					ease: 'none',
					scrollTrigger: {
						trigger,
						start: 'top top',
						end: 'top+=400px top',
						scrub: true,
					},
				});
			};

			const titleExit = (selector: string, trigger: string, exitY: number) => {
				gsap.to(selector, {
					y: exitY,
					ease: 'none',
					scrollTrigger: {
						trigger,
						start: 'top top',
						end: 'top+=50px top',
						scrub: true,
					},
				});
			};

			titleFadeIn('._w-title-feed', '.wrapper-section.cc-feed');
			titleExit('._w-title-feed', '.wrapper-section.cc-friends', 356);

			titleFadeIn('._w-title-friends', '.wrapper-section.cc-friends');
			titleExit('._w-title-friends', '.wrapper-section.cc-search', 378);

			titleFadeIn('._w-title-search', '.wrapper-section.cc-search');
			titleExit('._w-title-search', '.wrapper-section.cc-news', 270);

			titleFadeIn('._w-title-news', '.wrapper-section.cc-news');
			titleExit('._w-title-news', '.wrapper-section.cc-profile', 270);

			titleFadeIn('._w-title-profile', '.wrapper-section.cc-profile');
			titleExit('._w-title-profile', '.wrapper-section.slot', 270);

			titleFadeIn('._w-title-slot', '.wrapper-section.slot');

			// Scrollbar pin progress indicator
			gsap.fromTo(
				'.pin-scroll',
				{ x: 0 },
				{
					x: '16vw',
					ease: 'none',
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top top',
						end: 'bottom bottom',
						scrub: true,
					},
				}
			);

			// Individual app screen slides inside the phone
			// Transition 1: Feed screen slides up and scrolls
			const feedTotalTranslate = isCompactViewport ? -980 : -1300;
			gsap.to('._01-app-feed', {
				y: feedTotalTranslate,
				ease: 'none',
				scrollTrigger: {
					trigger: '.wrapper-section.cc-feed',
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
			});

			const slideDuration = isCompactViewport ? 350 : 500;
			const friendsSlideDuration = isCompactViewport ? 511 : 730;

			// Transition 2: Friends screen covers the feed layer, matching Webflow's screen-level IX2 movement.
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.cc-friends',
						start: 'top top',
						end: `top+=${friendsSlideDuration} top`,
						scrub: true,
					},
				})
				.set('._02-app-friends', { top: `${screenOffset}px`, y: 0, opacity: 1 }, 0)
				.to('._02-app-friends', { y: -screenOffset, ease: 'none' }, 0)
				.to('._01-app-feed', { opacity: 0, ease: 'none' }, 0);

			// DJ Kali avatar and header shrinking animation inside Friends screen.
			const shrinkStart = Math.round(1.2 * screenOffset);
			const shrinkEnd = Math.round(1.5 * screenOffset);
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.cc-friends',
						start: `top+=${shrinkStart}px top`,
						end: `top+=${shrinkEnd}px top`,
						scrub: true,
					},
				})
				.fromTo(
					'.ui-friends-header',
					{ height: isCompactViewport ? 255 : 370 },
					{ height: isCompactViewport ? 70 : 100, ease: 'power2.inOut' },
					0
				)
				.fromTo(
					'.user-dj',
					{ scale: 1.0, y: 0 },
					{ scale: 0.4, y: isCompactViewport ? -24 : -35, ease: 'power2.inOut' },
					0
				);

			// Transition 3: Search screen slides up
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.cc-search',
						start: 'top top',
						end: `top+=${slideDuration} top`,
						scrub: true,
					},
				})
				.set('._03-app-search', { top: `${screenOffset}px`, y: 0, opacity: 1 }, 0)
				.to('._03-app-search', { y: -screenOffset, ease: 'none' }, 0);

			// Transition 4: News enters over Search while Search remains visible briefly at the top.
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.cc-news',
						start: 'top top',
						end: `top+=${slideDuration} top`,
						scrub: true,
					},
				})
				.set('._04-app-news', { top: `${screenOffset}px`, y: 0, opacity: 1 }, 0)
				.to('._04-app-news', { y: -screenOffset, ease: 'none' }, 0)
				.to('._03-app-search', { opacity: 0, ease: 'none' }, 0);

			// Transition 5: Profile screen slides up
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.cc-profile',
						start: 'top top',
						end: `top+=${slideDuration} top`,
						scrub: true,
					},
				})
				.set('._05-app-profile', { top: `${screenOffset}px`, y: 0, opacity: 1 }, 0)
				.to('._05-app-profile', { y: -screenOffset, ease: 'none' }, 0)
				.to('._04-app-news', { opacity: 0, ease: 'none' }, 0);

			// Transition 6: Slot screen (Revolution/Filmstrip mockup) slides up
			gsap
				.timeline({
					scrollTrigger: {
						trigger: '.wrapper-section.slot',
						start: 'top top',
						end: `top+=${slideDuration} top`,
						scrub: true,
					},
				})
				.set('.app-sc.fold', { top: `${screenOffset}px`, y: 0, autoAlpha: 1, opacity: 1 }, 0)
				.to('.app-sc.fold', { y: -screenOffset, ease: 'none' }, 0)
				.to('._05-app-profile', { opacity: 0, ease: 'none' }, 0);

			// Filmstrip sequence slot machine scrolling inside _w-slot
			// We have 7 images. Move by six screen heights; desktop and compact layouts use different app heights.
			gsap.to('._w-slot', {
				y: slotScrollDistance,
				ease: 'none',
				scrollTrigger: {
					trigger: '.wrapper-section.slot',
					start: 'top center',
					end: 'bottom center',
					scrub: true,
				},
			});

			// 5. Final Footer Rotation ("Every Day Counts")
			const footerTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '.wrapper.h',
					start: 'top bottom',
					end: 'bottom bottom',
					scrub: true,
				},
			});

			footerTimeline
				.to(
					[
						'.iphone__mockup',
						'.notch',
						'.rail-app-device',
						'.nav-bar',
						'.content__sliders',
						'.hero__pagination',
					],
					{
						autoAlpha: 0,
						duration: 0.35,
						ease: 'none',
					},
					0
				)
				.to(
					'.wrapper_content',
					{
						autoAlpha: 1,
						duration: 0.35,
						ease: 'none',
					},
					0
				)
				.to(
					'._w-expand-slot',
					{
						autoAlpha: 1,
						pointerEvents: 'auto',
						duration: 0.35,
						ease: 'none',
					},
					0
				)
				.to('.pic-expand._01', { x: '25vw', y: '20vh', rotation: 0, ease: 'none' }, 0)
				.to(
					'.pic-expand._02',
					{
						x: '20vw',
						y: '50vh',
						keyframes: [
							{ rotation: -20, duration: 0.2 },
							{ rotation: 17, duration: 0.3 },
							{ rotation: 0, duration: 0.5 },
						],
						ease: 'none',
					},
					0
				)
				.to(
					'.pic-expand._03',
					{
						x: '6vw',
						y: '55vh',
						keyframes: [
							{ rotation: 12, duration: 0.2 },
							{ rotation: 5, duration: 0.3 },
							{ rotation: 0, duration: 0.5 },
						],
						ease: 'none',
					},
					0
				)
				.to(
					'.pic-expand._04',
					{
						x: '10vw',
						y: '30vh',
						keyframes: [
							{ rotation: -7, duration: 0.2 },
							{ rotation: 12, duration: 0.3 },
							{ rotation: 0, duration: 0.5 },
						],
						ease: 'none',
					},
					0
				)
				.to(
					'.pic-expand._05',
					{
						x: '36vw',
						y: '28vh',
						keyframes: [
							{ rotation: 28, duration: 0.2 },
							{ rotation: 15, duration: 0.3 },
							{ rotation: 0, duration: 0.5 },
						],
						ease: 'none',
					},
					0
				)
				.to(
					'.pic-expand._06',
					{
						x: '23vw',
						y: '-10vh',
						keyframes: [
							{ rotation: 0, duration: 0.2 },
							{ rotation: 24, duration: 0.3 },
							{ rotation: 0, duration: 0.5 },
						],
						ease: 'none',
					},
					0
				)
				// Rotate titles up from flat 90deg to upright 0deg
				.fromTo(
					'.heading__bottom',
					{ rotateX: 90, transformOrigin: '50% 100%' },
					{ rotateX: 0, duration: 1, stagger: 0.15, ease: 'back.out(1.7)' },
					0
				)
				// Expand center divider line
				.fromTo(
					'.hr-title',
					{ width: '0.1%' },
					{ width: '100%', duration: 1, ease: 'power2.inOut' },
					0.2
				)
				// Fade in coming soon subtitle
				.fromTo('.wrapper__comingsoon', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.5);

			return () => {
				mm.revert();
				document.body.style.overflow = '';
				document.body.style.backgroundColor = '';
			};
		},
		{ scope: containerRef }
	);

	return (
		<div
			ref={containerRef}
			className='relative min-h-screen overflow-x-clip text-white select-none'
		>
			{/* Loader Panel */}
			<div ref={loaderRef} className='loader__wrapper' style={{ display: 'flex' }}>
				<div className='_w-loader-bar'>
					<div ref={barLoaderRef} className='bar-loader' style={{ width: '1px' }}></div>
				</div>
				<div className='mask-load absolute top-0 left-0 h-[50vh] w-full bg-[#151515]'></div>
				<div className='mask-load absolute bottom-0 left-0 h-[50vh] w-full bg-[#151515]'></div>
			</div>

			{/* Background Parallax Grid */}
			<div className='second-scroll'>
				<div className='wrap__parallax'>
					{/* Grid 1 */}
					<div className='s-second'>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861a88-a8861a86'
							className='inner_square'
						>
							<div>JULY</div>
							<div>30</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861a8d-a8861a86'
							className='inner_square'
						>
							<div>JULY</div>
							<div>17</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861a92-a8861a86'
							className='inner_square'
						>
							<div>SEPTEMBER</div>
							<div>14</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861a97-a8861a86'
							className='inner_square'
						>
							<div>JULY</div>
							<div>31</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861a9c-a8861a86'
							className='inner_square'
						>
							<div>JUNE</div>
							<div>02</div>
						</div>
					</div>
					{/* Grid 2 */}
					<div className='s-second'>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861aa2-a8861a86'
							className='inner_square'
						>
							<div>MARCH</div>
							<div>16</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861aa7-a8861a86'
							className='inner_square'
						>
							<div>DECEMBER</div>
							<div>25</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861aac-a8861a86'
							className='inner_square'
						>
							<div>MONDAY</div>
							<div>3:45 pm</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ab1-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
							<div>jan</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ab6-a8861a86'
							className='inner_square'
						>
							<div>2:44</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861abb-a8861a86'
							className='inner_square'
						>
							<div>tuesday</div>
						</div>
					</div>
					{/* Grid 3 */}
					<div className='s-second'>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ac1-a8861a86'
							className='inner_square'
						>
							<div>friday</div>
							<div>6:50</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ac6-a8861a86'
							className='inner_square'
						>
							<div>sunday</div>
							<div>12:40</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861acb-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
							<div>jan</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ad0-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
							<div>jan</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ad5-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
							<div>jan</div>
						</div>
					</div>
					{/* Grid 4 */}
					<div className='s-second'>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861adb-a8861a86'
							className='inner_square'
						>
							<div>
								september
								<br />
								14
							</div>
							<div>wed</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ae0-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
							<div>jan</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861ae5-a8861a86'
							className='inner_square'
						>
							<div>
								july
								<br />
								30
							</div>
							<div>friday</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861aea-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
							<div>jan</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861aef-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
						</div>
						<div
							id='w-node-_1b58b1b9-57ac-d14c-14f8-a393a8861af4-a8861a86'
							className='inner_square'
						>
							<div>jan</div>
							<div>jan</div>
						</div>
					</div>
				</div>
			</div>

			{/* Background Vertical Layout Overlay Lines */}
			<div className='wrap-bg w-hidden-medium w-hidden-small w-hidden-tiny'>
				<div className='ui__line'></div>
				<div className='ui__line'></div>
				<div className='ui__line'></div>
				<div className='ui__line'></div>
				<div className='ui__line'></div>
			</div>

			{/* Side Nav & Branding */}
			<div className='nav'>
				<div className='_w-copyright'>
					<div className='text-block-16 w-hidden-medium w-hidden-small w-hidden-tiny'>
						Timeframe Inc. - 2021
					</div>
				</div>
				<div className='_w-side-nav'>
					<a href='#' className='nav_links w-inline-block' onClick={(e) => e.preventDefault()}>
						<div className='text-block-18'>contact</div>
						<div className='outline-hover w-hidden-medium w-hidden-small w-hidden-tiny'>
							<div className='fill-hover'></div>
						</div>
					</a>
					<div className='ui-circle line'></div>
					<a href='#' className='nav_links w-inline-block' onClick={(e) => e.preventDefault()}>
						<div className='text-block-18'>VISION</div>
						<div className='outline-hover w-hidden-medium w-hidden-small w-hidden-tiny'>
							<div className='fill-hover'></div>
						</div>
					</a>
				</div>
				<a
					href='#'
					className='link__logo w-inline-block w--current'
					onClick={(e) => e.preventDefault()}
				>
					<img
						src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e3d5880c7e9f_logo-ts-white.png'
						alt='Logo'
						className='logo-ts-2 mobile w-hidden-main'
					/>
				</a>
			</div>

			{/* Main TimeFrame Brand Logo Icon */}
			<a href='#' className='_w-logo-ts w-inline-block' onClick={(e) => e.preventDefault()}>
				<img
					src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5ef4dcd563897e74b55d1045_Artboard.svg'
					width='150'
					alt='logo TimeFrame'
					className='logo__img w-hidden-medium w-hidden-small w-hidden-tiny'
				/>
			</a>

			{/* Fixed Hero & Interactive Device Animation Panel */}
			<div className='wrapper-hero'>
				<div className='arrow hide'>
					<img
						src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e31a480c7e7f_arrow.svg'
						alt=''
					/>
				</div>
				<div className='hero__pagination w-hidden-medium w-hidden-small w-hidden-tiny'>
					<div className='main__p'>What if we could travel through time? Just Slot it!</div>
				</div>
				<div className='nav-scroll w-hidden-medium w-hidden-small w-hidden-tiny'>
					<div className='scroll-bar'>
						<div className='pin-scroll'></div>
					</div>
				</div>

				{/* iPhone mockup outer frame */}
				<div className='iphone__mockup'></div>

				{/* iPhone Device Wrapper */}
				<div className='wrapper_content'>
					{/* Expand Slot visual cards overlay */}
					<div className='_w-expand-slot'>
						<div className='pic-expand _03'></div>
						<div className='pic-expand _02'></div>
						<div className='pic-expand _01'></div>
						<div className='pic-expand _04'></div>
						<div className='pic-expand _05'></div>
						<div className='pic-expand _06'></div>
					</div>

					{/* Device active app feeds */}
					<div className='rail-app-device'>
						{/* Slot Filmstrip Screen */}
						<div className='app-sc fold cc-revolution'>
							<div className='_w-slot'>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e35af60c7fb2_app-0001.png'
									alt='mobile interface screen'
								/>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e352fb0c7fb1_app-0002.png'
									alt='mobile interface screen'
								/>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e368510c7fc4_app-0003.png'
									alt='mobile interface screen'
								/>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e33fd40c7fbf_app-0004.png'
									alt='mobile interface screen'
								/>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e34d4d0c7fb4_app-0005.png'
									alt='mobile interface screen'
								/>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e34d4d0c7fb4_app-0005.png'
									alt='mobile interface screen'
								/>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e30f310c7fb9_app-0006.png'
									alt='mobile interface screen'
								/>
							</div>
						</div>

						{/* Phone App Nav Base */}
						<div className='nav-bar'>
							<img
								src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5f3f154d31fd617446d8f759_BASE.png'
								sizes='(max-width: 991px) 250px, 360px'
								srcSet='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5f3f154d31fd617446d8f759_BASE-p-500.png 500w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5f3f154d31fd617446d8f759_BASE.png 720w'
								alt='device navbar'
							/>
						</div>

						{/* Screen 1: Feed */}
						<div className='_01-app-feed'>
							<img
								src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e342cc0c7fba_app-002-feed.jpg'
								alt='mobile interface screen - profile page'
							/>
						</div>

						{/* Screen 2: Friends */}
						<div className='_02-app-friends'>
							<div className='_w-friends-app'>
								<div className='ui-friends-header'>
									<div className='div-block-318'>
										<img
											src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e3742b0c7f7e_Pic.png'
											width='117'
											alt='user-avatar'
											className='user-dj'
										/>
									</div>
								</div>
								<div className='ui-friends-feed'></div>
							</div>
						</div>

						{/* Screen 3: Search */}
						<div className='_03-app-search'>
							<div>
								<img
									src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e362ce0c7f91_img-search-02.jpg'
									sizes='(max-width: 991px) 252px, 360px'
									srcSet='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e362ce0c7f91_img-search-02-p-500.jpeg 500w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e362ce0c7f91_img-search-02-p-800.jpeg 800w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e362ce0c7f91_img-search-02-p-1080.jpeg 1080w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e362ce0c7f91_img-search-02.jpg 1125w'
									alt='mobile interface screen - search page'
									className='image-38'
								/>
							</div>
						</div>

						{/* Screen 4: News */}
						<div className='_04-app-news'>
							<img
								src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e39e210c7faf_img-news.jpg'
								sizes='(max-width: 991px) 252px, 360px'
								srcSet='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e39e210c7faf_img-news-p-500.jpeg 500w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e39e210c7faf_img-news-p-800.jpeg 800w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e39e210c7faf_img-news-p-1080.jpeg 1080w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e39e210c7faf_img-news.jpg 1125w'
								alt='mobile interface screen - news page'
								className='image-38'
							/>
						</div>

						{/* Screen 5: Profile */}
						<div className='_05-app-profile'>
							<img
								src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e352040c7f99_img-profile.jpg'
								sizes='(max-width: 991px) 252px, 360px'
								srcSet='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e352040c7f99_img-profile-p-500.jpeg 500w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e352040c7f99_img-profile-p-800.jpeg 800w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e352040c7f99_img-profile-p-1080.jpeg 1080w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e352040c7f99_img-profile.jpg 1125w'
								alt='mobile interface screen - profile page'
								className='image-38'
							/>
						</div>

						{/* Screen 6: Slot detail */}
						<div className='_06-app-slot'>
							<div className='pic-expand _03'></div>
						</div>
					</div>

					{/* Background pictures stack (Intro slide/scale transitions) */}
					<div className='picture w-hidden-medium w-hidden-small w-hidden-tiny'></div>
					<div className='picture mobile w-hidden-main'></div>

					<div className='wrap-pictures w-hidden-medium w-hidden-small w-hidden-tiny'>
						<div className='picture-6'></div>
						<div className='picture-5'></div>
						<div className='picture-4'></div>
						<div className='picture-3'></div>
						<div className='picture-2'></div>
					</div>

					<div className='wrap-pictures cc-mobile w-hidden-main'>
						<div className='picture-6'></div>
						<div className='picture-5'></div>
						<div className='picture-4'></div>
						<div className='picture-3'></div>
						<div className='picture-2'></div>
					</div>

					{/* Device Notch */}
					<div className='notch'>
						<img
							src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e38cb70c7f58_ui-notch-time.png'
							sizes='(max-width: 991px) 232px, 340px'
							srcSet='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e38cb70c7f58_ui-notch-time-p-500.png 500w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e38cb70c7f58_ui-notch-time-p-800.png 800w, https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e38cb70c7f58_ui-notch-time.png 851w'
							alt='mockup notch'
							className='img-notch'
						/>
					</div>

					{/* Initial Base Screen Mockup */}
					<div className='iphone-wrapper-device base'>
						<div className='app-sc'>
							<div className='over-img'></div>
							<img
								src='https://cdn.prod.website-files.com/5c6648378238e311a00c7e61/5c6648378238e3831d0c7fb8_app-001.jpg'
								alt='mobile interface screen - profile page'
								className='image-25'
							/>
						</div>
					</div>
				</div>

				{/* Horizontal Big Titles Track (Rail) */}
				<div
					style={{ display: 'flex' }}
					className='content__sliders w-hidden-medium w-hidden-small w-hidden-tiny'
				>
					<div className='_w-rail'>
						<div className='rail-sections'>
							<div className='_w-title-feed'>
								<h1 className='h1-section'>Feed</h1>
							</div>
							<div className='_w-title-friends'>
								<h1 className='h1-section'>Friends</h1>
							</div>
							<div className='_w-title-search'>
								<h1 className='h1-section'>Search</h1>
							</div>
							<div className='_w-title-news'>
								<h1 className='h1-section'>News</h1>
							</div>
							<div className='_w-title-profile'>
								<h1 className='h1-section'>Profile</h1>
							</div>
							<div className='_w-title-slot'>
								<h1 className='h1-section'>Slot</h1>
							</div>
						</div>
					</div>
				</div>

				{/* Center Hero Heading */}
				<div className='hero__track__heading'>
					<div className='_w-hero-ttitle'>
						<h1 className='heading-30'>A new way of designing, discovering and sharing time.</h1>
					</div>
				</div>
			</div>

			{/* Main Scrolling Text Sections */}
			<div className='main-container'>
				<div className='wrapper-section top'></div>

				{/* Section 1: Intro */}
				<div className='wrapper-section _001'>
					<div className='inner__content'>
						<h2 className='h2__page'>Join the revolution</h2>
						<div className='main__p'>
							Unlike other social networks TimeFrame captures not only the past and the present, but
							also the future activities of people. It closes the last gap. We call it the SOCIAL
							DIARY.
						</div>
					</div>
				</div>

				{/* Section 2: Feed */}
				<div className='wrapper-section cc-feed'>
					<div className='inner__content'>
						<div className='h-mobile w-hidden-main'>
							<div>Feed</div>
						</div>
						<h2 className='h2__page'>The first social network for time</h2>
						<div className='main__p'>
							With TimeFrame finally people share their upcoming plans and past experiences in a
							calendar system. It’s easy to find out when and where friends are available or what
							they are doing int he future.
						</div>
					</div>
				</div>

				{/* Section 3: Friends */}
				<div className='wrapper-section cc-friends'>
					<div className='inner__content'>
						<div className='h-mobile w-hidden-main'>
							<div>Friends</div>
						</div>
						<h2 className='h2__page'>Follow friends' calendars</h2>
						<div className='main__p'>
							Curious to know what your favorite stars are up to, wanting to discover special offers
							or when the weekly yoga classes takes place? Easy! Just subscribe to their calendars
							to get the inside info on their life and times.
						</div>
					</div>
				</div>

				{/* Section 4: Search */}
				<div className='wrapper-section cc-search'>
					<div className='inner__content'>
						<div className='h-mobile w-hidden-main'>
							<div>Search</div>
						</div>
						<h2 className='h2__page'>Be inspired by others and save their slots</h2>
						<div className='main__p'>
							Similar to Google Maps, where you navigate through the locations (GPS), with Timeslot
							you navigate through time (TPS) to find public Slots. It’s a new way of keeping track
							of dates. One tap, it’s done!
						</div>
					</div>
				</div>

				{/* Section 5: News */}
				<div className='wrapper-section cc-news'>
					<div className='inner__content'>
						<div className='h-mobile w-hidden-main'>
							<div>News</div>
						</div>
						<h2 className='h2__page'>A beautiful way to create the future</h2>
						<div className='main__p'>
							Timeframe raises the calendar to an all new level. For the first time we can comment
							on event dates. A simple but powerful functionality, which will change how we plan our
							daily lives and communicate with each other.
						</div>
					</div>
				</div>

				{/* Section 6: Profile */}
				<div className='wrapper-section cc-profile'>
					<div className='inner__content'>
						<div className='h-mobile w-hidden-main'>
							<div>Profile</div>
						</div>
						<h2 className='h2__page'>Your personal time machine</h2>
						<div className='main__p'>
							A cool, easy-to-use, yet powerful multimedia calendar for creating Slots with photos,
							videos, music, voice memos and notes. A portable cork board for all our moments.
						</div>
					</div>
				</div>

				{/* Section 7: Slot */}
				<div className='wrapper-section cc-profile slot'>
					<div className='inner__content'>
						<div className='h-mobile w-hidden-main'>
							<div>Slot</div>
						</div>
						<h2 className='h2__page'>A book of memories for eternity</h2>
						<div className='main__p'>
							When we were little kids, we all loved to create a personal diary. Wouldn’t it be
							wonderful if we could save all our magical moments? Just create a Slot and your
							calendar becomes a personal diary.
						</div>
					</div>
				</div>
			</div>

			{/* Sticky Final Footer Container */}
			<div className='wrapper h'>
				<div className='track cc-product-pages sites hor'>
					<div className='section cc-sticky wide _02'>
						<div className='_w-screen-title'>
							<div className='_w-label-everyday every'>
								<h1 className='heading__bottom'>Every</h1>
							</div>
							<div className='_w-label-everyday day'>
								<div className='hr-title'></div>
								<h1 className='heading__bottom'>Day</h1>
							</div>
							<div className='_w-label-everyday counts'>
								<h1 className='heading__bottom'>Counts</h1>
							</div>
							<div className='wrapper__comingsoon'>
								<div className='main__p sm'>
									Coming soon on the <br />
									AppStore and Google Play
								</div>
							</div>
						</div>
						<div className='triggers _02'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
