import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUid')
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const res =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || {}
        return Object.keys(res).map((id) => ({ ...res[id], id }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val()
        return category ? {...category, id} : null
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/categories/${id}`)
          .update({ title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
