import _ from 'lodash'

export default {
  data: () => ({
    page: 1,
    pageSize: 5,
    pageCount: 0,
    allItems: [],
    items: []
  }),
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  },
  created() {
    if (this.$route.query.page) this.page = +this.$route.query.page
  }
}