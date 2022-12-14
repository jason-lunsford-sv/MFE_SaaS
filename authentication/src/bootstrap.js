import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

// onNavigate, defaultHistory, initialPath, and onSignIn comes from Container, when mount() is called with config object
const mount = (element, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history} onSignIn={onSignIn} />,
        element
    );

    // allows communication FROM container MFE down to Marketing MFE
    return {
        onParentNavigate({ pathname: nextPathname }) {
            const { pathname } = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#auth-dev-root');

    if (devRoot) {
        // defaultHistory allows us to update the url path in the browser when the
        // marketing MFE is ran in isolation
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

export { mount };