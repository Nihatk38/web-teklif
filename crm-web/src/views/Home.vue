<template>
  <div>
    <app-homepage-block></app-homepage-block>

    <div class="p-grid">
      <div class="p-col-6 p-md-6 ">
        <panel header="Analiz" style="width: 400px">
          <app-offer-analysis></app-offer-analysis>
        </panel>
      </div>
      <div class="p-col-6 p-md-6">
        <ScrollPanel style=" height: 200px">
          <app-homepage-list></app-homepage-list>
        </ScrollPanel>
      </div>


    </div>
  </div>
</template>

<script>

import THomeOfferAnalysis from "./THomeOfferAnalysis";
import THomepageBlock from "./THomepageBlock";
import THomepageList from "./THomepageList";

export default {
  components: {
    appOfferAnalysis: THomeOfferAnalysis,
    appHomepageBlock: THomepageBlock,
    appHomepageList: THomepageList
  }
};
</script>
