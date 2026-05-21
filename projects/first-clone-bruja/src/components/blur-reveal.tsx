import React from 'react';
import { motion } from 'framer-motion';

type BlurRevealProps = {
	children: React.ReactNode;
	className?: string;
	duration?: number;
	delay?: number;
	ease?: [number, number, number, number];
	scale?: number;
	offsetY?: number;
};

const DEFAULT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const BlurReveal = ({
	children,
	className,
	duration = 0.8,
	delay = 0,
	ease = DEFAULT_EASE,
	scale = 1,
	offsetY = 0,
}: BlurRevealProps) => {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, filter: 'blur(10px)', scale, y: offsetY }}
			animate={{ opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }}
			transition={{ duration, delay, ease }}
		>
			{children}
		</motion.div>
	);
};
