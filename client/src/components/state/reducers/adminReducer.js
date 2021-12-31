const adminReducer = (state = false, action) => {
    switch(action.type) {
        case 'ADMIN':
            return !state;
        default:
            return state;
    }
}

export default adminReducer;