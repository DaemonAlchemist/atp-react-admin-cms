
import {connectWithLifecycle} from 'react-lifecycle-component';
import Details from "../../components/content/details";
import {Content} from "../../reducer/content";
import {get} from "atp-pointfree";

export default connectWithLifecycle(
    (state, {contentId}) => ({
        content: Content().select.one(get(state), contentId)
    }),
    (dispatch, {contentId}) => ({
        componentDidUpdate: prevProps => {
            console.log("Update");
            if(prevProps.contentId !== contentId && contentId) {
                Content().action.fetch(contentId);
            }
        },
        updateContent: (data, dispatch) => {dispatch(Content().action.update(contentId, data));},
    })
)(Details);
