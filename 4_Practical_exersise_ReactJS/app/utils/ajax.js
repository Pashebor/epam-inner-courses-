export const ajaxJson = (url, method = 'get', params) => {
    return fetch(url, {
        method,
        credentials: 'same-origin',
        headers: {"Content-type": "application/x-www-form-urlencoded"},
        body: params && 'formData=' + JSON.stringify(params)
    })
        .then(response => response.json());
};

export const getJson = (url, params) => {
    if (params === undefined) {
       return ajaxJson(url);
    }

    return ajaxJson(url + '/' + params, 'get');

};

export const postJson = (url, params) => {
    return ajaxJson(url, 'post', params);
};

export const putJson = (url, params) => {
    return ajaxJson(url, 'put', params);
};


export const deleteJson = (url) => {
    return ajaxJson(url, 'delete');
};
