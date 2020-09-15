import firebase from 'firebase/app';

export default {
  actions: {
    async login({commit}, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
          commit('setError', e)
          throw new Error(e.message)
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            const uid = await dispatch('getUid')
            await firebase.database().ref(`/users/${uid}/info`).set({
                name,
                bill: 10000
            })
        } catch (e) {
            commit('setError', e)
            throw new Error(e.message)
        }
    },
    async logout({commit}) {
      try {
        await firebase.auth().signOut()
        commit('setInfo', {})
      } catch (e) {
        commit('setError')
      }
    },
    getUid() {
        const user = firebase.auth().currentUser
        return user ? user.uid : null
    }
  },
};
