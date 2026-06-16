import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import './global.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
	['Travel', 'Home', 'Office', 'Kitchen', 'Fashion'],
	['Furniture', 'Books', 'Lighting', 'Tech'],
	['Decor', 'Bath & Bed', 'More'],
];

const productGroups = [
	{
		title: 'Furniture',
		images: [
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f375fb3b2487762e34b_furniture4.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f29da4f9f67e8a96c62_furniture3.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f1b3ba972c74f0c68a1_furniture2.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f0fd78e9995d9b714ee_furniture1.jpeg',
		],
	},
	{
		title: 'Decor',
		images: [
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f9f007ec2ccc6825634_lighting6.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f91d645e7308f9b5dae_lighting5.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f84388c67087f759d3f_lighting4.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f786d7824cf60e46d52_lighting3.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f69f10376fa9f1b520c_lighting2.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99f5c1c86978218435d5f_lighting1.jpeg',
		],
	},
	{
		title: 'Office',
		images: [
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99fd24de55716766ac7d2_office4.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99fc651de80cb9502383f_office3.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99fbc5fb3b265f362e35d_office2.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99faf237415ee73ed1ece_office1.jpeg',
		],
	},
	{
		title: 'Tech',
		images: [
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a9a0473ba97226060c68d7_tech6.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a9a03c007ec2d9c68258da_tech5.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a9a0346d78241fdce46d73_tech4.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a9a023624de5a4e75d4694_tech3.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a9a001e07361cb66e2082c_tech2.jpeg',
			'https://cdn.prod.website-files.com/61a99f057627efc50e6b701e/61a99ff451de807fa30238a8_tech1.jpeg',
		],
	},
];

function Logo() {
	return (
		<a href='#top' className='nav-logo' aria-label='MinimalGoods home'>
			MinimalGoods
		</a>
	);
}

