const isLogin = () => {
    return sessionStorage.getItem("userId") > 0;
}

const toQuery = (obj) => {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

export {
    isLogin,
    toQuery
}