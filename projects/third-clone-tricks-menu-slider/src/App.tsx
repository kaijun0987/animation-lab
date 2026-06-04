import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import gsap from 'gsap';
import '@splidejs/react-splide/css/core';

const menuLinks = [
	{
		label: 'Wizardry',
		number: '01',
		offset: 'is-first',
		href: 'https://wizardry-technique.webflow.io/',
		image:
			'https://cdn.prod.website-files.com/6067559c86540cc17e19c4d5/6068d433f45cd359816c56d9_new-wizardry.gif',
	},
	{
		label: 'Patreon',
		number: '02',
		offset: 'is-second',
		href: 'https://www.patreon.com/timothyricks',
		image:
			'https://cdn.prod.website-files.com/6067559c86540cc17e19c4d5/6068d432c984667f71bf90b9_new-patreon.gif',
	},
	{
		label: 'YouTube',
		number: '03',
		offset: 'is-third',
		href: 'https://www.youtube.com/c/timothy-ricks',
		image:
			'https://cdn.prod.website-files.com/6067559c86540cc17e19c4d5/6068d432934dc41264f4089e_new-youtube.gif',
	},
];

const subLinks = [
	{ label: 'Consulting', href: 'https://www.timothyricks.com/' },
	{
		label: 'Custom Code',
		href: 'https://www.notion.so/timothyricks/9c289f61652d457797b1251cdf9beb61?v=873f669610044b2b9e9d46d043dfa380',
	},
	{ label: 'Cloneables', href: 'https://webflow.com/tricks' },
];

const flatMenuClip =
	'polygon(0 0, 100% 0, 100% 100%, 90% 100%, 80% 100%, 70% 100%, 60% 100%, 50% 100%, 40% 100%, 30% 100%, 20% 100%, 10% 100%, 0 100%)';
const openingMenuClip =
	'polygon(0 0, 100% 0, 100% 18%, 90% 32%, 80% 52%, 70% 74%, 60% 92%, 50% 100%, 40% 92%, 30% 74%, 20% 52%, 10% 32%, 0 18%)';
const closingMenuClip =
	'polygon(0 0, 100% 0, 100% 100%, 90% 96%, 80% 91%, 70% 86%, 60% 82%, 50% 80%, 40% 82%, 30% 86%, 20% 91%, 10% 96%, 0 100%)';

type CursorVariant = 'default' | 'open' | 'drag' | 'control';

const slides = [
	'https://cdn.prod.website-files.com/6068671735ae6e60c1a497a3/606867de25efbebb66c27220_photo1-p-500.jpeg',
	'https://cdn.prod.website-files.com/6068671735ae6e60c1a497a3/606867f21e205c04eda17081_photo2-p-500.jpeg',
	'https://cdn.prod.website-files.com/6068671735ae6e60c1a497a3/606867fb25efbe5b91c272b6_photo3-p-500.jpeg',
	'https://cdn.prod.website-files.com/6068671735ae6e60c1a497a3/6068680904d7b92afa7ba883_photo4-p-500.jpeg',
	'https://cdn.prod.website-files.com/6068671735ae6e60c1a497a3/6068681573e52211e9e86b5f_photo5-p-500.jpeg',
	'https://cdn.prod.website-files.com/6068671735ae6e60c1a497a3/606868d3b9a1850ee2de4ff6_photo6-p-500.jpeg',
	'https://cdn.prod.website-files.com/6068671735ae6e60c1a497a3/606868dc16f37465c307811e_photo7-p-500.jpeg',
];

