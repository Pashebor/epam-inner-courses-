import { expect } from 'chai';

import * as actions from './../app/actions/index';
import * as types from './../app/actions/index';

describe('actions', () => {
    it('should create an action to get tag value on click', () => {
       const tag = 'Racoon';
       const expectedAction = {
           type: types.FILTER_SEARCH,
           filterValue: tag
       };
       expect(actions.filterAction(tag)).to.deep.equal(expectedAction);
    });
    it('should create an action to set notification condition', () => {
        const condition = true;
        const expectedAction = {
            type: types.SET_NOTIFICATION_CONDITION,
            condition: condition
        };
        expect(actions.setNotifCondition(condition)).to.deep.equal(expectedAction);
    });
    it('should create an action to trigger a delete button visibility of forms', () => {
        const show = true;
        const expectedAction = {
            type: types.TRIGGER_VISIBILITY_DEL_BTN,
            show: show
        };
        expect(actions.setDelBtnVisibility(show)).to.deep.equal(expectedAction);
    });
});
