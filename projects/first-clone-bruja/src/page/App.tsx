import { useEffect, useRef } from 'react';
import { BlurReveal } from '../components/blur-reveal';
import { MAIN_SECTION_TIMINGS, MainSection } from '../components/page/home/main-section';
import { ZoomInteractiveCard } from '../components/zoom-interactive-card';

const cards = [
	{
		image:
			'https://framerusercontent.com/images/tilFB77GIIJEbMbevGvn7ri7uw.webp?scale-down-to=1024&width=3200&height=1800',
		title: 'ParcelGrid',
		description: 'A unified locker system',
		color: 'bg-[#F5F1EE]',
	},
	{
		image:
			'https://framerusercontent.com/images/pcY81iAVbZUtg03eHnPXQCBdvb4.webp?scale-down-to=1024&width=3200&height=1800',
		title: 'Storyliner',
		description: 'A cohesive media companion',
		color: 'bg-[#F4F1F2]',
	},
	{
		image:
			'https://framerusercontent.com/images/c6ZlMfGbtRonij9TExT1pTDi4.webp?scale-down-to=1024&width=3200&height=1800',
		title: 'Voyoger',
		description: 'A companion app for travelers',
		color: 'bg-[#EEF3F1]',
	},
	{
		image:
			'https://framerusercontent.com/images/SpfaL4nI2ODb1baQVSWJoeSA.webp?scale-down-to=1024&width=3200&height=1800',
		title: 'Mindspace',
		description: 'A desktop app for connected ideas',
		color: 'bg-[#F0F4F6]',
	},
	{
		image:
			'https://framerusercontent.com/images/visU86F3rX2bOfgZq0Rw0T3D74.webp?scale-down-to=1024&width=3200&height=1800',
		title: 'Pigmenta',
		description: 'A tablet studio for digital painters',
		color: 'bg-[#F2F1F6]',
	},
];

const CARD_REVEAL_DELAY = MAIN_SECTION_TIMINGS.P_REVEAL_DELAY + 0.5;
const CARD_REVEAL_DURATION = Math.max(
	0,
	MAIN_SECTION_TIMINGS.P_REVEAL_DELAY + MAIN_SECTION_TIMINGS.P_REVEAL_DURATION - 0.2
);

const renderCards = (suffix: string, offsetY: number) =>
	cards.map((card, index) => (
		<BlurReveal
			key={`${card.title}-${suffix}-${index}`}
			className='w-full'
			duration={CARD_REVEAL_DURATION}
			delay={CARD_REVEAL_DELAY}
			offsetY={offsetY}
		>
			<ZoomInteractiveCard
				image={card.image}
				title={card.title}
				description={card.description}
				color={card.color}
			/>
		</BlurReveal>
	));

export default function App() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const topListRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);
	const isAdjustingRef = useRef(false);

	useEffect(() => {
		const scrollEl = scrollRef.current;
		const listEl = listRef.current;
		const topListEl = topListRef.current;
		const mainEl = mainRef.current;
		if (!scrollEl || !mainEl) {
			return;
		}

		const getMetrics = () => {
			const listHeight = listEl?.offsetHeight || topListEl?.offsetHeight || 0;
			const mainHeight = mainEl.offsetHeight;
			const viewportHeight = scrollEl.clientHeight;
			return { listHeight, mainHeight, viewportHeight };
		};

		const resetToMain = () => {
			const { listHeight, mainHeight, viewportHeight } = getMetrics();
			const centeredOffset = listHeight + mainHeight / 2 - viewportHeight / 2.44;
			const peekOffset = -Math.min(80, viewportHeight * 0.18);
			scrollEl.scrollTop = Math.max(0, centeredOffset + peekOffset);
		};

		const handleScroll = () => {
			if (isAdjustingRef.current) {
				return;
			}

			const { listHeight, mainHeight } = getMetrics();
			if (listHeight === 0) {
				return;
			}

			const jump = listHeight + mainHeight;
			const upperBound = listHeight * 0.25;
			const lowerBound = listHeight + mainHeight + listHeight * 0.75;

			if (scrollEl.scrollTop < upperBound) {
				isAdjustingRef.current = true;
				scrollEl.scrollTop += jump;
				isAdjustingRef.current = false;
			} else if (scrollEl.scrollTop > lowerBound) {
				isAdjustingRef.current = true;
				scrollEl.scrollTop -= jump;
				isAdjustingRef.current = false;
			}
		};

		const resetAfterImagesLoad = () => {
			const images = Array.from(scrollEl.querySelectorAll('img'));
			if (images.length === 0) {
				requestAnimationFrame(resetToMain);
				return;
			}

			let remaining = images.filter((img) => !img.complete).length;
			if (remaining === 0) {
				requestAnimationFrame(resetToMain);
				return;
			}

			const handleImageLoad = () => {
				remaining -= 1;
				if (remaining <= 0) {
					requestAnimationFrame(resetToMain);
				}
			};

			images.forEach((img) => {
				if (img.complete) {
					return;
				}
				img.addEventListener('load', handleImageLoad, { once: true });
				img.addEventListener('error', handleImageLoad, { once: true });
			});
		};

		requestAnimationFrame(resetToMain);
		resetAfterImagesLoad();
		scrollEl.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', resetToMain);

		return () => {
			scrollEl.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', resetToMain);
		};
	}, []);

	return (
		<main className='relative h-screen overflow-hidden bg-white text-[#1f1f1f]'>
			<div ref={scrollRef} className='hideScrollbar 3xl:px-[250px] h-full overflow-y-auto px-24'>
				<div ref={topListRef} aria-hidden='true' className='space-y-8'>
					{renderCards('top', 35)}
				</div>
				<div ref={mainRef}>
					<MainSection />
				</div>
				<div ref={listRef} className='space-y-8'>
					{renderCards('main', -35)}
				</div>
			</div>
		</main>
	);
}
