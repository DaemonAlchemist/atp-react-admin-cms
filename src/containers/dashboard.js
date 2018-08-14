
import React from "react";
import {connectWithLifecycle} from "react-lifecycle-component";
import Dashboard from "../components/dashboard";
import {Content} from "../reducer/content";
import {get} from 'atp-pointfree';
import {radio} from 'basic-reducers';

const listKey = "cmsDashboardSelectedContent";

export default connectWithLifecycle(
    (state, props) => ({
        selectedContentId: radio.value(get(state), listKey),
        isSelected: id => id === radio.value(get(state), listKey),
        content: Content().select.all(get(state))
    }),
    (dispatch, props) => ({
        toggle: id => () => {dispatch(radio.toggle(listKey, id));},
        onNewContent: () => {
            dispatch(Content().action.create({title: "New content"}));
        },
        componentDidMount: () => {
            dispatch(Content().action.collection.get({}));
        }
    })
)(Dashboard);
