import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({ commit, dispatch, getters }, data) {
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(data)
        const bill = data.type === 'income' ? getters.info.bill + data.amount : getters.info.bill - data.amount
        dispatch('updateInfo', {bill})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecord({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const res = await firebase.database().ref(`/users/${uid}/records/${id}`).once('value')
        const record = res.val()
        return record ? {key: res.key, ...record} : null
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
}