function Logo() {
	return (
		<a className='nav-logo' href='#top' aria-label='T.RICKS home'>
			<svg viewBox='0 0 107 24' aria-hidden='true'>
				<g>
					<polygon points='16.241,0.363 0,0.363 0,5.343 5.652,5.343 5.652,23.643 10.589,23.643 10.589,5.343 16.241,5.343' />
					<rect x='12.612' y='19.443' width='4.164' height='4.2' />
					<rect x='39.204' y='0.363' width='4.938' height='23.34' />
					<path d='M54.553,5.943c1.785-1.2,4.105-1.26,5.89-0.12c0.892,0.54,1.606,1.32,2.201,2.22h5.414c-0.476-1.5-1.249-2.94-2.32-4.14c-1.011-1.2-2.261-2.22-3.688-2.88c-1.428-0.66-2.915-1.02-4.462-1.02c-1.963,0-3.867,0.54-5.592,1.62c-1.725,1.08-3.094,2.58-4.045,4.38c-1.011,1.86-1.487,3.9-1.487,6s0.535,4.14,1.547,6c0.952,1.8,2.32,3.3,4.045,4.38c1.666,1.08,3.569,1.62,5.533,1.62c1.547,0,3.093-0.36,4.462-1.02c1.368-0.66,2.617-1.62,3.629-2.82c1.011-1.26,1.844-2.64,2.32-4.14l-5.414,0.06c-0.535,0.84-1.309,1.62-2.201,2.16c-1.785,1.14-4.105,1.02-5.83-0.18c-0.952-0.66-1.725-1.56-2.261-2.58c-0.535-1.08-0.833-2.28-0.833-3.48c0-1.2,0.297-2.4,0.892-3.48C52.827,7.443,53.601,6.603,54.553,5.943z' />
					<polygon points='83.941,0.363 75.018,12.003 75.018,0.363 70.021,0.363 70.021,23.703 75.018,23.703 75.018,12.003 83.941,23.643 90.188,23.643 81.264,12.003 90.188,0.363' />
					<path d='M105.774,13.683c-0.654-1.02-1.546-1.92-2.617-2.52l-5.89-3.48c-0.417-0.18-0.714-0.6-0.714-1.08c0-0.48,0.238-0.84,0.595-1.08c0.416-0.3,0.952-0.42,1.487-0.42c0.654-0.06,1.309,0.18,1.784,0.6c0.417,0.36,0.655,0.96,0.655,1.56h4.997c0-1.26-0.298-2.46-0.833-3.54c-0.595-1.14-1.487-2.1-2.558-2.7c-1.249-0.66-2.618-1.02-4.045-0.96c-1.309-0.06-2.618,0.24-3.807,0.84c-1.13,0.48-2.082,1.32-2.796,2.34c-0.654,0.96-1.011,2.1-1.011,3.24c0,1.08,0.297,2.1,0.833,3c0.595,0.96,1.428,1.74,2.38,2.34l5.949,3.54c0.655,0.3,1.012,0.96,1.071,1.62c0,0.6-0.357,1.14-0.833,1.44c-0.595,0.42-1.308,0.6-2.022,0.6c-0.773,0-1.547-0.3-2.082-0.84c-0.654-0.66-0.952-1.5-0.892-2.34h-5.235c-0.119,1.68,0.357,3.36,1.309,4.8c0.773,1.14,1.785,1.98,3.034,2.52c1.249,0.54,2.558,0.78,3.867,0.78c1.428,0,2.855-0.3,4.164-0.96c1.19-0.6,2.261-1.5,3.034-2.58c0.714-1.02,1.13-2.22,1.13-3.48C106.726,15.783,106.369,14.643,105.774,13.683z' />
					<path d='M33.255,11.643c0.714-1.14,1.071-2.46,1.071-3.78c0-0.96-0.179-1.86-0.535-2.76c-0.357-0.9-0.892-1.74-1.547-2.46c-0.714-0.72-1.487-1.26-2.38-1.68c-0.892-0.42-1.785-0.6-2.737-0.6h-8.329v23.28h4.938v-8.76h0.535l6.722,8.88H37.3l-7.317-9.54C31.292,13.683,32.422,12.783,33.255,11.643z M29.329,7.803c0,1.2-1.011,2.16-2.201,2.1h-3.45v-4.56h3.391c0.06,0,0.119,0,0.179,0c1.19,0.06,2.142,1.08,2.082,2.28C29.329,7.683,29.329,7.743,29.329,7.803z' />
				</g>
			</svg>
		</a>
	);
}

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [menuClosing, setMenuClosing] = useState(false);
	const [menuButtonCovered, setMenuButtonCovered] = useState(false);
	const [hoveredMenuLink, setHoveredMenuLink] = useState<string | null>(null);
	const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
	const splideRef = useRef<{ splide?: { go: (control: string) => void } } | null>(null);
	const menuTimelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);
	const menuClosingTimeoutRef = useRef<number | null>(null);
	const menuButtonColorTimeoutRef = useRef<number | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const sliderContainerRef = useRef<HTMLDivElement | null>(null);
	const pageCursorRingRef = useRef<HTMLDivElement | null>(null);
	const pageCursorDotRef = useRef<HTMLSpanElement | null>(null);
	const pageCursorLabelRef = useRef<HTMLSpanElement | null>(null);
	const cursorHiddenRef = useRef(false);

	useLayoutEffect(() => {
		const menu = menuRef.current;
		if (!menu) {
			return;
		}

		const background = menu.querySelector('.menu-background');
		const wizardryLink = menu.querySelector('.menu-link.is-first');
		const patreonLink = menu.querySelector('.menu-link.is-second');
		const youtubeLink = menu.querySelector('.menu-link.is-third');
		const menuSide = menu.querySelector('.menu-side');
		const subLinks = menu.querySelectorAll('.sub-link');
		const items = menu.querySelectorAll('.menu-link, .menu-side, .sub-link');

		menuTimelineRef.current?.kill();
		gsap.killTweensOf([background, items]);

		if (menuOpen) {
			gsap.set(menu, { display: 'block', pointerEvents: 'auto' });
			gsap.set(items, { y: 52, opacity: 0 });
			menuTimelineRef.current = gsap
				.timeline({
					onComplete: () => {
						menuTimelineRef.current = null;
					},
				})
				.fromTo(
					background,
					{
						top: 0,
						yPercent: 0,
						height: 0,
						clipPath: openingMenuClip,
						borderTopLeftRadius: '0% 0rem',
						borderTopRightRadius: '0% 0rem',
						borderBottomLeftRadius: '0% 0rem',
						borderBottomRightRadius: '0% 0rem',
					},
					{
						top: 0,
						yPercent: 0,
						height: '100%',
						clipPath: flatMenuClip,
						borderTopLeftRadius: '0% 0rem',
						borderTopRightRadius: '0% 0rem',
						borderBottomLeftRadius: '0% 0rem',
						borderBottomRightRadius: '0% 0rem',
						duration: 1.2,
						ease: 'power4.inOut',
					}
				)
				.fromTo(
					[wizardryLink, menuSide].filter(Boolean),
					{ y: 52, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.58, ease: 'power3.out' },
					'-=0.66'
				)
				.fromTo(
					patreonLink,
					{ y: 52, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.54, ease: 'power3.out' },
					'-=0.36'
				)
				.fromTo(
					youtubeLink,
					{ y: 52, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.54, ease: 'power3.out' },
					'-=0.31'
				)
				.fromTo(
					subLinks,
					{ y: 28, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.11, duration: 0.42, ease: 'power3.out' },
					'-=0.34'
				);
		} else {
			gsap.set(items, { y: -24, opacity: 0 });
			setHoveredMenuLink(null);
			menuTimelineRef.current = gsap
				.timeline({
					onComplete: () => {
						gsap.set(menu, { display: 'none', pointerEvents: 'none' });
						gsap.set(background, {
							top: 0,
							yPercent: 0,
							height: 0,
							clipPath: flatMenuClip,
							borderTopLeftRadius: '0% 0rem',
							borderTopRightRadius: '0% 0rem',
							borderBottomLeftRadius: '0% 0rem',
							borderBottomRightRadius: '0% 0rem',
						});
						menuTimelineRef.current = null;
					},
				})
				.set(background, {
					top: 0,
					yPercent: 0,
					height: '100%',
					clipPath: flatMenuClip,
					borderTopLeftRadius: '0% 0rem',
					borderTopRightRadius: '0% 0rem',
					borderBottomLeftRadius: '0% 0rem',
					borderBottomRightRadius: '0% 0rem',
				})
				.to(background, {
					yPercent: -100,
					clipPath: closingMenuClip,
					borderTopLeftRadius: '0% 0rem',
					borderTopRightRadius: '0% 0rem',
					borderBottomLeftRadius: '0% 0rem',
					borderBottomRightRadius: '0% 0rem',
					duration: 0.95,
					ease: 'power4.inOut',
				});
		}
	}, [menuOpen]);

	useEffect(() => {
		const cursorRing = pageCursorRingRef.current;
		const cursorDot = pageCursorDotRef.current;
		const cursorLabel = pageCursorLabelRef.current;
		if (!cursorRing || !cursorDot || !cursorLabel) {
			return;
		}

		gsap.set([cursorRing, cursorDot, cursorLabel], { xPercent: -50, yPercent: -50 });

		const ringXTo = gsap.quickTo(cursorRing, 'x', { duration: 0.48, ease: 'power3.out' });
		const ringYTo = gsap.quickTo(cursorRing, 'y', { duration: 0.48, ease: 'power3.out' });
		const dotXTo = gsap.quickTo(cursorDot, 'x', { duration: 0.14, ease: 'power2.out' });
		const dotYTo = gsap.quickTo(cursorDot, 'y', { duration: 0.14, ease: 'power2.out' });
		const labelXTo = gsap.quickTo(cursorLabel, 'x', { duration: 0.48, ease: 'power3.out' });
		const labelYTo = gsap.quickTo(cursorLabel, 'y', { duration: 0.48, ease: 'power3.out' });

		const showCursor = () => {
			if (cursorHiddenRef.current) {
				return;
			}

			gsap.to([cursorRing, cursorDot], {
				autoAlpha: 1,
				duration: 0.18,
				ease: 'power2.out',
			});
		};
		const hideCursor = () => {
			gsap.to([cursorRing, cursorDot], {
				autoAlpha: 0,
				duration: 0.18,
				ease: 'power2.out',
			});
		};
		const moveCursor = (event: PointerEvent) => {
			const targetX = event.clientX - 6;

			ringXTo(targetX);
			ringYTo(event.clientY);
			labelXTo(targetX);
			labelYTo(event.clientY);
			dotXTo(targetX);
			dotYTo(event.clientY);
			showCursor();
		};

		window.addEventListener('pointermove', moveCursor);
		window.addEventListener('pointerleave', hideCursor);

		return () => {
			window.removeEventListener('pointermove', moveCursor);
			window.removeEventListener('pointerleave', hideCursor);
		};
	}, []);

	useEffect(() => {
		const cursorRing = pageCursorRingRef.current;
		const cursorDot = pageCursorDotRef.current;
		if (!cursorRing || !cursorDot) {
			return;
		}

		const shouldHideCursor = menuOpen || menuClosing;
		cursorHiddenRef.current = shouldHideCursor;

		if (shouldHideCursor) {
			setCursorVariant('default');
			gsap.to([cursorRing, cursorDot], {
				autoAlpha: 0,
				duration: 0.12,
				ease: 'power2.out',
			});
		}
	}, [menuOpen, menuClosing]);

	useEffect(() => {
		if (menuButtonColorTimeoutRef.current !== null) {
			window.clearTimeout(menuButtonColorTimeoutRef.current);
			menuButtonColorTimeoutRef.current = null;
		}

		menuButtonColorTimeoutRef.current = window.setTimeout(
			() => {
				setMenuButtonCovered(menuOpen);
				menuButtonColorTimeoutRef.current = null;
			},
			menuOpen ? 280 : 260
		);

		return () => {
			if (menuButtonColorTimeoutRef.current !== null) {
				window.clearTimeout(menuButtonColorTimeoutRef.current);
				menuButtonColorTimeoutRef.current = null;
			}
		};
	}, [menuOpen]);

	useEffect(() => {
		if (!menuClosing) {
			return;
		}

		if (menuClosingTimeoutRef.current !== null) {
			window.clearTimeout(menuClosingTimeoutRef.current);
		}

		menuClosingTimeoutRef.current = window.setTimeout(() => {
			const menu = menuRef.current;
			const background = menu?.querySelector('.menu-background');

			if (!menuOpen && menu) {
				if (background) {
					gsap.set(background, {
						top: 0,
						yPercent: 0,
						height: 0,
						clipPath: flatMenuClip,
					});
				}
				gsap.set(menu, { display: 'none', pointerEvents: 'none' });
			}

			setMenuClosing(false);
			menuClosingTimeoutRef.current = null;
		}, 980);

		return () => {
			if (menuClosingTimeoutRef.current !== null) {
				window.clearTimeout(menuClosingTimeoutRef.current);
				menuClosingTimeoutRef.current = null;
			}
		};
	}, [menuClosing]);

	const handleMenuToggle = () => {
		if (menuOpen) {
			setMenuClosing(true);
			setMenuOpen(false);
			return;
		}

		if (menuClosingTimeoutRef.current !== null) {
			window.clearTimeout(menuClosingTimeoutRef.current);
			menuClosingTimeoutRef.current = null;
		}
		if (menuButtonColorTimeoutRef.current !== null) {
			window.clearTimeout(menuButtonColorTimeoutRef.current);
			menuButtonColorTimeoutRef.current = null;
		}
		setMenuButtonCovered(false);
		setMenuClosing(false);
		setMenuOpen(true);
	};

	const setInteractiveCursorVariant = (variant: CursorVariant) => {
		if (menuOpen || menuClosing) {
			return;
		}

		setCursorVariant(variant);
	};

	const isPointerInSliderImageArea = (event: ReactPointerEvent<HTMLDivElement>) => {
		const sliderContainer = sliderContainerRef.current;
		const track = sliderContainer?.querySelector('.splide__track');
		const section = sliderContainer?.closest('.slider-section');
		if (!track || !section) {
			return false;
		}

		const trackRect = track.getBoundingClientRect();
		const isInsideTrack =
			event.clientX >= trackRect.left &&
			event.clientX <= trackRect.right &&
			event.clientY >= trackRect.top &&
			event.clientY <= trackRect.bottom;
		if (!isInsideTrack) {
			return false;
		}

		const waveCurveY = (progress: number, height: number) => {
			const edgeY = height * 0.3322;
			const centerLift = height * 0.6678;
			return edgeY + centerLift * Math.sin(Math.PI * progress);
		};

		const waves = section.querySelectorAll<HTMLElement>('.slider-wave');
		for (const wave of waves) {
			const waveRect = wave.getBoundingClientRect();
			const isInsideWave =
				event.clientX >= waveRect.left &&
				event.clientX <= waveRect.right &&
				event.clientY >= waveRect.top &&
				event.clientY <= waveRect.bottom;
			if (!isInsideWave) {
				continue;
			}

			const progress = (event.clientX - waveRect.left) / waveRect.width;
			const curveY = waveCurveY(progress, waveRect.height);
			const localY = event.clientY - waveRect.top;

			if (wave.classList.contains('is-top') && localY <= curveY) {
				return false;
			}

			if (wave.classList.contains('is-bottom') && localY >= waveRect.height - curveY) {
				return false;
			}
		}

		return true;
	};

	const updateSliderCursor = (event: ReactPointerEvent<HTMLDivElement>) => {
		setInteractiveCursorVariant(isPointerInSliderImageArea(event) ? 'drag' : 'default');
	};

	const menuAccessibleActive = menuOpen || menuClosing;

	return (
		<main
			id='top'
			className={`site-shell${menuOpen ? ' is-menu-open' : ''}${menuButtonCovered ? ' is-menu-button-covered' : ''}${menuClosing ? ' is-menu-closing' : ''}`}
		>
			<div className={`page-cursor is-${cursorVariant}`} aria-hidden='true'>
				<div ref={pageCursorRingRef} className='page-cursor-ring' />
				<span ref={pageCursorLabelRef} className='page-cursor-label'>
					{cursorVariant === 'drag' ? 'DRAG' : 'OPEN'}
				</span>
				<span ref={pageCursorDotRef} className='page-cursor-dot' />
			</div>

			<nav className='nav-section' aria-label='Primary navigation'>
				<div ref={menuRef} className='menu-panel'>
					<div className='menu-background' />
					<div className='menu-container'>
						<div className='menu-left'>
							{menuLinks.map((link) => (
								<img
									key={link.label}
									className={`menu-hover-image ${link.offset}${hoveredMenuLink === link.label ? ' is-visible' : ''}`}
									src={link.image}
									alt=''
									aria-hidden='true'
								/>
							))}
							{menuLinks.map((link) => (
								<a
									key={link.label}
									className={`menu-link ${link.offset}`}
									href={link.href}
									target='_blank'
									rel='noreferrer'
									onBlur={() => setHoveredMenuLink(null)}
									onFocus={() => setHoveredMenuLink(link.label)}
									onMouseEnter={() => setHoveredMenuLink(link.label)}
									onMouseLeave={() => setHoveredMenuLink(null)}
								>
									<span className='menu-link-line' />
									<span className='menu-link-copy'>
										<span className='menu-link-label'>{link.label}</span>
										<span className='menu-link-number'>{link.number}</span>
									</span>
								</a>
							))}
						</div>

						<div className='menu-right'>
							<img
								className='menu-side'
								src='https://cdn.prod.website-files.com/6067559c86540cc17e19c4d5/60687c1ff45cd37c936af69c_menu-graphic.svg'
								alt=''
							/>
							<div className='sub-links'>
								{subLinks.map((link) => (
									<a
										key={link.label}
										className='sub-link'
										href={link.href}
										target='_blank'
										rel='noreferrer'
									>
										<span>{link.label}</span>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='nav-container'>
					<Logo />
					<button
						className='menu-trigger'
						type='button'
						aria-label={menuAccessibleActive ? 'Close menu' : 'Open menu'}
						aria-expanded={menuAccessibleActive}
						onMouseEnter={() => setInteractiveCursorVariant('open')}
						onMouseLeave={() => setInteractiveCursorVariant('default')}
						onFocus={() => setInteractiveCursorVariant('open')}
						onBlur={() => setInteractiveCursorVariant('default')}
						onClick={handleMenuToggle}
					>
						<span className='trigger-circle' />
						<span className='trigger-line is-one' />
						<span className='trigger-line is-two' />
					</button>
				</div>
			</nav>

			<section className='hero-section'>
				<div className='hero-container'>
					<div className='hero-wrap'>
						<h1>
							<span>Becoming a</span>
							<span>Webflow wizard</span>
						</h1>
						<p>Interactions, Layout, &amp; Custom Code</p>
					</div>
				</div>
			</section>

			<section className='slider-section mb-20' aria-label='Photo slider'>
				<div className='slider-wave is-top'>
					<svg viewBox='0 0 804 50.167' preserveAspectRatio='none' aria-hidden='true'>
						<path d='M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z' />
					</svg>
				</div>
				<div
					ref={sliderContainerRef}
					className='slider-container'
					onPointerMove={updateSliderCursor}
					onPointerLeave={() => setCursorVariant('default')}
				>
					<Splide
						ref={splideRef}
						options={{
							type: 'loop',
							drag: true,
							focus: 'center',
							arrows: false,
							pagination: false,
							gap: '1.05rem',
							perPage: 3,
							speed: 760,
							easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
							breakpoints: {
								767: {
									perPage: 1,
									gap: '0.7rem',
									padding: { left: '0rem', right: '0rem' },
								},
							},
						}}
						aria-label='T.RICKS image slider'
					>
						{slides.map((slide, index) => (
							<SplideSlide key={slide}>
								<img className='slide-image' src={slide} alt={`Slider portrait ${index + 1}`} />
							</SplideSlide>
						))}
					</Splide>
				</div>
				<div className='slider-wave is-bottom'>
					<svg viewBox='0 0 804 50.167' preserveAspectRatio='none' aria-hidden='true'>
						<path d='M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z' />
					</svg>
				</div>
				<div className='slider-controls'>
					<button
						className='slider-control'
						type='button'
						aria-label='Previous slide'
						onMouseEnter={() => setInteractiveCursorVariant('control')}
						onMouseLeave={() => setInteractiveCursorVariant('default')}
						onFocus={() => setInteractiveCursorVariant('control')}
						onBlur={() => setInteractiveCursorVariant('default')}
						onClick={() => splideRef.current?.splide?.go('<')}
					>
						<span />
					</button>
					<button
						className='slider-control is-next'
						type='button'
						aria-label='Next slide'
						onMouseEnter={() => setInteractiveCursorVariant('control')}
						onMouseLeave={() => setInteractiveCursorVariant('default')}
						onFocus={() => setInteractiveCursorVariant('control')}
						onBlur={() => setInteractiveCursorVariant('default')}
						onClick={() => splideRef.current?.splide?.go('>')}
					>
						<span />
					</button>
				</div>
			</section>
		</main>
	);
}
