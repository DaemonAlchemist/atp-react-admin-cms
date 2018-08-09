
import React from "react";
import {combineReducers} from 'redux';
import {Route} from 'react-router';
import {Link} from 'atp-react-tab-router';

import content from "./reducer/content";

import Dashboard from "./containers/dashboard";
import {Icon} from 'react-font-awesome-5';

export default {
    reducers: {
        cms: combineReducers({
            content
        })
    },
    routes: [
        <Route path="/cms/dashboard" key="/cms/dashboard" exact render={() => <Dashboard />} />,
    ],
    init: {
        ui: {
            menus: {
                main: {
                    cms: {
                        label: <span><Icon.File /> CMS</span>,
                        sortOrder: 0,
                        permissions: ['cms.navMenu.view'],
                        children: {
                            dashboard: {
                                label: <Link
                                    to="/cms/dashboard"
                                    label={<span><Icon.Desktop /> Content Dashboard</span>}
                                    target="new"
                                >
                                    <Icon.Desktop /> Content
                                </Link>,
                                noAnchor: true,
                                sortOrder: 0,
                            }
                        }
                    }
                }
            }
        }
    },
};
