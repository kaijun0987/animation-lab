import { HomeIcon } from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Circle, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../../../../../utils/cn';
import { SimplePopover } from '../../../base/simple-popover';
import { MagnetButton } from '../../../magnet-button';

const contentHeaderMenuItems = [
	{
		path: 'about',
		label: 'About & CV',
	},
	{
		path: '404',
		label: '404',
	},
	{
		path: 'parcel-grid',
		label: 'ParcelGrid',
	},
	{
		path: 'story-liner',
		label: 'Storyliner',
	},
	{
		path: 'voyager',
		label: 'Voyager',
	},
	{
		path: 'mindspace',
		label: 'Mindspace',
	},
	{
		path: 'pigmenta',
		label: 'Pigmenta',
	},
];

export const ContentHeader = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header className='sticky top-9 flex flex-row justify-between px-24'>
			<MagnetButton
				className='size-14 rounded-full bg-black p-2 text-white'
				onClick={() => {
					navigate({ to: '/' });
				}}
			>
				<ArrowLeft />
			</MagnetButton>

			<SimplePopover
				open={isOpen}
				onOpenChange={setIsOpen}
				align='end'
				trigger={
					<MagnetButton
						disabled={isOpen}
						className={`menu-button size-14 rounded-full bg-black p-2 text-white ${
							isOpen ? 'is-open' : ''
						}`}
						aria-controls='content-menu-popover'
					>
						<span className='menu-icon' aria-hidden='true'>
							<span className='menu-lines'>
								<span className='menu-line menu-line--long' />
								<span className='menu-line menu-line--short' />
							</span>
							<X className='menu-x' />
						</span>
						<span className='sr-only'>Menu</span>
					</MagnetButton>
				}
				contentClassName='bg-black rounded-[24px] p-3'
			>
				<div className='flex w-[240px] cursor-pointer flex-col rounded-[24px] text-white'>
					<button className='group flex cursor-pointer flex-row items-center justify-center rounded-2xl px-4 py-2 hover:bg-zinc-800'>
						Home
						<div className='-mr-1 ml-auto'>
							<HomeIcon className='size-4 text-gray-500 group-hover:text-white' />
						</div>
					</button>

					{contentHeaderMenuItems.map((item) => (
						<button
							key={item.path}
							className={cn(
								'group flex cursor-pointer flex-row items-center justify-center rounded-2xl px-4 py-2',
								location.href === `/${item.path}` ? 'bg-zinc-900' : 'hover:bg-zinc-800'
							)}
						>
							{item.label}
							{location.href === `/${item.path}` ? (
								<div className='ml-auto'>
									<Circle className='size-2 rounded-full bg-white' />
								</div>
							) : (
								<div className='-mr-1 ml-auto flex size-4 items-center justify-center rounded-full bg-black group-hover:bg-white'>
									<ArrowRight className='hidden size-3 text-black group-hover:flex' />
								</div>
							)}
						</button>
					))}
				</div>
			</SimplePopover>
		</header>
	);
};
