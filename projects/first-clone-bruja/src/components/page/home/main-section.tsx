import { useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../../../../utils/cn';
import { BlurReveal } from '../../blur-reveal';
import { MagnetButton } from '../../magnet-button';
import { NavLinks } from '../../nav-link';
import { TightText } from '../../tight-text';

const h1FirstPart = ['B', 'j', 'ö', 'r', 'n'];
const h1secondPart = ['S', 'o', 'l', 'h', 'e', 'i', 'm'];
const LETTER_STAGGER = 0.05;
const WORD_OVERLAP = 0.05;
const SECOND_WORD_DELAY = Math.max(0, h1FirstPart.length * LETTER_STAGGER - WORD_OVERLAP);

const LETTER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LETTER_DURATION = 0.9;
const H1_LAST_LETTER_APPEAR = SECOND_WORD_DELAY + (h1secondPart.length - 1) * LETTER_STAGGER;
const P_REVEAL_DELAY = H1_LAST_LETTER_APPEAR + 0.04;
const P_REVEAL_DURATION = 1.0;
const BUTTON_REVEAL_DURATION = 1;
const BUTTON_STAGGER = 0.18;
const BUTTONS_DELAY = Math.max(0, P_REVEAL_DELAY + P_REVEAL_DURATION - 0.5);
const BUTTON_TEXT_DELAY = 1.25;
const NAV_REVEAL_DURATION = 0.8;
const NAV_REVEAL_DELAY = BUTTONS_DELAY + BUTTON_REVEAL_DURATION + BUTTON_STAGGER - 0.75;

export const MAIN_SECTION_TIMINGS = {
	P_REVEAL_DELAY,
	P_REVEAL_DURATION,
};

const letterItem = {
	hidden: { opacity: 0, filter: 'blur(10px)' },
	visible: {
		opacity: 1,
		filter: 'blur(0px)',
		transition: { duration: LETTER_DURATION, ease: LETTER_EASE },
	},
};

const buttonContainer = {
	hidden: {},
	visible: {
		transition: {
			delayChildren: BUTTONS_DELAY,
			staggerChildren: BUTTON_STAGGER,
		},
	},
};

const buttonItem = {
	hidden: { opacity: 0, scale: 0.82, y: 8 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: BUTTON_REVEAL_DURATION, ease: LETTER_EASE },
	},
};

const buttonTextItem = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.3, delay: BUTTON_TEXT_DELAY, ease: LETTER_EASE },
	},
};

export const MainSection = () => {
	const [coppyEmailStatus, setCopyEmailStatus] = useState<'idle' | 'success'>('idle');
	const navgiate = useNavigate();

	return (
		<motion.section
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
			className='mx-auto flex flex-col items-center justify-center gap-6 px-6 py-24 text-center'
		>
			<BlurReveal
				className='flex flex-wrap items-center justify-center gap-5 text-[#666]'
				duration={NAV_REVEAL_DURATION}
				delay={NAV_REVEAL_DELAY}
				ease={LETTER_EASE}
			>
				<NavLinks>LinkedIn</NavLinks>
				<NavLinks>Medium</NavLinks>
				<NavLinks>Muzli.Me</NavLinks>
				<NavLinks>404</NavLinks>
			</BlurReveal>

			<article className='flex flex-col items-center gap-4'>
				<motion.h1
					className='flex cursor-default flex-col gap-x-7 text-[clamp(64px,10vw,160px)] leading-none font-light text-[#222] sm:flex-row'
					initial='hidden'
					animate='visible'
				>
					<TightText stagger={LETTER_STAGGER} delay={0}>
						{h1FirstPart.map((letter, index) => (
							<motion.span className='inline-block' variants={letterItem} key={index}>
								{letter}
							</motion.span>
						))}
					</TightText>
					<TightText stagger={LETTER_STAGGER} delay={SECOND_WORD_DELAY}>
						{h1secondPart.map((letter, index) => (
							<motion.span className='inline-block text-start' variants={letterItem} key={index}>
								{letter}
							</motion.span>
						))}
					</TightText>
				</motion.h1>
				<BlurReveal
					className='max-w-[700px] cursor-default text-center text-[clamp(18px,2vw,24px)] text-balance text-[#5f5f5f]'
					duration={P_REVEAL_DURATION}
					delay={P_REVEAL_DELAY}
					ease={LETTER_EASE}
					scale={0.98}
				>
					Design expert specializing in cross-platform digital product design, website production,
					and design operations.
				</BlurReveal>
			</article>

			<motion.article
				className='flex flex-wrap items-center justify-center pt-2'
				variants={buttonContainer}
				initial='hidden'
				animate='visible'
			>
				<MagnetButton
					className='btn-primary'
					rel='noreferrer'
					buttonVariants={buttonItem}
					onClick={() => {
						navgiate({ to: '/about' });
					}}
				>
					<motion.span variants={buttonTextItem}>About &amp; CV</motion.span>
				</MagnetButton>
				<MagnetButton
					className={cn(
						'w-[155px]',
						coppyEmailStatus === 'success' ? 'btn-secondary-success' : 'btn-secondary'
					)}
					buttonVariants={buttonItem}
					disabled={coppyEmailStatus === 'success'}
					onClick={() => {
						navigator.clipboard.writeText('example@gmail.com');
						setCopyEmailStatus('success');
						setTimeout(() => {
							setCopyEmailStatus('idle');
						}, 1000);
					}}
				>
					<motion.span variants={buttonTextItem}>
						{coppyEmailStatus === 'idle' ? 'Copy Email' : '🎉 Copied!'}
					</motion.span>
				</MagnetButton>
			</motion.article>
		</motion.section>
	);
};
