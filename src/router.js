import Vue from 'vue';
import Router from 'vue-router';
import store from "@/store/store";
Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',

  routes: [{
    path: '/',
    name: 'contactsList',
    component: () => import(/* webpackChunkName: "ContactsListPage" */ './pages/ContactsListPage.vue'),
    },{
      path: '/contact/:contactId',
      name: 'contactInfo',
      beforeEnter(to, from, next){

        function getContactById(id) {
          return !!store.state.contactsList.find((contact)=>{
            return contact.id === Number(id)
          })
        }

        if (!getContactById(to.params.contactId)) {
          next({path: '/404', replace: true}) //if contact is absent - redirect to 404 page
        } else {
          next()
        }
      },
      component: () => import(/* webpackChunkName: "ContactInfoPage" */ './pages/ContactInfoPage.vue'),
    },{
      path: '*',
      name: 'NotFoundPage',
      component: () => import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFoundPage.vue')
    }]
});
