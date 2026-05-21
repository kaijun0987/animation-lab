import { ArrowRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../../utils/cn';

type TZoomInteractiveCardProps = {
	image: string;
	title: string;
	description: string;
	color: string;
};

export const ZoomInteractiveCard = ({
	image,
	title,
	description,
	color,
}: TZoomInteractiveCardProps) => {
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [isObserved, setIsObserved] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const target = imageRef.current;
		if (!target || typeof IntersectionObserver === 'undefined') {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				setIsObserved(Boolean(entry?.isIntersecting));
			},
			{ threshold: 0.3 }
		);

		observer.observe(target);
		return () => observer.disconnect();
	}, []);

	const showDetails = isObserved || isHovered;

	return (
		<button
			type='button'
			className={cn(
				'group flex w-full cursor-pointer flex-col justify-self-center rounded-xl transition-transform duration-1000 ease-out hover:scale-[1.01]',
				color
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={() => {}}
		>
			<img
				ref={imageRef}
				src={image}
				className='h-full w-full rounded-t-xl transition-transform duration-1000 ease-out group-hover:scale-[0.96]'
			/>
			<div className='flex flex-col items-start gap-y-0.5 px-6 py-5'>
				<div
					className={cn(
						'transition-opacity duration-900 ease-out',
						showDetails ? 'opacity-100' : 'opacity-0'
					)}
				>
					<h2 className='flex flex-row items-center gap-x-2 text-2xl font-normal text-[#1C2024]'>
						{title}
						<div
							className={cn(
								'size-5 items-center justify-center rounded-full bg-black',
								isObserved
									? 'hidden group-hover:flex'
									: 'flex opacity-0 transition-opacity duration-900 ease-out group-hover:opacity-100'
							)}
						>
							<ArrowRight className='size-4 text-white' />
						</div>
					</h2>
					<p className='text-base text-[#5F5F5F] opacity-55'>{description}</p>
				</div>
			</div>
		</button>
	);
};
