import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

const heroImage =
	'https://assets.website-files.com/62fabf1147e5aa35fb6462cc/62faef428a2acadcd3bbddc6_pexels-pixabay-531321.jpg';

const imageSets = [
	[
		'https://assets.website-files.com/62fabf1147e5aa35fb6462cc/62faf0fc0d56ab0413a654f4_thanks-1.c050f96d.webp',
		'https://assets.website-files.com/62fabf1147e5aa35fb6462cc/62faf0fd0d56ab4c0ea654fa_thanks-2.5b322fb7.webp',
		'https://assets.website-files.com/62fabf1147e5aa35fb6462cc/62faf0fd0d56ab421aa654fc_thanks-3.48846b1e.webp',
	],
	[
		'https://assets.website-files.com/62fabf1147e5aa35fb6462cc/62faf0fc0d56ab9a40a654f6_thanks-1bis.a9fa8549.webp',
		'https://assets.website-files.com/62fabf1147e5aa35fb6462cc/62faf0fd0d56aba410a654f8_thanks-2bis.0afa6688.webp',
		'https://assets.website-files.com/62fabf1147e5aa35fb6462cc/62faf0fd0d56ab3604a654fe_thanks-3bis.68c75dbb.webp',
	],
];

function clamp(value: number, min = 0, max = 1) {
	return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
	return start + (end - start) * progress;
}

function useViewportScroll() {
	const [state, setState] = useState(() => ({
		scrollY: typeof window === 'undefined' ? 0 : window.scrollY,
		width: typeof window === 'undefined' ? 1200 : window.innerWidth,
		height: typeof window === 'undefined' ? 800 : window.innerHeight,
	}));

	useEffect(() => {
		let frame = 0;
		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				setState({
					scrollY: window.scrollY,
					width: window.innerWidth,
					height: window.innerHeight,
				});
			});
		};

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	return state;
}

function useBoxTimelineTrigger<T extends Element>() {
	const ref = useRef<T | null>(null);
	const lastScrollY = useRef(typeof window === 'undefined' ? 0 : window.scrollY);
	const [active, setActive] = useState(false);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const node = ref.current;

				if (!node) {
					return;
				}

				const rect = node.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const startLine = viewportHeight * 0.8;
				const currentScrollY = window.scrollY;
				const scrollingDown = currentScrollY >= lastScrollY.current;

				if (scrollingDown && rect.top <= startLine) {
					setActive(true);
				}

				if (!scrollingDown && rect.top > startLine) {
					setActive(false);
				}

				lastScrollY.current = currentScrollY;
			});
		};

		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	return { ref, active };
}

function Logo() {
	return (
		<a className='logo' href='#top' aria-label='Tricks home'>
			TRICKS
		</a>
	);
}

function Hamburger() {
	return (
		<a className='hamburger' href='#top' aria-label='Open menu'>
			<span />
			<span />
			<span />
		</a>
	);
}

function ThanksLayer({
	inverted = false,
	scale,
	clipPath,
}: {
	inverted?: boolean;
	scale: number;
	clipPath?: string;
}) {
	const sources = inverted ? imageSets[1] : imageSets[0];

	return (
		<div className={`thanks-contain${inverted ? ' is-inverted' : ''}`} style={{ clipPath }}>
			<p className='thanks-text'>THANKS</p>
			{sources.map((src, index) => (
				<div className={`thanks-img is-${index + 1}`} key={src}>
					<div className='thanks-img-height'>
						<img
							className='thanks-photo'
							src={src}
							alt=''
							style={{ transform: `scale(${scale})` }}
						/>
					</div>
				</div>
			))}
		</div>
	);
}

export default function App() {
	const { scrollY, width, height } = useViewportScroll();
	const boxTimeline = useBoxTimelineTrigger<HTMLDivElement>();

	const animation = useMemo(() => {
		const viewport = Math.max(height, 1);
		const thanksStart = viewport * 2;
		const thanksProgress = clamp((scrollY - thanksStart) / viewport);
		const imageScale = lerp(1.4, 1, thanksProgress);
		const overlayStart = lerp(100, 0, thanksProgress);

		return {
			navTransparent: scrollY < viewport * 0.18,
			boxTravel: Math.max(width * 0.78, 0),
			overlayClip: `polygon(${overlayStart}% 0%, 100% 0%, 100% 100%, ${overlayStart}% 100%)`,
			imageScale,
		};
	}, [height, scrollY, width]);

	return (
		<main id='top' className='site-shell'>
			<div className='trigger-div' />
			<nav className={`nav${animation.navTransparent ? ' transparent' : ''}`}>
				<div className='container is-nav'>
					<Logo />
					<Hamburger />
				</div>
			</nav>

			<section className='hero-section' style={{ backgroundImage: `url(${heroImage})` }}>
				<div className='container is-hero' />
			</section>

			<section className='about-section'>
				<div className='container is-about'>
					<div
						ref={boxTimeline.ref}
						className={`box${boxTimeline.active ? ' is-active' : ''}`}
						style={{ '--box-travel': `${animation.boxTravel}px` } as CSSProperties}
					/>
				</div>
			</section>

			<section className='thanks-section'>
				<div className='thanks-panel'>
					<ThanksLayer scale={animation.imageScale} />
					<ThanksLayer inverted scale={animation.imageScale} clipPath={animation.overlayClip} />
				</div>
			</section>

			<div className='full-dark' />
			<div className='final-dark' />
		</main>
	);
}
