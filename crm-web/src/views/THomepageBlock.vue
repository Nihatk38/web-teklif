<template>
  <div class="grid">
    <div class="col-12 md:col-6 lg:col-3">
      <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Toplam teklif</span>
            <div class="text-900 font-medium text-xl">{{ Offers.OfferCount }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">--</span>
        <span class="text-500">--</span>
      </div>
    </div>
    <div class="col-12 md:col-6 lg:col-3">
      <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Kabul Edilen</span>
            <div class="text-900 font-medium text-xl">{{ Offers.AcceptedOfferCount }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-green-200 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-check text-green-600 text-xl"></i>
          </div>
        </div>
        <span
            class="text-green-500 font-medium">% {{ acceptedOfferRatio }} </span>
        <span class="text-500"> kabul edildi</span>
      </div>
    </div>

    <div class="col-12 md:col-6 lg:col-3">
      <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Bekleyen</span>
            <div class="text-900 font-medium text-xl">{{ Offers.AwaitingOfferCount }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-yellow-100 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-clock text-yellow-600 text-xl"></i>
          </div>
        </div>
        <span
            class="text-green-500 font-medium">% {{ AwaitingOfferRatio }} </span>
        <span class="text-500"> bekliyor</span>
      </div>
    </div>

    <div class="col-12 md:col-6 lg:col-3">
      <div class="surface-0 shadow-2 p-3 border-1 border-50 border-round">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Red Edilen</span>
            <div class="text-900 font-medium text-xl">{{ Offers.RejectedOfferCount }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-pink-200 border-round"
               style="width:2.5rem;height:2.5rem">
            <i class="pi pi-times text-pink-700 text-xl"></i>
          </div>
        </div>
        <span
            class="text-green-500 font-medium">% {{ RejectedOfferRatio }}</span>
        <span class="text-500"> red edildi</span>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardService from "../services/DashboardService";

export default {
  data() {
    return {
      Offers: []

    };
  },
  methods: {
    getOffers() {
      DashboardService.getOfferStartup()
          .then((response) => {
            if (response.data.Success) {
              this.Offers = response.data.Payload;
            }
          });
    }

  },
  computed: {
    acceptedOfferRatio() {
      return parseInt((this.Offers.AcceptedOfferCount * 100) / (this.Offers.OfferCount));
    },
    RejectedOfferRatio() {
      return parseInt((this.Offers.RejectedOfferCount * 100) / (this.Offers.OfferCount));
    },
    AwaitingOfferRatio() {
      return parseInt((this.Offers.AwaitingOfferCount * 100) / (this.Offers.OfferCount));
    }

  },

  mounted() {

    this.getOffers();


  }
};


</script>

