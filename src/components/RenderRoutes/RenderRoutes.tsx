import React from 'react';
// @ts-ignore
import { Route, Routes } from 'react-router-dom';

export const RenderRoutes = (props: any) => {
	const { routes } = props;
	return (
		<Routes>
			{routes.map((route: any) => (
				<Route
					key={route.key}
					path={route.path}
					element={<route.component />}
					{...route}
				/>
			))}
		</Routes>
	);
};
