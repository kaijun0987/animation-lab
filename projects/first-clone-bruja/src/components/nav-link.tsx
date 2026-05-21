import React from 'react';

type TNavLinks = {
	children: React.ReactNode;
};

export const NavLinks = ({ children }: TNavLinks) => {
	return (
		<a className='nav-link' href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
			{children}
		</a>
	);
};
