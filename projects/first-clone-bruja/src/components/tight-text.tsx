import React from 'react';
import { motion, type Variants } from 'framer-motion';

type TTightText = {
	children: React.ReactNode;
	delay?: number;
	stagger?: number;
};

const buildContainer = (stagger: number): Variants => ({
	hidden: {},
	visible: (delayChildren: number) => ({
		transition: {
			staggerChildren: stagger,
			delayChildren,
		},
	}),
});

export const TightText = ({ children, delay = 0, stagger = 0.04 }: TTightText) => {
	return (
		<motion.div
			className='tracking-[-0.07em] sm:whitespace-nowrap'
			variants={buildContainer(stagger)}
			custom={delay}
		>
			{children}
		</motion.div>
	);
};
