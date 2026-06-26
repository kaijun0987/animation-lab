import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);

const assetBase = 'https://cdn.prod.website-files.com/5cff83ac2044e22cb8cf2f11';

const assets = {
	icon: `${assetBase}/5d066805c9e4d68529d19eea_icon.png`,
	logo: `${assetBase}/5cffeb65d43eb732944316c4_logo.png`,
	hero: `${assetBase}/5cffeaf7b3cb0ed2d33f7943_hero.jpg`,
	cave: `${assetBase}/5d13364599bb70e3560cc4e5_background-min%203.png`,
	scroll: `${assetBase}/5d00043816a6c695bcf1581a_scroll.gif`,
	close: `${assetBase}/5d0b9fae51a0ce8eaad6bd20_close.png`,
	speaker: `${assetBase}/5d10efb50442bf42883dc80d_speaker-icon.png`,
	arrow: `${assetBase}/5d00256012408bddc81a0512_arrow.png`,
	drag: `${assetBase}/5d063f8b8518920d1efcffe0_drag.png`,
	key: `${assetBase}/5d25c68703e41086eb3b2da1_key-min.png`,
	coin: `${assetBase}/5d25cdda7dcddd7271ddc7da_coin.png`,
	coinOne: `${assetBase}/5d25ce8103e41038cf3b4be7_coin-1.png`,
	coinThree: `${assetBase}/5d25ce8103e4105bd13b4be8_coin-3.png`,
	skull: `${assetBase}/5d1ccf5390704ad21f992d8e_skull.png`,
	sloth: `${assetBase}/5d07ef8017bf61e4a0e439b1_sloth.png`,
	warner: `${assetBase}/5d0803429c4398257ab505c0_logo.png`,
	dave: `${assetBase}/5d08043c2f4d705660dc08e6_Dave%20Grusin.jpg`,
	lastPart: `${assetBase}/5d25e8040574eeecaa75cbdd_last-part.png`,
	mapBg: `${assetBase}/5d1d171453ced37760dc31d9_map-bg-min%202.jpg`,
	map: `${assetBase}/5d1d176d53ced33e91dc377c_map-min-1.png`,
};

const cast = [
	{
		name: 'Mikey',
		image: `${assetBase}/5d000a3b16a6c64e19f1841b_1.jpg`,
		intro:
			'Growing up, Mikey listened closely to his father’s tales of lost treasure and the legendary pirate One-Eyed Willy.',
		copy:
			'With the Goon Docks about to be lost, Mikey finds an old map in the attic and persuades his friends to follow it beneath Astoria for one final adventure.',
		video: `${assetBase}/5d02af2ae618811d9e5cac91_The Goonies—Brand gets tied to a chairhas the air let out of his tires-transcode.mp4`,
	},
	{
		name: 'Chunk',
		image: `${assetBase}/5d000a3b7c779fffb58ff3ed_2.jpg`,
		intro:
			'Chunk’s tall stories and practical jokes have made the people of Astoria reluctant to believe him, even when he finally sees something real.',
		copy:
			'He joins the search for the treasure while complaining about the dark and thinking about food, then proves his loyalty when the group needs him most.',
		video: `${assetBase}/5d05918fe1a86872f1a03911_4-transcode.mp4`,
	},
	{
		name: 'Data',
		image: `${assetBase}/5d4029b7763f97bdb3dec2f7_jno507n0iz131.jpg`,
		infoImage: `${assetBase}/5d02ab04e61881f2925c8c80_gadet.jpg`,
		intro:
			'Data is always testing another homemade invention, even when the suction cups, springs, and cables work differently than he planned.',
		copy:
			'His improvised gadgets become essential once the Goonies enter the tunnels, helping the group escape traps and keep moving toward the pirate ship.',
		video: `${assetBase}/5d058dcfe1a868bd88a033ed_3-transcode.mp4`,
	},
	{
		name: 'Mouth',
		image: `${assetBase}/5d002392773f43b68a233649_4.jpg`,
		intro:
			'Mouth arrives for one last day with his friends and immediately causes trouble with jokes, mistranslations, and whatever he finds in the attic.',
		copy:
			'Although he doubts the treasure story at first, his quick talking and nerve help the group survive the Fratellis and continue through the tunnels.',
		video: `${assetBase}/5d24635d2758ae4bbc2fe2ae_y2matecom - the_goonies_mouths_jewels_w1Bop2N-1P8_360p-transcode.mp4`,
	},
];

const infoCards = [
	{ title: '1985', label: 'Release date', value: 'June 7, 1985', variant: 'text', className: 'credits-year' },
	{ label: 'Story by', value: 'Steven Spielberg', variant: 'steven', className: 'credits-story' },
	{ label: 'Production', value: 'Amblin Entertainment', variant: 'sloth', className: 'credits-production' },
	{ label: 'Distributed by', value: 'Warner Bros', variant: 'warner', className: 'credits-warner' },
	{ title: '$19M', label: 'Budget', value: '$19 Million', variant: 'text', className: 'credits-budget' },
	{ label: 'Music by', value: 'Dave Grusin', variant: 'dave', className: 'credits-music' },
	{ title: '$61M', label: 'Box Office', value: '$61 Million', variant: 'text', className: 'credits-box-office' },
];

const galleryTiles = [
	{ className: 'g-3', image: `${assetBase}/5d0b90fa2ab90c75d6f44a8e_the-goonies.jpg` },
	{ className: 'g-4', image: `${assetBase}/5d0b90fa2b24d9ce77182467_goonies-tongue.jpg` },
	{ className: 'g-5', image: `${assetBase}/5d0b90fa0369a41028d539d0_the-goonies-cave.jpg` },
	{ className: 'g-1', image: `${assetBase}/5d0b9359641a587dc58ecb84_Goonies-Captain-Chunk.jpg` },
	{ className: 'g-9', image: `${assetBase}/5d23a6ca059b4b229b659eb7_rocks-min.jpg` },
	{ className: 'g-2', image: `${assetBase}/5d0b90fa641a584b528ebed3_20141201-125621.jpg` },
	{ className: 'g-6', image: `${assetBase}/5d0b90fa641a58fc3a8ebed4_goonies_lead.jpg` },
	{ className: 'g-7', image: `${assetBase}/5d0b93722b24d9f866182ebb_goonies4.jpg` },
	{ className: 'g-8', image: `${assetBase}/5d0b938f2ab90c1171f45523_image.jpg` },
	{ className: 'g-10', image: `${assetBase}/5d0b94f92ddabc77c98253ce_josh-brolin-recounts-seeing-the-pirate-ship-in-the-goonies-for-the-first-time-and-how-he-ruined-the-first-take-social.jpg` },
	{ className: 'g-11', image: `${assetBase}/5d0bcacdefd94731f3b15073_The-Goonies-Lost-Treasure-and-Maritime-Law-720x340.jpg` },
];

