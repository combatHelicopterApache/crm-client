import React from 'react'
import routes from './RouteData'
import {Routes, Route} from 'react-router-dom'


const Router = () => {
    return (
        <Routes>
            {
                routes.map(({path, element: Page}) =>

                    <Route key={path} path={path} element={<Page/>}></Route>
                )
            }
        </Routes>
    );
};

export default Router;