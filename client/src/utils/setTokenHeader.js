import axios from 'axios';

const setTokenHeader = token => {
    if(token) {
        axios.defaults.headers.common['auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['auth-token'];
    }
}

export default setTokenHeader;