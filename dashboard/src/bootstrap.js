import { createApp } from 'vue';

import Dashboard from './components/Dashboard.vue';

// onNavigate, defaultHistory, initialPath, and onSignIn comes from Container, when mount() is called with config object
const mount = (element) => {
    const app = createApp(Dashboard);
    app.mount(element);
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#dashboard-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };