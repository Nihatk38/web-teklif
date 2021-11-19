<template>
  <div>
    <DataTable
        :value="LastOffers.Items"
        data-keys="id" selection-mode="single" tabindex="-1">
      <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header">
      </Column>
    </DataTable>
  </div>
</template>

<script>

import DashboardService from "../services/DashboardService";

export default {
  data() {
    return {
      columns: [

        { field: "CreateTime", header: "Tarih" },
        { field: "CompanyName", header: "Şirket Adı" },
        { field: "Description", header: "Açıklama" }
      ],
      LastOffers: {
        Items: []
      }

    };
  },
  methods: {
    getOffersList() {
      DashboardService.getOfferStartup()
          .then((response) => {
            if (response.data.Success) {
              this.LastOffers.Items = response.data.Payload.OffersList;
            }
          });
    }
  },
  mounted() {

    this.getOffersList();


  }
};
</script>

<style scoped>

</style>