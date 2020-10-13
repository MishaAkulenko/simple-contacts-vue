import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getContactPosIndexById = (list, data) =>{
  return list.findIndex((contact) => contact.id === data.id)
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    contactsList: [{
      id: 1, contactName: 'Ваш первый контакт',
      contactPhone: 6501701779
    }],
  },
  mutations: {
    "ADD_NEW_CONTACT"(state, data){
      state.contactsList.push({id: Date.now(), ...data});
    },
    "REMOVE_CONTACT"(state, data){
      state.contactsList.splice(getContactPosIndexById(state.contactsList, data), 1);
    },
    "ADD_INFO_FIELD"(state, data){
      Vue.set(state.contactsList[getContactPosIndexById(state.contactsList, data)], data.fieldName, '');
    },
    "REMOVE_INFO_FIELD"(state, data){
      let index =  getContactPosIndexById(state.contactsList, data),
          oldContactInfo = state.contactsList[index];

      delete oldContactInfo[data.fieldName];

      state.contactsList.splice(index, 1, {...oldContactInfo});
    },
  },
});
