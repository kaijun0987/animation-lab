import { Outlet } from '@tanstack/react-router';
import { ContentHeader } from '../../components/page/content/layout/content-header';

export const ContentPageRoot = () => {
	return (
		<div className='h-screen w-full bg-white text-black'>
			<ContentHeader />
			<Outlet />
		</div>
	);
};
