import data from '../data/db.json';

const initState = data.posts;
const rootReducer = (state=initState, action) => {
    return state;
}

export default rootReducer;