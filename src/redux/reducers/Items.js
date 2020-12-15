import {
    ADD_TO_ITEM
} from '../action-types';


const initialState = {
    addtoitem: [],
};

export const Items = (state = initialState, { type, payload = null }) => {
    switch (type) {
        case ADD_TO_ITEM:
            return {
                ...state,
                addtoitem: payload,
            };      
        default:
            return state;
    }


}
