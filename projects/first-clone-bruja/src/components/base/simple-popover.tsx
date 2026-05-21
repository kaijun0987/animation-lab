import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../../../utils/cn';

type SimplePopoverProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	trigger: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
	children: React.ReactNode;
	align?: 'start' | 'center' | 'end';
	offset?: number;
	className?: string;
	contentClassName?: string;
};

const fadeVariants = {
	hidden: { opacity: 0, y: -4 },
	visible: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -4 },
};

export const SimplePopover = ({
	open,
	onOpenChange,
	trigger,
	children,
	align = 'center',
	offset = 8,
	className,
	contentClassName,
}: SimplePopoverProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			if (!containerRef.current) {
				return;
			}
			if (!containerRef.current.contains(event.target as Node)) {
				onOpenChange(false);
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onOpenChange(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [open, onOpenChange]);

	const triggerNode = React.cloneElement(trigger, {
		onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
			trigger.props.onClick?.(event);
			onOpenChange(!open);
		},
		'aria-expanded': open,
	});

	const alignment =
		align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2';

	return (
		<div ref={containerRef} className={cn('relative inline-flex', className)}>
			{triggerNode}
			<AnimatePresence>
				{open ? (
					<motion.div
						key='popover'
						initial='hidden'
						animate='visible'
						exit='exit'
						variants={fadeVariants}
						transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
						className={cn('absolute top-[80%] z-50 origin-top', alignment, contentClassName)}
						style={{ marginTop: offset }}
					>
						{children}
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
};
