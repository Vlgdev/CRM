<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{'Bill_CurrenciesTitle' | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{'Bill_Currency' | localize}}</th>
              <th>{{'Bill_Rate' | localize}}</th>
              <th>{{'Bill_Date' | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currensies" :key="cur">
              <td>{{cur}}</td>
              <td>{{rates[cur].toFixed(2)}}</td>
              <td>{{date | date}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeCurrency',
  props: ['rates', 'date'],
  data: () => ({
    currensies: ['RUB', 'USD', 'EUR']
  })
}
</script>
