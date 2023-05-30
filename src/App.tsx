import React, {Suspense} from 'react'
import Router from "./components/Router/Router";
import store from "./store";
import {Provider} from "react-redux";
import {Spinner} from "./components/Spinner/Spinner";


export const  App = () => {
  return (
      <Suspense fallback={<Spinner /> } >
        <Provider store={store} >
          <Router/>
        </Provider>
      </Suspense>
  );
}


