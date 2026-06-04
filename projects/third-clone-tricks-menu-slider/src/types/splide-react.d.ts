declare module '@splidejs/react-splide' {
	import type { ComponentType, RefAttributes } from 'react';

	type SplideRef = {
		splide?: {
			go: (control: string) => void;
		};
	};

	export const Splide: ComponentType<Record<string, unknown> & RefAttributes<SplideRef>>;
	export const SplideSlide: ComponentType<Record<string, unknown>>;
}
