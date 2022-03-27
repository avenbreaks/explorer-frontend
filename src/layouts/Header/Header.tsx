import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import AmbrosusLogoSvg from './AmbrosusLogoSvg';

const menu = routes.map((menuElement) => (
	<Link to={menuElement.path} key={menuElement.key} className='menu__item'>
		{menuElement.key}
	</Link>
));

export const Header = () => (
	<div className='header'>
		<div className='container'>
			<nav className='navigation'>
				<div className='logo'>
					<Link to='/'>
						<AmbrosusLogoSvg />
					</Link>
				</div>
				<div className='menu'>{menu}</div>
			</nav>
		</div>
	</div>
);
