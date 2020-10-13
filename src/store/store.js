import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    contactsList: [{
        id: 1,
        contactName: 'Ваш первый контакт',
        contactPhone: 6501701779
    }]
  },
  mutations: {
    "ADD_NEW_CONTACT"(state, data){
      state.contactsList.push({id: Date.now(), ...data});
    },
    "REMOVE_CONTACT"(state, data){
      state.contactsList.splice(this.getters.getContactIndexInListById(data.id), 1);
    },
    "ADD_INFO_FIELD"(state, data){
        const contactIndex = this.getters.getContactIndexInListById(data.id);
        Vue.set(state.contactsList[contactIndex], data.fieldName, ''); // Просто так короче =)
        // state.contactsList.splice(contactIndex, 1, {...oldContactInfo, [data.fieldName]: ''});
    },
    "REMOVE_INFO_FIELD"(state, data){
        let contactIndex =  this.getters.getContactIndexInListById(data.id),
            oldContactInfo = state.contactsList[contactIndex];

        delete oldContactInfo[data.fieldName];
        state.contactsList.splice(contactIndex, 1, {...oldContactInfo});
    },
    "EDIT_INFO_FIELD"(state, data){
        const contactIndex = this.getters.getContactIndexInListById(data.id);
        state.contactsList[contactIndex][data.fieldName] = data.newValue;
      },
      "RESET_CONTACT_STATE"(state, data){
          const contactIndex = this.getters.getContactIndexInListById(data.id);
          state.contactsList.splice(contactIndex, 1, {...data});
      },
    },
    getters:{
        getFieldValueOfContact: (state, getters) => (contactId, fieldName)  => {
          const contactIndex = getters.getContactIndexInListById(contactId);
          return state.contactsList[contactIndex][fieldName]
        },
        getContactById: (state, getters) => (contactId)  => {
            const contactIndex = getters.getContactIndexInListById(contactId);
            return state.contactsList[contactIndex]
        },
        getContactIndexInListById: (state) => id =>{
            return state.contactsList.findIndex((contact) => contact.id === id)
        }
    }
});
