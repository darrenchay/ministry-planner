const worshipLeaderReducer = (state = false, action) => {
    switch(action.type) {
        case 'WORSHIPLEAD':
            return true;
        default:
            return false;
    }
}

export default worshipLeaderReducer;