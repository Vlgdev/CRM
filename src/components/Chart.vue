<script>
import { Pie } from "vue-chartjs";

export default {
  name: "Chart",
  extends: Pie,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options);
  }
};
</script>