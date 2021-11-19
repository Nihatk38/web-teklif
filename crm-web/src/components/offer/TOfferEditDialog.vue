<template>
  <Dialog position="center" :visible="true" :modal="true" :show-header="false" :style="{width: '50vw'}">
    <div class="p-fluid">
      <h5>Düzenle</h5>
      <div class="p-field">
        <label>Ürün Cinsi</label>
        <InputText placeholder="Ürün Cinsi" id="ProductType" type="text"
                   v-model="offerDetail.ProductType"/>
      </div>
      <br>
      <div class="p-field">
        <label>Ürün Adeti</label>
        <InputText placeholder="Ürün Adeti" id="TotalProduct" type="text"
                   v-model="offerDetail.TotalProduct"/>
      </div>
      <br>
      <div class="p-field">
        <label>Birim Fiyatı</label>
        <InputText placeholder="Birim Fiyatı" id="UnitPrice" type="text"
                   v-model="offerDetail.UnitPrice"/>
      </div>



    </div>
    <br>

    <Button class="buttonEdit" label="Ekle" icon="pi pi-check" style="margin-right: 5px" @click="submitOffer"
            autofocus />
    <Button class="buttonEdit" label="İptal" icon="pi pi-check" @click="closeDialog" style="margin-right: 5px"
            autofocus />

  </Dialog>

</template>


<script>


import OfferService from "../../services/OfferService";

export default {
  props: {
    offerId: {
      type: Number,
      required: true
    },
    operation: {
      type: Number,
      default: 1
    },

    closeDialog: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      offerDetail: {  },
      Currency: [
        { name: "Tl", symbol: "₺" },
        { name: "Euro", symbol: "€" },
        { name: "Dolar", symbol: "$" }
      ],
      ProfitRate: [
        {}
      ]

    };


  },
  methods: {
    submitOffer() {
      if (this.operation === 1) {
        OfferService.addOfferDetail(this.offerDetail).then(response => {
          if (response.data.Success)
            this.closeDialog(true);
        });
      } else
        this.$confirm.require({
          message: "Düzeltmek istediğinizden emin misiniz?",
          header: "Onay Ver",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            OfferService.updateOfferDetail(this.offerDetail).then(response => {
              if (response.data.Success) {
                this.closeDialog(true);
                this.$toast.add({ severity: "success", summary: "Düzeltme ", detail: "Başarılı", life: 3000 });
              }
            });
          },
          reject: () => {
            //callback to execute when user rejects the action
          }
        });
      return this.closeDialog();
    }
  },

};

</script>
<style>
.drop-down {
  display: inline-block;
  margin-left: 5px;

}

.buttonEdit {

  position: relative;
  float: right;

}
</style>