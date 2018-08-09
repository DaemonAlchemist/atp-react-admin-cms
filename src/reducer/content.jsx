
import {o} from "atp-sugar";
import {entityBoilerplate} from "atp-redux-entity";

export const contentType = 'cmsContent';

//Selectors
export const selectedContentId = getState => getState().cms.dashboard.selectedContentId;

//Reducer
export default (state = {}, action) => o(action.type).switch({
    default: () => state
});

//Standard REST entity selectors and actions
export const Content = () => entityBoilerplate(contentType, 'content');
