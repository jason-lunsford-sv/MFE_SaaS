import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { mount } from 'auth/AuthApp';

export default () => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        // create Auth MFE here
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname, // give the Memory Router an init location (Auth MFE)
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;

                // verify the two paths are different to prevent an infinite loop
                // of two routers trying to update each other
                if (pathname !== nextPathname) {
                    // update Browser History of container to reflect Memory Router state
                    // of Auth MFE
                    history.push(nextPathname);
                }
            }
        });

        // ".listen()" is an event listener that will fire any function passed to it
        history.listen(onParentNavigate);
    }, []);

    return (
        <div ref={ref}></div>
    )
};