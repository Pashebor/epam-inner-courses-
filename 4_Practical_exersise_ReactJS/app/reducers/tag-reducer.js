import $ from 'jquery';



let getTags = () => {
    let allTags = [];
    let data = $.ajax({url: '/articles', dataType: 'json', type: 'GET', async: false}).responseJSON;

    data.forEach( item => {
        item.tags.forEach( tag => {
            if (allTags.indexOf(tag.trim()) === -1) {
                allTags.push(tag);
            }
        });
    });
    return allTags;
};


const initialState = getTags();



const tagReducer =  ( state = initialState, action) => {
    return state;
};

export default tagReducer;
