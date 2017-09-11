import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';  
import { Provider } from 'react-redux';  
import { BrowserRouter, Route } from 'react-router-dom';  
import Opportunities from './components/Opportunities';
import registerServiceWorker from './registerServiceWorker';
import {loadOpportunities} from './actions/opportunitiesAction'


const store = configureStore();
store.dispatch(loadOpportunities(1));
//store.dispatch(updateOpportunities());

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <div>
        <Route path='/' component={Opportunities} />
    </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
