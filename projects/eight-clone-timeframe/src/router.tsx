import {
	createRootRoute,
	createRoute,
	createRouter,
	Link,
	Outlet,
	useLocation,
} from '@tanstack/react-router';

import App from './App';

function RootLayout() {
	const location = useLocation();
	const isHome = location.pathname === '/';

	return (
		<div className={isHome ? '' : 'min-h-screen bg-slate-950 text-slate-100'}>
			{!isHome && (
				<nav className='mx-auto flex max-w-3xl items-center gap-4 px-6 pt-8 text-sm text-slate-300'>
					<Link to='/' className='transition hover:text-white'>
						Home
					</Link>
					<Link to='/about' className='transition hover:text-white'>
						About
					</Link>
				</nav>
			)}
			<Outlet />
		</div>
	);
}

function About() {
	return (
		<section className='mx-auto max-w-3xl px-6 py-12 text-slate-300'>
			<h2 className='text-2xl font-semibold text-white'>About this template</h2>
			<p className='mt-3 text-base'>
				Use this space to describe the motion study or the interaction you are building.
			</p>
		</section>
	);
}

const rootRoute = createRootRoute({
	component: RootLayout,
});

const indexRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: '/',
	component: App,
});

const aboutRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: 'about',
	component: About,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