function Nav() {
	return (
		<section className='section is-nav'>
			<div className='is-nav container'>
				<div className='nav-top'>
					<div className='nav-side'>
						<a href='#articles' className='nav-link'>
							Articles
						</a>
						<a href='#shop' className='nav-link'>
							Shop
						</a>
						<a href='#submit' className='nav-link'>
							Submit
						</a>
					</div>
					<div className='nav-logo-contain'>
						<Logo />
					</div>
					<div className='nav-side is-right'>
						<p className='nav-link-text'>(2021), All rights reserved</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function HeaderIntro() {
	const lines = ['Discover', 'the best in', 'minimal', 'design'];

	return (
		<section className='section is-header'>
			<div className='is-header container'>
				<div className='header-text'>
					{lines.map((line, index) => (
						<div className='header-text-wrap' key={line}>
							<div className={`header-text-move${index === lines.length - 1 ? ' is-last' : ''}`}>
								<h1 className={line === 'the best in' ? 'is-alt-text' : undefined}>{line}</h1>
							</div>
						</div>
					))}
				</div>
				<div className='sticky-circle-wrap'>
					<div className='sticky-circle'>
						<div className='sticky-circle-element'>
							<img
								src='https://cdn.prod.website-files.com/61a993eb9a24396d472b7770/61a9acabe07361ebdee22b3a_image3.jpg'
								alt=''
								className='sticky-circle-img'
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function CategoryStrip() {
	return (
		<section className='section is-categories'>
			<div className='is-categories container'>
				<div className='categories'>
					{categories.map((row) => (
						<div className='categories-row' key={row.join('-')}>
							{row.map((category) => (
								<a
									href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
									className='categories-link'
									key={category}
								>
									<span className='categories-border' />
									<span className='categories-link-text'>{category}</span>
								</a>
							))}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function ProductGrid() {
	return (
		<section className='section is-grid'>
			<div className='is-grid container'>
				<div className='grid-text-wrap'>
					<div className='grid-text-list'>
						{productGroups.map((group, index) => (
							<div className={`grid-text-item${index === 0 ? ' is-active' : ''}`} key={group.title}>
								<p className='grid-text-title'>{group.title}</p>
							</div>
						))}
					</div>
				</div>
				<div className='grid-wrapper-contain'>
					{productGroups.map((group, groupIndex) => (
						<div
							className={`grid-wrapper${groupIndex === productGroups.length - 1 ? ' is-alt' : ''}`}
							key={group.title}
							data-grid-title={group.title}
						>
							<div className='grid-list'>
								{group.images.map((image) => (
									<div className='grid-item' key={image}>
										<div className='grid-element'>
											<img src={image} alt='' className='grid-img' />
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default function App() {
	const rootRef = useRef<HTMLElement | null>(null);

	useGSAP(
		() => {
			const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			if (reduceMotion) {
				return;
			}

			if ('scrollRestoration' in window.history) {
				window.history.scrollRestoration = 'manual';
			}
			window.scrollTo(0, 0);
			window.setTimeout(() => {
				window.scrollTo(0, 0);
				ScrollTrigger.refresh();
				ScrollTrigger.update();
			}, 0);

			const colorTargets = [
				document.body,
				rootRef.current,
				...Array.from(document.querySelectorAll<HTMLElement>('.section.is-nav')),
			].filter((target): target is HTMLElement => target !== null);

			gsap.set(colorTargets, {
				backgroundColor: '#2e2a27',
				color: '#e8e2da',
			});
			document
				.querySelectorAll('.grid-text-item')
				.forEach((item) => item.classList.remove('is-active'));
			document.querySelector('.grid-text-item')?.classList.add('is-active');

			const darkColor = '#2e2a27';
			const lightColor = '#e8e2da';
			const setTheme = (backgroundColor: string, color: string) => {
				gsap.set(colorTargets, { backgroundColor, color });
			};
			const scrubTheme = (
				progress: number,
				fromBackground: string,
				toBackground: string,
				fromColor: string,
				toColor: string
			) => {
				setTheme(
					gsap.utils.interpolate(fromBackground, toBackground, progress),
					gsap.utils.interpolate(fromColor, toColor, progress)
				);
			};
			const setLogoProgress = (progress: number) => {
				const clampedProgress = gsap.utils.clamp(0, 1, progress);
				gsap.set('.nav-logo', {
					y: gsap.utils.interpolate(-window.innerHeight * 0.236, 0, clampedProgress),
					scale: gsap.utils.interpolate(8.2, 1, clampedProgress),
				});
			};

			setLogoProgress(0);
			ScrollTrigger.create({
				trigger: '.section.is-hero',
				start: 'top top',
				end: 'bottom 15%',
				scrub: 1,
				onUpdate: (self) => {
					setLogoProgress(self.progress);
				},
				onLeave: () => {
					setLogoProgress(1);
				},
				onLeaveBack: () => {
					setLogoProgress(0);
				},
			});

			gsap.utils.toArray<HTMLElement>('.header-text-move').forEach((element) => {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: element,
							start: '-100% top',
							end: '30% top',
							scrub: 0.8,
						},
					})
					.to(element, {
						y: '100%',
						duration: 1,
					});
			});

			gsap
				.timeline({
					scrollTrigger: {
						trigger: '.sticky-circle-wrap',
						start: 'top top',
						end: 'bottom bottom',
						scrub: 1,
					},
				})
				.fromTo(
					'.sticky-circle-element',
					{
						width: '35em',
						height: '35em',
						borderRadius: '35em',
					},
					{
						width: '100vw',
						height: '100vh',
						borderRadius: '0em',
						duration: 1,
					}
				);

			gsap.utils.toArray<HTMLElement>('.grid-wrapper').forEach((wrapper, index) => {
				const activeTitle = document.querySelectorAll('.grid-text-item')[index];

				ScrollTrigger.create({
					trigger: wrapper,
					start: 'top bottom',
					end: 'bottom bottom',
					onEnter: () => {
						document
							.querySelectorAll('.grid-text-item')
							.forEach((item) => item.classList.remove('is-active'));
						activeTitle?.classList.add('is-active');
					},
					onEnterBack: () => {
						document
							.querySelectorAll('.grid-text-item')
							.forEach((item) => item.classList.remove('is-active'));
						activeTitle?.classList.add('is-active');
					},
				});

				const startsLight = index % 2 === 0;
				ScrollTrigger.create({
					trigger: wrapper,
					start: 'top top',
					end: 'bottom bottom',
					scrub: 1,
					onUpdate: (self) => {
						scrubTheme(
							self.progress,
							startsLight ? lightColor : darkColor,
							startsLight ? darkColor : lightColor,
							startsLight ? darkColor : lightColor,
							startsLight ? lightColor : darkColor
						);
					},
					onLeaveBack: () => {
						setTheme(startsLight ? lightColor : darkColor, startsLight ? darkColor : lightColor);
					},
					onLeave: () => {
						setTheme(startsLight ? darkColor : lightColor, startsLight ? lightColor : darkColor);
					},
				});
			});

			ScrollTrigger.create({
				trigger: '.sticky-circle-wrap',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 1,
				onUpdate: (self) => {
					scrubTheme(self.progress, darkColor, lightColor, lightColor, darkColor);
				},
				onLeaveBack: () => {
					setTheme(darkColor, lightColor);
				},
				onLeave: () => {
					setTheme(lightColor, darkColor);
				},
			});

			gsap.utils.toArray<HTMLElement>('.grid-item:nth-child(3n+1)').forEach((item) => {
				gsap.to(item, {
					y: '-30%',
					duration: 1,
					scrollTrigger: {
						trigger: item,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1,
					},
				});
			});

			gsap.utils.toArray<HTMLElement>('.grid-item:nth-child(3n+2)').forEach((item) => {
				gsap.to(item, {
					y: '-50%',
					duration: 1,
					scrollTrigger: {
						trigger: item,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 2,
					},
				});
			});

			gsap.utils.toArray<HTMLElement>('.grid-item:nth-child(3n+3)').forEach((item) => {
				gsap.to(item, {
					y: '-70%',
					duration: 1,
					scrollTrigger: {
						trigger: item,
						start: 'top bottom',
						end: 'bottom top',
						scrub: 1.5,
					},
				});
			});

			ScrollTrigger.refresh();
		},
		{ scope: rootRef }
	);

	return (
		<main id='top' className='minimal-goods' ref={rootRef}>
			<section className='section is-hero' aria-label='MinimalGoods hero'>
				<img
					src='https://cdn.prod.website-files.com/61a993eb9a24396d472b7770/61a99a988b4f23100cbdaaf2_image1.jpg'
					alt=''
					className='hero-img'
				/>
			</section>
			<div className='wrapper'>
				<Nav />
				<HeaderIntro />
				<CategoryStrip />
				<ProductGrid />
			</div>
		</main>
	);
}