const LOAD_TIMEOUT_MS = 12000;
const navItems = [
	{ id: 'plot', label: 'Plot' },
	{ id: 'goonies', label: 'Goonies' },
	{ id: 'credits', label: 'Credits' },
	{ id: 'gallery', label: 'Gallery' },
] as const;

type NavSection = (typeof navItems)[number]['id'];

const preloadAssetUrls = Array.from(
	new Set([
		...Object.values(assets),
		...cast.map((member) => member.image),
		...galleryTiles.map((tile) => tile.image),
	])
);

function preloadImage(src: string) {
	return new Promise<void>((resolve) => {
		const image = new Image();
		image.onload = () => resolve();
		image.onerror = () => resolve();
		image.src = src;
	});
}

function stopBodyScroll(active: boolean) {
	document.body.style.overflow = active ? 'hidden' : '';
}

function Nav({
	onOpenMap,
	onToggleMusic,
	isPlaying,
	activeSection,
	isHidden,
}: {
	onOpenMap: () => void;
	onToggleMusic: () => void;
	isPlaying: boolean;
	activeSection: NavSection | '';
	isHidden: boolean;
}) {
	const navRef = useRef<HTMLElement>(null);
	const indicatorRef = useRef<HTMLSpanElement>(null);
	const activeSectionRef = useRef(activeSection);
	const moveIndicatorRef = useRef<(animate: boolean) => void>(() => undefined);

	useGSAP(
		(_, contextSafe) => {
			const nav = navRef.current;
			const indicator = indicatorRef.current;
			if (!nav || !indicator || !contextSafe) {
				return;
			}

			const moveIndicator = contextSafe((animate: boolean) => {
				const activeIndex = navItems.findIndex((item) => item.id === activeSectionRef.current);
				if (activeIndex < 0) {
					if (animate) {
						gsap.to(indicator, { autoAlpha: 0, duration: 0.3, overwrite: 'auto' });
					} else {
						gsap.set(indicator, { autoAlpha: 0 });
					}
					return;
				}

				const position = {
					left: `${12.5 + activeIndex * 25}%`,
					autoAlpha: 1,
				};

				if (animate) {
					gsap.to(indicator, {
						...position,
						duration: 0.7,
						ease: 'power3.out',
						overwrite: 'auto',
					});
				} else {
					gsap.set(indicator, position);
				}
			});

			moveIndicatorRef.current = moveIndicator;
			moveIndicator(false);

			return () => {
				gsap.killTweensOf(indicator);
			};
		},
		{ scope: navRef }
	);

	useEffect(() => {
		activeSectionRef.current = activeSection;
		moveIndicatorRef.current(true);
	}, [activeSection]);

	return (
		<>
			<nav
				ref={navRef}
				className={`nav-bar${isHidden ? ' is-hidden' : ''}`}
				aria-label='Main navigation'
			>
				<ul className='list-2'>
					{navItems.map((item) => (
						<li key={item.id}>
							<a
								className={`nav-link${activeSection === item.id ? ' is-active' : ''}`}
								href={`#${item.id}`}
								aria-current={activeSection === item.id ? 'location' : undefined}
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
				<span ref={indicatorRef} className='nav-indicator' aria-hidden='true' />
			</nav>
			<button className='map-parent' type='button' aria-label='Open treasure map' onClick={onOpenMap}>
				<span className='pulse-ring' />
				<span className='pulse-dot-menu' />
			</button>
			<button
				className={`music-parent${isPlaying ? ' is-active' : ''}`}
				type='button'
				aria-label='Toggle music'
				onClick={onToggleMusic}
			>
				<span className='pulse-ring' />
				<img className='icon icon-img-1' src={assets.speaker} alt='' />
				<img className='icon icon-img-2' src={assets.speaker} alt='' />
			</button>
		</>
	);
}

function Loader({ progress }: { progress: number }) {
	return (
		<div className='overlay-intro' aria-hidden='true'>
			<div className='bar-line'>
				<div className='bar-line-inner' style={{ transform: `translate3d(0, ${100 - progress}%, 0)` }} />
			</div>
			<div className='loader-percent'>{progress}%</div>
			<div className='load-txt'>
				<span>Loading</span>
				<span className='loader-dot' />
			</div>
		</div>
	);
}

function Hero() {
	return (
		<section id='home' className='scroll-container'>
			<div className='sticky-container'>
				<img className='scroll-img' src={assets.scroll} alt='' />
				<div className='overlay' />
				<div className='bg-scroll' />
				<div className='bg-main' />
				<div className='hero-parent'>
					<div className='sub-title'>The story of</div>
					<img className='logo-lg' src={assets.logo} alt='The Goonies' />
				</div>
				<div className='intro-parent' id='plot'>
					<h1 className='head'>Plot</h1>
					<p className='text-a-1'>
						Facing foreclosure of their homes in the Goon Docks area of Astoria, Oregon to an
						expanding country club, a group of children who call themselves &quot;the
						Goonies&quot; gather for a final weekend together.
					</p>
					<div className='draw-line'>
						<div className='draw-line-inner' />
					</div>
				</div>
			</div>
		</section>
	);
}

function CastSection({
	active,
	setActive,
}: {
	active: (typeof cast)[number] | null;
	setActive: (member: (typeof cast)[number] | null) => void;
}) {
	const sectionRef = useRef<HTMLElement>(null);

	// Clear props when active changes to null, resetting draggable offsets
	useEffect(() => {
		if (!active && sectionRef.current) {
			const cards = sectionRef.current.querySelectorAll('.info-parent-1');
			cards.forEach((c) => {
				gsap.set(c, { clearProps: 'left,top,transform' });
			});
		}
	}, [active]);

	const handleClose = (index: number) => {
		if (!sectionRef.current) {
			setActive(null);
			return;
		}
		const cards = sectionRef.current.querySelectorAll('.cast-panel');
		const card = cards[index];
		if (!card) {
			setActive(null);
			return;
		}

		const castImage = card.querySelector('.cast-image');
		const videoWrapper = card.querySelector('.cast-card-video-wrapper');
		const detailsWrapper = card.querySelector('.cast-card-details-wrapper');
		const infoCard = card.querySelector('.info-parent-1');

		const tl = gsap.timeline({
			onComplete: () => {
				gsap.set(card, { clearProps: 'width,transform,x,z-index' });
				if (infoCard) {
					gsap.set(infoCard, { clearProps: 'left,top,transform' });
				}
				setActive(null);
			},
		});

		// Animate details wrapper fade out
		tl.to(detailsWrapper, { opacity: 0, pointerEvents: 'none', duration: 0.6, ease: 'power2.in' }, 0)
			.set(detailsWrapper, { display: 'none' });

		// Animate video fade out and static image fade in
		tl.to(videoWrapper, { opacity: 0, duration: 0.8, ease: 'power2.in' }, 0)
			.to(castImage, { opacity: 1, duration: 0.8, ease: 'power2.in' }, 0);

		// Animate card size and position shrink back
		if (index === 0) {
			tl.to(card, { width: '25%', duration: 1.4, ease: 'power2.in' }, 0);
		} else {
			// Stage 1: x (translate) goes back to 0vw over 1.0s
			tl.to(card, { x: '0vw', duration: 1.0, ease: 'power2.in' }, 0);
			// Stage 2: width shrinks back to 25% starting at 0.7s over 1.2s
			tl.to(card, { width: '25%', duration: 1.2, ease: 'power2.in' }, 0.7);
		}
	};

	useGSAP(
		() => {
			if (!active || !sectionRef.current) {
				return;
			}

			const index = cast.findIndex((m) => m.name === active.name);
			if (index === -1) return;

			const cards = sectionRef.current.querySelectorAll('.cast-panel');
			const card = cards[index];
			if (!card) return;

			const castImage = card.querySelector('.cast-image');
			const videoWrapper = card.querySelector('.cast-card-video-wrapper');
			const detailsWrapper = card.querySelector('.cast-card-details-wrapper');
			const infoCard = card.querySelector('.info-parent-1');

			// Draggable instantiation
			let draggableInstance: Draggable | null = null;
			if (infoCard) {
				[draggableInstance] = Draggable.create(infoCard, {
					type: 'left,top',
					edgeResistance: 0.65,
					trigger: infoCard,
					allowEventDefault: true,
				});
			}

			// Opening animation
			const tl = gsap.timeline();

			gsap.set(card, { zIndex: 10 });
			// Ensure it starts from normal state in case of any quick toggle
			gsap.set(card, { width: '25%', x: '0vw' });
			gsap.set(castImage, { opacity: 1 });
			gsap.set(videoWrapper, { opacity: 0 });
			gsap.set(detailsWrapper, { display: 'block', opacity: 0, pointerEvents: 'none' });

			if (index === 0) {
				tl.to(card, { width: '100%', duration: 1.4, ease: 'power2.in' }, 0);
			} else {
				// Stage 1: width expands to 100% over 1.2s
				tl.to(card, { width: '100%', duration: 1.2, ease: 'power2.in' }, 0);
				// Stage 2: x (translate) moves to -index * 25vw starting at 0.9s over 1.0s
				tl.to(card, { x: `-${index * 25}vw`, duration: 1.0, ease: 'power2.in' }, 0.9);
			}

			tl.to(castImage, { opacity: 0, duration: 0.8, ease: 'power2.in' }, 0);
			tl.to(videoWrapper, { opacity: 1, duration: 0.8, ease: 'power2.in' }, 0);

			tl.to(
				detailsWrapper,
				{ opacity: 1, pointerEvents: 'auto', duration: 0.8, ease: 'power2.in' },
				0.9
			);

			return () => {
				if (draggableInstance) {
					draggableInstance.kill();
				}
			};
		},
		{ dependencies: [active], scope: sectionRef }
	);

	return (
		<section id='goonies' className='scroll-container-1' ref={sectionRef}>
			<div className='sticky-container-1'>
				<div className='full-inner'>
					{cast.map((member, index) => {
						const isExpanded = active?.name === member.name;
						return (
							<div
								className={`img-parent-${index + 1} cast-panel${isExpanded ? ' is-expanded' : ''}`}
								key={member.name}
								role='button'
								tabIndex={0}
								onClick={() => {
									if (!active) setActive(member);
								}}
								onKeyDown={(e) => {
									if (!active && (e.key === 'Enter' || e.key === ' ')) setActive(member);
								}}
								style={isExpanded ? {
									zIndex: 10,
								} : undefined}
							>
								<span className='cast-image' style={{ backgroundImage: `url("${member.image}")` }} />
								<span className={`overlay-img-${index + 1}`} />
								
								<div className='cast-card-video-wrapper'>
									<video
										className='cast-card-video'
										src={member.video}
										autoPlay
										loop
										muted
										playsInline
									/>
								</div>

								<span className='img-content-parent'>
									<span className='img-head'>{member.name}</span>
									<div className='btn-parent'>
										<span className='link'>More Info</span>
										<img src={assets.arrow} width='15' alt='' className='btn-arrow' />
									</div>
								</span>

								<div className='cast-card-details-wrapper' onClick={(e) => e.stopPropagation()}>
									<button
										className='close-video'
										type='button'
										onClick={(e) => {
											e.stopPropagation();
											handleClose(index);
										}}
									>
										Close Video
									</button>
									
									<div className='info-parent-1' id='draggable-info-card'>
										<img className='drag cast-drag-handle' src={assets.drag} alt='' />
										<button
											className='cast-card-close'
											type='button'
											aria-label='Close character info'
											onClick={(e) => {
												e.stopPropagation();
												handleClose(index);
											}}
										>
											<img src={assets.close} alt='' />
										</button>
										<div
											className='info-head-parent'
											style={{ backgroundImage: `url("${member.infoImage ?? member.image}")` }}
										/>
										<div className='info-content-parent'>
											<div className='info-content-parent-inner'>
												<h2 className='img-head-2'>{member.name}</h2>
												<p className='text-a-3'>{member.intro}</p>
												<p className='text-a-4'>{member.copy}</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function PlotSection() {
	return (
		<section className='text-block-parent'>
			<div className='copy-link'>
				<h1 className='head'>Goonies Never Say Die</h1>
			</div>
			<img className='coin' src={assets.coin} alt='' />
			<img className='key' src={assets.key} alt='' />
			<img className='coin-3' src={assets.coinOne} alt='' />
			<img className='coin-2' src={assets.coinThree} alt='' />
			<img className='coin-1' src={assets.coinOne} alt='' />
		</section>
	);
}

function CreditsSection() {
	const moveSloth = (event: React.MouseEvent<HTMLDivElement>) => {
		const sloth = event.currentTarget.querySelector('.sloth');
		if (!sloth) return;

		const bounds = event.currentTarget.getBoundingClientRect();
		const progress = (event.clientX - bounds.left) / bounds.width;
		gsap.to(sloth, { x: 80 - progress * 160, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
	};

	const resetSloth = (event: React.MouseEvent<HTMLDivElement>) => {
		const sloth = event.currentTarget.querySelector('.sloth');
		if (!sloth) return;
		gsap.to(sloth, { x: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
	};

	return (
		<section id='credits' className='scroll-container-2'>
			<div className='sticky-container-2'>
				<div className='grid-1'>
					{infoCards.map((card) => (
						<div
							className={`grid-parent ${card.className}`}
							key={`${card.label}-${card.value}`}
							onMouseMove={card.variant === 'sloth' ? moveSloth : undefined}
							onMouseLeave={card.variant === 'sloth' ? resetSloth : undefined}
						>
							{card.variant === 'steven' ? <div className='grid-bg-img _1' /> : null}
							{card.variant === 'sloth' ? (
								<div className='grid-postion-full'>
									<img className='sloth' src={assets.sloth} alt='' />
								</div>
							) : null}
							{card.variant === 'warner' ? (
								<div className='grid-postion'>
									<img src={assets.warner} width='80' alt='' />
								</div>
							) : null}
							{card.variant === 'dave' ? (
								<div className='grid-postion-top'>
									<img className='dave' src={assets.dave} alt='' />
								</div>
							) : null}
							{card.title ? (
								<div className='grid-postion credits-number-position'>
									<div className='text-hide-parent'>
										<h2 className='img-head-3'>{card.title}</h2>
										<h2 className='img-head-3 a-p'>{card.title}</h2>
									</div>
								</div>
							) : null}
							<h3 className='credits-label'>{card.label}</h3>
							<div className='info-txt credits-value'>{card.value}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function FinaleSection() {
	return (
		<section className='text-block-parent-1'>
			<img className='skull' src={assets.skull} alt='' />
			<img className='g-logo' src={assets.logo} alt='' />
			<img className='people' src={assets.lastPart} alt='' />
		</section>
	);
}

function GallerySection({
	open,
	setOpen,
	onShare,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	onShare: () => void;
}) {
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const closedTransforms: Record<string, gsap.TweenVars> = {
				'.g-3': { scale: 0.2 },
				'.g-4': { x: -236, scale: 0.4 },
				'.g-5': { y: 140 },
				'.g-1': { y: 130, scale: 0.7 },
				'.g-9': { x: -80, y: -50, scale: 0.8 },
				'.g-2': { x: 230, scale: 0.6 },
				'.g-6': { scale: 0.5 },
				'.g-7': { scale: 0.4 },
				'.g-8': { scale: 0.2 },
				'.g-10': { y: -80 },
				'.g-11': { scale: 0.6 },
			};

			Object.entries(closedTransforms).forEach(([selector, values]) => {
				gsap.set(selector, values);
			});

			gsap.set('.gallery-tile', { autoAlpha: 0 });
			gsap.set('.g-1', { autoAlpha: 0.01 });
			gsap.set('.gallery-parent', { autoAlpha: 0 });
			gsap.set('.share-btn', { yPercent: 100 });
			gsap.set('.close-gallery', { scale: 0, y: 0 });

			const revealOrder = ['.g-3', '.g-4', '.g-2', '.g-1', '.g-5', '.g-6', '.g-8', '.g-10', '.g-9', '.g-7', '.g-11'];
			const revealTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: '.gallery-container',
					start: 'top 85%',
					toggleActions: 'play none none none',
				},
			});

			revealTimeline.to('.gallery-parent', { autoAlpha: 1, duration: 2, ease: 'none' }, 0);
			revealOrder.forEach((selector, index) => {
				revealTimeline.to(selector, { autoAlpha: 1, duration: 2, ease: 'power1.out' }, index * 0.2);
			});
			revealTimeline.to('.share-btn', { yPercent: 0, duration: 0.5, ease: 'power1.out' }, 2);
		},
		{ scope: sectionRef }
	);

	const handleOpen = () => {
		if (open) {
			return;
		}

		setOpen(true);
		const section = sectionRef.current;
		if (!section) {
			return;
		}

		const select = gsap.utils.selector(section);
		const timeline = gsap.timeline();

		timeline
			.to(select('.gallery-tile'), { x: 0, y: 0, scale: 1, duration: 1, ease: 'circ.inOut' }, 0)
			.to(select('.gallery-parent'), { autoAlpha: 0, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.gird-line'), { height: 0, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.close-gallery'), { scale: 1, duration: 0.5, ease: 'power1.out' }, 0.6)
			.to(select('.close-gallery'), { y: '34vh', duration: 0.6, ease: 'power1.out' }, 1.4);
	};

	const handleClose = () => {
		const section = sectionRef.current;
		if (!section) {
			setOpen(false);
			return;
		}

		const select = gsap.utils.selector(section);
		const timeline = gsap.timeline({ onComplete: () => setOpen(false) });

		timeline
			.to(select('.g-3'), { scale: 0.2, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-4'), { x: -236, scale: 0.4, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-5'), { y: 140, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-1'), { y: 130, scale: 0.7, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-9'), { x: -80, y: -50, scale: 0.8, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-2'), { x: 230, scale: 0.6, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-6'), { scale: 0.5, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-7'), { scale: 0.4, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-8'), { scale: 0.2, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-10'), { y: -80, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.g-11'), { scale: 0.6, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.gird-line'), { height: '100%', duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.close-gallery'), { y: 0, duration: 0.5, ease: 'power1.out' }, 0)
			.to(select('.close-gallery'), { scale: 0, duration: 0.5, ease: 'power1.out' }, 0.6)
			.to(select('.gallery-parent'), { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, 0.8);
	};

	return (
		<section ref={sectionRef} id='gallery' className={`scroll-container-3${open ? ' is-open' : ''}`}>
			<div className='sticky-container-3'>
				<div className='gallery-container'>
					<div className='grid-parent-line-1'>
						<div className='gird'>
							<div className='gird-line m-l' />
						</div>
						<div className='gird'>
							<div className='gird-line' />
						</div>
						<div className='gird'>
							<div className='gird-line m-r' />
						</div>
						<div className='gird' />
					</div>
					<div className='text-parent'>
						<button className='gallery-parent' type='button' onClick={handleOpen}>
							<h2 className='img-head-4'>Gallery</h2>
							<span className='close-g'>View Gallery</span>
						</button>
						<button className='close-gallery' type='button' onClick={handleClose} aria-label='Close gallery'>
							<img className='close-gallery-icon close-gallery-icon-front' src={assets.close} width='20' alt='' />
							<img className='close-gallery-icon close-gallery-icon-back' src={assets.close} width='20' alt='' />
						</button>
					</div>
					<div className='grid-2'>
						{galleryTiles.map((tile) => (
							<div
								className={`gallery-tile ${tile.className}`}
								key={tile.image}
								style={{ backgroundImage: `url("${tile.image}")` }}
							/>
						))}
					</div>
					<a
						href='#share'
						className='share-btn'
						onClick={(event) => {
							event.preventDefault();
							onShare();
						}}
					>
						Share
					</a>
				</div>
			</div>
		</section>
	);
}

function MapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
	const [step, setStep] = useState(0);
	const [mistakes, setMistakes] = useState(0);
	const [isDead, setIsDead] = useState(false);

	useEffect(() => {
		if (open) {
			setStep(0);
			setMistakes(0);
			setIsDead(false);
		}
	}, [open]);

	useEffect(() => {
		stopBodyScroll(open);
		return () => stopBodyScroll(false);
	}, [open]);

	if (!open) {
		return null;
	}

	const handleMapClick = (e: React.MouseEvent) => {
		const target = e.target as HTMLElement;
		// Only trigger mistake if clicking the map background or image, not text boxes or buttons
		if (
			!target.classList.contains('map-container') &&
			!target.classList.contains('map-bg-img') &&
			!target.classList.contains('map-bg')
		) {
			return;
		}
		if (isDead || step >= 3) return;

		setMistakes((prev) => {
			const next = prev + 1;
			if (next >= 3) {
				setIsDead(true);
				setTimeout(() => {
					setStep(0);
					setMistakes(0);
					setIsDead(false);
				}, 3000);
			}
			return next;
		});
	};

	const handleDotClick = (dotIndex: number, e: React.MouseEvent) => {
		e.stopPropagation();
		if (isDead || step >= 3) return;

		if (dotIndex === step) {
			setStep((prev) => prev + 1);
		} else {
			setMistakes((prev) => {
				const next = prev + 1;
				if (next >= 3) {
					setIsDead(true);
					setTimeout(() => {
						setStep(0);
						setMistakes(0);
						setIsDead(false);
					}, 3000);
				}
				return next;
			});
		}
	};

	return (
		<div className='map-child' role='dialog' aria-modal='true' aria-label='Treasure map'>
			<div className='close-map' onClick={onClose} style={{ cursor: 'pointer' }}>
				<img src={assets.close} width='14' className='close close-img-1' alt='' />
				<img src={assets.close} width='14' className='close close-img-2' alt='' />
			</div>

			<div className='number-count' style={{ opacity: isDead ? 0 : 1, transition: 'opacity 0.3s ease' }}>
				<div className='m-num' style={{ color: step >= 1 ? '#6c0e11' : '#fff' }}>1</div>
				<div className='m-num' style={{ color: step >= 2 ? '#6c0e11' : '#fff' }}>2</div>
				<div className='m-num' style={{ color: step >= 3 ? '#6c0e11' : '#fff' }}>3</div>
			</div>

			<div className='message' style={{ opacity: isDead ? 0 : 1, transition: 'opacity 0.3s ease' }}>
				<div className='m-num' style={{ color: step === 3 ? '#6c0e11' : '#fff' }}>
					{step === 3 ? 'Map Unlocked!' : 'Explore the riddle'}
				</div>
			</div>

			<div className='map-container' onClick={handleMapClick}>
				<div className='map-bg' style={{ opacity: 1, position: 'relative', width: '100%', height: '100%' }}>
					{isDead && (
						<div className='map-content-parent-2' style={{ zIndex: 99999 }}>
							<h2 className='img-head-map'>DEAD</h2>
							<img src={assets.skull} width='18' alt='' style={{ opacity: 1 }} />
						</div>
					)}

					{!isDead && step === 0 && (
						<div className='map-content-parent' style={{ zIndex: 99999 }}>
							<div className='info-txt-map'>To move on, play the tune... as each note is said</div>
						</div>
					)}

					{!isDead && step === 1 && (
						<div className='map-content-parent-1' style={{ zIndex: 99999 }}>
							<div className='info-txt-map'>If you make too many mistakes. ye will surely be...</div>
						</div>
					)}

					{!isDead && step === 2 && (
						<div className='map-content-parent-2' style={{ zIndex: 99999 }}>
							<div className='info-txt-map'>One-Eyed Willy waits past the waterfall.</div>
						</div>
					)}

					{!isDead && step === 3 && (
						<div className='map-content-parent' style={{ zIndex: 99999, inset: '45% auto auto 42%' }}>
							<div className='info-txt-map' style={{ color: '#6c0e11', fontWeight: 'bold' }}>
								Follow the map to One-Eyed Willy's treasure!
							</div>
						</div>
					)}

					{!isDead && step === 0 && (
						<div className='pulse-dot-map' onClick={(e) => handleDotClick(0, e)} />
					)}
					{!isDead && step === 1 && (
						<div className='pulse-dot-map two' onClick={(e) => handleDotClick(1, e)} />
					)}
					{!isDead && step === 2 && (
						<div className='pulse-dot-map three' onClick={(e) => handleDotClick(2, e)} />
					)}

					<div
						className='map-bg-img'
						style={{
							filter: step === 3 ? 'sepia(0.3) saturate(1.5) contrast(1.1)' : 'none',
							transition: 'filter 1.5s ease',
						}}
					/>
				</div>
			</div>
		</div>
	);
}

function ShareSection({ onBackToTop }: { onBackToTop: () => void }) {
	return (
		<section id='share' className='share-parent'>
			<div className='info-txt-ap'>
				Created By <a href='https://joseph-berry.webflow.io'>Joseph Berry</a> -{' '}
				<a href='https://webflow.com/?rfsn=2822765.09619a'>Webflow</a>
			</div>
			<div className='copy-link'>
				<div className='info-txt share-kicker'>Share this experience</div>
				<h1 className='head-link'>the-goonies.webflow.io</h1>
				<div className='info-txt share-back-wrapper'>
					<a
						className='back-to-top'
						href='#home'
						onClick={(event) => {
							event.preventDefault();
							onBackToTop();
						}}
					>
						Back to top
					</a>
				</div>
			</div>
			<div className='draw-line-top'>
				<div className='draw-line-inner-top' />
			</div>
		</section>
	);
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
	return (t: number) => {
		let low = 0;
		let high = 1;
		for (let i = 0; i < 16; i++) {
			const mid = (low + high) / 2;
			const x = 3 * (1 - mid) * (1 - mid) * mid * x1 + 3 * (1 - mid) * mid * mid * x2 + mid * mid * mid;
			if (x < t) {
				low = mid;
			} else {
				high = mid;
			}
		}
		const mid = (low + high) / 2;
		return 3 * (1 - mid) * (1 - mid) * mid * y1 + 3 * (1 - mid) * mid * mid * y2 + mid * mid * mid;
	};
}

function easeInOutCubic(t: number) {
	return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

const SHARE_SCROLL_DURATION_MS = 2300;
const BACK_TO_TOP_DURATION_MS = 2800;

export default function App() {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const lenisRef = useRef<Lenis | null>(null);
	const shareScrollRafRef = useRef<number | null>(null);
	const shareScrollResumeLenisRef = useRef(false);
	const shareScrollBehaviorRef = useRef<string | null>(null);
	const loaderProgressRef = useRef({ value: 0 });
	const [mapOpen, setMapOpen] = useState(false);
	const [galleryOpen, setGalleryOpen] = useState(false);
	const [musicOpen, setMusicOpen] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [userPaused, setUserPaused] = useState(false);
	const [activeSection, setActiveSection] = useState<NavSection | ''>('');
	const widgetRef = useRef<any>(null);
	const [active, setActive] = useState<(typeof cast)[number] | null>(null);
	const [targetProgress, setTargetProgress] = useState(0);
	const [displayProgress, setDisplayProgress] = useState(0);
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);

	useEffect(() => {
		let activationPoints: Array<{ id: NavSection; start: number }> = [];

		const pageTop = (element: Element) => element.getBoundingClientRect().top + window.scrollY;

		const updateActivationPoints = () => {
			const home = document.getElementById('home');
			const goonies = document.getElementById('goonies');
			const creditsLead = document.querySelector('.text-block-parent');
			const galleryLead = document.querySelector('.text-block-parent-1');
			if (!home || !goonies || !creditsLead || !galleryLead) {
				activationPoints = [];
				return;
			}

			activationPoints = [
				{ id: 'plot', start: pageTop(home) + home.getBoundingClientRect().height / 2 },
				{ id: 'goonies', start: pageTop(goonies) },
				{ id: 'credits', start: pageTop(creditsLead) },
				{ id: 'gallery', start: pageTop(galleryLead) - window.innerHeight * 0.2 },
			];
		};

		const handleScroll = () => {
			let nextSection: NavSection | '' = '';
			for (const point of activationPoints) {
				if (window.scrollY < point.start) {
					break;
				}
				nextSection = point.id;
			}
			setActiveSection((current) => (current === nextSection ? current : nextSection));
		};

		const handleResize = () => {
			updateActivationPoints();
			handleScroll();
		};

		updateActivationPoints();
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const musicOpenRef = useRef(musicOpen);
	useEffect(() => {
		musicOpenRef.current = musicOpen;
	}, [musicOpen]);

	useEffect(() => {
		let initialized = false;
		const initWidget = () => {
			if (initialized || widgetRef.current) return;
			const iframe = document.getElementById('soundcloud-iframe');
			if (iframe && (window as any).SC) {
				const widget = (window as any).SC.Widget(iframe);
				widgetRef.current = widget;
				initialized = true;

				widget.bind((window as any).SC.Widget.Events.READY, () => {
					widget.bind((window as any).SC.Widget.Events.PLAY, () => {
						setIsPlaying(true);
						setUserPaused(false);
					});
					widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
						setIsPlaying(false);
						if (musicOpenRef.current) {
							setUserPaused(true);
						}
					});
				});
			}
		};

		initWidget();
		const timer = setTimeout(initWidget, 1500);
		return () => {
			clearTimeout(timer);
			if (widgetRef.current) {
				try {
					widgetRef.current.unbind((window as any).SC.Widget.Events.PLAY);
					widgetRef.current.unbind((window as any).SC.Widget.Events.PAUSE);
				} catch (e) {}
			}
		};
	}, []);

	useEffect(() => {
		if (!widgetRef.current) return;
		try {
			if (musicOpen) {
				if (!userPaused) {
					widgetRef.current.play();
				}
			} else {
				widgetRef.current.pause();
			}
		} catch (err) {
			console.warn('SoundCloud Widget Error: ', err);
		}
	}, [musicOpen, userPaused]);

	useEffect(() => {
		let cancelled = false;
		let settledCount = 0;
		const totalCount = preloadAssetUrls.length;

		if (totalCount === 0) {
			setTargetProgress(100);
			return;
		}

		const updateProgress = () => {
			settledCount += 1;
			const nextProgress = Math.round((settledCount / totalCount) * 100);
			setTargetProgress((current) => Math.max(current, nextProgress));
		};

		const timeout = window.setTimeout(() => {
			if (!cancelled) {
				setTargetProgress(100);
			}
		}, LOAD_TIMEOUT_MS);

		preloadAssetUrls.forEach((src) => {
			preloadImage(src).then(() => {
				if (!cancelled) {
					updateProgress();
				}
			});
		});

		return () => {
			cancelled = true;
			window.clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		const tween = gsap.to(loaderProgressRef.current, {
			value: targetProgress,
			duration: targetProgress === 100 ? 0.85 : 0.4,
			ease: 'power2.out',
			onUpdate: () => {
				setDisplayProgress(Math.min(100, Math.round(loaderProgressRef.current.value)));
			},
			onComplete: () => {
				if (targetProgress === 100) {
					setDisplayProgress(100);
				}
			},
		});

		return () => {
			tween.kill();
		};
	}, [targetProgress]);

	useEffect(() => {
		if (displayProgress < 100 || isLoadingComplete) {
			return;
		}

		const timeout = window.setTimeout(() => setIsLoadingComplete(true), 650);
		return () => window.clearTimeout(timeout);
	}, [displayProgress, isLoadingComplete]);

	useEffect(() => {
		const lenis = new Lenis({
			autoRaf: false,
		});
		lenisRef.current = lenis;

		lenis.on('scroll', ScrollTrigger.update);

		const updateRaf = (time: number) => {
			lenis.raf(time * 1000);
		};

		gsap.ticker.add(updateRaf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			if (shareScrollRafRef.current !== null) {
				window.cancelAnimationFrame(shareScrollRafRef.current);
				shareScrollRafRef.current = null;
			}
			if (shareScrollBehaviorRef.current !== null) {
				document.documentElement.style.scrollBehavior = shareScrollBehaviorRef.current;
				shareScrollBehaviorRef.current = null;
			}
			lenis.destroy();
			gsap.ticker.remove(updateRaf);
			lenisRef.current = null;
		};
	}, []);

	useEffect(() => {
		if (!lenisRef.current) return;
		if (mapOpen || !isLoadingComplete) {
			lenisRef.current.stop();
		} else {
			lenisRef.current.start();
		}
	}, [mapOpen, isLoadingComplete]);

	useGSAP(
		() => {
			if (!isLoadingComplete) {
				gsap.set('.overlay-intro', { autoAlpha: 1, display: 'flex', pointerEvents: 'auto' });
				return;
			}

			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (reduceMotion) {
				gsap.set('.overlay-intro', { display: 'none' });
				return;
			}

			gsap
				.timeline({ defaults: { ease: 'power3.out' } })
				.set('.bar-line-inner', { yPercent: 0 })
				.to('.bar-line-inner', { yPercent: -100, duration: 0.95, delay: 0.2 })
				.to('.overlay-intro', { autoAlpha: 0, duration: 0.45, pointerEvents: 'none' }, '-=0.05')
				.fromTo(
					'.nav-link',
					{ y: -18, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.55 },
					'-=0.1'
				)
				.fromTo(
					'.hero-parent .sub-title, .hero-parent .logo-lg',
					{ y: 50, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, stagger: 0.14, duration: 0.75 },
					'-=0.38'
				);

			gsap.to('.map-parent', {
				autoAlpha: 1,
				pointerEvents: 'auto',
				duration: 0.4,
				scrollTrigger: {
					trigger: '.scroll-container',
					start: 'bottom 90%',
					toggleActions: 'play none none reverse',
				},
			});

			const heroScrollTimeline = gsap.timeline({
				defaults: { ease: 'none' },
				scrollTrigger: {
					trigger: '.scroll-container',
					start: 'top top',
					end: 'bottom bottom',
					scrub: true,
				},
			});

			heroScrollTimeline
				.to('.scroll-img', { autoAlpha: 0, duration: 0.16 }, 0)
				.to('.bg-main', { scale: 1.3, duration: 0.55 }, 0)
				.to('.bg-scroll', { scale: 1.7, duration: 0.55 }, 0)
				.to('.bg-scroll', { y: -155, duration: 0.56 }, 0)
				.to('.bg-scroll', { y: -400, duration: 0.44 }, 0.56)
				.to('.hero-parent', { autoAlpha: 0, duration: 0.35 }, 0)
				.fromTo('.intro-parent', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.30 }, 0.40)
				.fromTo('.intro-parent .head', { y: 50 }, { y: 0, duration: 0.35 }, 0.40)
				.fromTo('.intro-parent .text-a-1', { y: 80 }, { y: 0, duration: 0.35 }, 0.40)
				.fromTo('.draw-line-inner', { yPercent: 0 }, { yPercent: 100, duration: 0.35 }, 0.65)
				.to('.overlay', { opacity: 1, duration: 0.25 }, 0.75);

			gsap.fromTo(
				'.draw-line-inner',
				{ scaleY: 1, transformOrigin: '50% 100%' },
				{
					scaleY: 0,
					immediateRender: false,
					ease: 'none',
					scrollTrigger: {
						trigger: '.scroll-container-1',
						start: 'top 60%',
						end: 'top 30%',
						scrub: true,
					},
				}
			);

			gsap.to('.intro-parent .head, .intro-parent .text-a-1', {
				autoAlpha: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: '.scroll-container',
					start: 'bottom bottom',
					end: '+=15%',
					scrub: true,
				},
			});

			gsap.set('.cast-panel', { autoAlpha: 1 });

			gsap.fromTo(
				['.img-parent-1', '.img-parent-2', '.img-parent-3', '.img-parent-4'],
				{ yPercent: 100 },
				{
					yPercent: 0,
					duration: 0.95,
					stagger: 0.12,
					ease: cubicBezier(0.35, 0.05, 0.2, 1.0),
					scrollTrigger: {
						trigger: '.scroll-container-1',
						start: 'top 75%',
						toggleActions: 'play none none none',
					},
				}
			);

			const createNeverDieTimeline = (end: string) => {
				const timeline = gsap.timeline({
					defaults: { ease: 'none' },
					scrollTrigger: {
						trigger: '.text-block-parent',
						start: 'top bottom',
						end,
						scrub: 0.8,
						invalidateOnRefresh: true,
					},
				});

				timeline.to({}, { duration: 1 }, 0);
				return timeline;
			};

			const isNeverDieMobile = window.matchMedia('(max-width: 767px)').matches;

			createNeverDieTimeline(isNeverDieMobile ? 'bottom 63%' : 'bottom 75%')
				.fromTo('.coin-1', { y: 310 }, { y: -330, duration: 1 }, 0)
				.fromTo(
					'.coin',
					{ y: 50, rotation: 0 },
					{ y: -440, rotation: 360, duration: 1 },
					0
				);

			createNeverDieTimeline(isNeverDieMobile ? 'bottom 59%' : 'bottom 72%')
				.fromTo(
					'.coin-2',
					{ y: -440, rotation: 0, opacity: 1 },
					{ y: 130, rotation: 360, opacity: 0.2, duration: 0.94 },
					0
				)
				.fromTo('.key', { rotation: 40 }, { rotation: 0, duration: 0.94 }, 0);

			createNeverDieTimeline(isNeverDieMobile ? 'bottom 54%' : 'bottom 60%')
				.fromTo(
					'.coin-3',
					{ y: -70, rotation: 0 },
					{ y: 350, rotation: -180, duration: 0.8 },
					0.2
				)
				.fromTo(
					'.text-block-parent .head',
					{ y: 100, opacity: 0 },
					{ y: 0, opacity: 1, duration: 0.8 },
					0.2
				);

			createNeverDieTimeline('top top')
				.fromTo(
					'.scroll-container-1',
					{ opacity: 1 },
					{ opacity: 0, duration: 0.3 },
					0.2
				);

			gsap.set('.grid-1 .credits-label, .grid-1 .credits-value', { y: 150 });
			gsap.set('.grid-1 .credits-number-position .text-hide-parent', { y: 50 });
			gsap.set('.credits-story .grid-bg-img', { xPercent: -100 });
			gsap.set('.credits-production .sloth', { yPercent: 101 });
			gsap.set('.credits-warner img', { autoAlpha: 0 });
			gsap.set('.credits-music .dave', { y: -window.innerHeight });

			const creditsTimeline = gsap.timeline({
				defaults: { ease: 'power1.out' },
				onComplete: () => {
					rootRef.current?.querySelector('.credits-story')?.classList.add('credits-ready');
				},
				scrollTrigger: {
					trigger: '.grid-1',
					start: 'top 98%',
					toggleActions: 'play none none none',
				},
			});

			creditsTimeline
				.to('.credits-story .credits-label, .credits-story .credits-value', { y: 0, duration: 0.5 }, 0)
				.to('.credits-story .grid-bg-img', { xPercent: 0, duration: 1.2, clearProps: 'transform' }, 0.2)
				.to(
					'.credits-year .credits-number-position .text-hide-parent, .credits-year .credits-label, .credits-year .credits-value',
					{ y: 0, duration: 0.5 },
					0.2
				)
				.to('.credits-production .credits-label, .credits-production .credits-value', { y: 0, duration: 0.5 }, 0.4)
				.to('.credits-production .sloth', { yPercent: 0, duration: 1, clearProps: 'transform' }, 0.4)
				.to('.credits-warner .credits-label, .credits-warner .credits-value', { y: 0, duration: 0.5 }, 0.6)
				.to('.credits-warner img', { autoAlpha: 1, duration: 2 }, 0.6)
				.to('.credits-music .credits-label, .credits-music .credits-value', { y: 0, duration: 0.5 }, 0.8)
				.to('.credits-music .dave', { y: 0, duration: 0.5 }, 0.8)
				.to(
					'.credits-budget .credits-number-position .text-hide-parent, .credits-budget .credits-label, .credits-budget .credits-value',
					{ y: 0, duration: 0.5 },
					1
				)
				.to(
					'.credits-box-office .credits-number-position .text-hide-parent, .credits-box-office .credits-label, .credits-box-office .credits-value',
					{ y: 0, duration: 0.5 },
					1.2
				);

			gsap.set('.text-block-parent-1 .skull', { scale: 0 });
			gsap.set('.text-block-parent-1 .people', { y: 490, opacity: 0 });

			const isFinaleMobile = window.matchMedia('(max-width: 767px)').matches;
			const finaleTimeline = gsap.timeline({
				defaults: { ease: cubicBezier(0.25, 0.1, 0.25, 1) },
				scrollTrigger: {
					trigger: '.text-block-parent-1',
					start: 'top bottom',
					end: 'bottom top',
					scrub: isFinaleMobile ? 0.6 : 0.8,
					invalidateOnRefresh: true,
				},
			});

			finaleTimeline
				.to('.text-block-parent-1 .skull', { scale: 1, duration: 0.55 }, 0)
				.to('.text-block-parent-1 .people', { y: 0, opacity: 1, duration: 0.9 }, 0)
				.to({}, { duration: 1 }, 0);

			gsap.set('.share-kicker', { autoAlpha: 0 });
			gsap.set('.head-link', { y: 130, autoAlpha: 0 });
			gsap.set('.back-to-top', { y: 70, autoAlpha: 0.03 });
			gsap.set('.draw-line-inner-top', { yPercent: 0 });

			gsap.to('.draw-line-inner-top', {
				yPercent: 100,
				ease: 'none',
				scrollTrigger: {
					trigger: '.share-parent',
					start: 'top 72%',
					end: 'top 32%',
					scrub: 0.5,
					invalidateOnRefresh: true,
				},
			});

			const shareTimeline = gsap.timeline({
				scrollTrigger: {
					trigger: document.documentElement,
					start: () => ScrollTrigger.maxScroll(window) * 0.94,
					end: () => ScrollTrigger.maxScroll(window),
					scrub: 0.9,
					invalidateOnRefresh: true,
				},
			});

			shareTimeline
				.to('.scroll-container-3', { opacity: 0, duration: 1, ease: 'none' }, 0)
				.to('.share-kicker', { autoAlpha: 1, duration: 1, ease: 'none' }, 0)
				.to('.head-link', { y: 0, autoAlpha: 1, duration: 1, ease: 'none' }, 0)
				.to('.back-to-top', { y: 0, autoAlpha: 1, duration: 1, ease: 'none' }, 0);
		},
		{ scope: rootRef, dependencies: [isLoadingComplete] }
	);

	const scrollToTarget = (requestedTargetY: number, hash: string, requestedDuration: number) => {
		const lenis = lenisRef.current;

		if (shareScrollRafRef.current !== null) {
			window.cancelAnimationFrame(shareScrollRafRef.current);
			shareScrollRafRef.current = null;
		}
		if (shareScrollBehaviorRef.current !== null) {
			document.documentElement.style.scrollBehavior = shareScrollBehaviorRef.current;
			shareScrollBehaviorRef.current = null;
		}
		if (shareScrollResumeLenisRef.current) {
			lenis?.start();
			shareScrollResumeLenisRef.current = false;
		}

		const startY = window.scrollY;
		const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		const targetY = Math.min(maxScroll, Math.max(0, requestedTargetY));
		const distance = targetY - startY;
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const duration = reduceMotion ? 0 : requestedDuration;

		shareScrollBehaviorRef.current = document.documentElement.style.scrollBehavior;
		document.documentElement.style.scrollBehavior = 'auto';

		if (lenis && !lenis.isStopped) {
			shareScrollResumeLenisRef.current = true;
		}
		lenis?.stop();

		if (window.location.hash !== hash) {
			window.history.pushState({ hash }, '', hash);
		}

		const completeScroll = () => {
			window.scrollTo(0, targetY);
			lenis?.scrollTo(targetY, { immediate: true, force: true });
			if (shareScrollBehaviorRef.current !== null) {
				document.documentElement.style.scrollBehavior = shareScrollBehaviorRef.current;
				shareScrollBehaviorRef.current = null;
			}
			if (shareScrollResumeLenisRef.current) {
				lenis?.start();
			}
			shareScrollResumeLenisRef.current = false;
			shareScrollRafRef.current = null;
		};

		if (Math.abs(distance) < 1 || duration === 0) {
			completeScroll();
			return;
		}

		const startedAt = performance.now();
		const updateScroll = (now: number) => {
			const elapsed = now - startedAt;
			const progress = Math.min(elapsed / duration, 1);
			window.scrollTo(0, startY + distance * easeInOutCubic(progress));

			if (progress < 1) {
				shareScrollRafRef.current = window.requestAnimationFrame(updateScroll);
				return;
			}

			completeScroll();
		};

		shareScrollRafRef.current = window.requestAnimationFrame(updateScroll);
	};

	const scrollToShare = () => {
		const target = document.querySelector<HTMLElement>('#share');
		if (!target) {
			return;
		}

		const targetY = window.scrollY + target.getBoundingClientRect().top;
		scrollToTarget(targetY, '#share', SHARE_SCROLL_DURATION_MS);
	};

	const scrollToHome = () => {
		scrollToTarget(0, '#home', BACK_TO_TOP_DURATION_MS);
	};

	return (
		<div ref={rootRef} className='goonies-page'>
			<Loader progress={displayProgress} />
			<Nav
				onOpenMap={() => setMapOpen(true)}
				onToggleMusic={() => setMusicOpen((prev) => !prev)}
				isPlaying={isPlaying}
				activeSection={activeSection}
				isHidden={active !== null || mapOpen}
			/>
			<Hero />
			<CastSection active={active} setActive={setActive} />
			<PlotSection />
			<CreditsSection />
			<FinaleSection />
			<GallerySection
				open={galleryOpen}
				setOpen={setGalleryOpen}
				onShare={scrollToShare}
			/>
			<ShareSection onBackToTop={scrollToHome} />
			<MapModal open={mapOpen} onClose={() => setMapOpen(false)} />

			<div className={`music-player${musicOpen ? ' is-open' : ''}`}>
				<div className='html-embed-3 w-embed w-iframe'>
					<iframe
						id='soundcloud-iframe'
						width='100%'
						height='166'
						scrolling='no'
						frameBorder='no'
						allow='autoplay'
						src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/635191599%3Fsecret_token%3Ds-2hgJc&color=%23050406&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true'
					/>
				</div>
			</div>
		</div>
	);
}
