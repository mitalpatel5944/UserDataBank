import {
    ADD_TO_ITEM
  } from './action-types';
  
  
  export function AddItem(payload) {
    return {
      type: ADD_TO_ITEM,
      payload,
    }
  }

  