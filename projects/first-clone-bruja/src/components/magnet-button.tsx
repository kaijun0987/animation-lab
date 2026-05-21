import { motion, Variants } from 'framer-motion';
import React from 'react';
import { Magnetic } from '../components/base/magnetic';

type MagnetLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	buttonVariants?: Variants;
};

export const MagnetButton = React.forwardRef<HTMLButtonElement, MagnetLinkProps>(
	({ className, children, buttonVariants, type, disabled, ...buttonProps }, ref) => {
		return (
			<motion.div
				variants={buttonVariants}
				animate={disabled ? { opacity: 1, scale: 1, y: 0 } : undefined}
			>
				<div className='magnet-wrap'>
					<button
						ref={ref}
						type={type ?? 'button'}
						disabled={disabled}
						className={`magnet-link ${className ?? ''} cursor-pointer`}
						{...buttonProps}
					>
						<Magnetic className='magnet-bg' intensity={0.3} actionArea='parent' disabled={disabled}>
							<span />
						</Magnetic>
						<span className='magnet-text'>{children}</span>
					</button>
				</div>
			</motion.div>
		);
	}
);
MagnetButton.displayName = 'MagnetButton';
