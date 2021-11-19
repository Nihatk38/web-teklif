<template>
  <div>

    <Chart ref="chart"
           :data="chartData"
           :options="chartOptions"
           type="polarArea"
    />
  </div>
</template>

<script>
import Chart from "primevue/chart";
import DashboardService from "../services/DashboardService";


export default {

  components: {
    Chart

  },
  data() {
    return {
      OfferCount: [],
      OffersCount: "3",
      chartData: {
        datasets: [{
          data: [],
          backgroundColor: ["#66BB6A", "#d9cf1c", "#d22c2c"],
          label: "My dataset"
        }
        ],
        labels: ["Kabul edilen", "Bekleyen", "Red Edilen"]
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057"
            }
          }
        },
        scales: {
          r: {
            grid: {
              color: "#ebedef"
            }
          }
        }
      }
    };
  },
  methods: {
    getOfferAnalysis() {
      DashboardService.getOfferStartup()
          .then((response) => {
            if (response.data.Success) {
              this.chartData.datasets[0].data.splice(0);
              this.chartData.datasets[0].data.push(response.data.Payload.AcceptedOfferCount);
              this.chartData.datasets[0].data.push(response.data.Payload.AwaitingOfferCount);
              this.chartData.datasets[0].data.push(response.data.Payload.RejectedOfferCount);
              this.$refs.chart.reinit();
            }
          });
    }
  },
  mounted() {

    this.getOfferAnalysis();


  }
};
</script>


<style scoped>

</style>