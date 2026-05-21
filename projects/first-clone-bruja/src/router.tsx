import React from 'react';
import { createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import App from './page/App';
import { ContentPageRoot } from './page/content/content-page-root';
import { AboutPage } from './page/content/about';

function RootLayout() {
	return (
		<div className='min-h-screen'>
			<Outlet />
		</div>
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

const contentPageRootRoute = createRoute({
	getParentRoute: () => rootRoute,
	id: 'content-page',
	component: ContentPageRoot,
});

const aboutPageRoute = createRoute({
	getParentRoute: () => contentPageRootRoute,
	path: 'about',
	component: AboutPage,
});

const routeTree = rootRoute.addChildren([
	indexRoute,
	contentPageRootRoute.addChildren([aboutPageRoute]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}
