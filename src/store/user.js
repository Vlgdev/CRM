import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(s, info) {
      s.info = info;
    },
  },
  actions: {
    async getUserInfo({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once('value')
        ).val();
        commit('setInfo', info);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },
    async updateInfo({commit, dispatch, getters}, toUpdate) {
      try {
        const info = {...getters.info, ...toUpdate}
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).update(info)
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
      
    }
  },
  getters: {
    info: (s) => s.info,
  },
};
