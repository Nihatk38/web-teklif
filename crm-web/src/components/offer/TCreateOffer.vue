<template>

  <div class="CreateBody">

    <Dropdown class="p-col-fixed " style="width: 400px ; margin-right:5px" v-model="offer.CompanyName"
              optionValue="name"
              :options="companylist.CompanyId" optionLabel="name" placeholder="Firma Adı"
              :disabled="operation === 2" />


    <Dropdown class="p-col-fixed" style="width: 350px; margin-right:5px" v-model="offer.CompanyContact"
              optionValue="name"
              :options="companylist.CompanyContactId"
              optionLabel="name"
              placeholder="Firma İlgilisi" />

    <Calendar class="p-col-fixed" style="width: 200px ; margin-right:5px" v-model="offer.ReleaseDate"
              placeholder="Teklif Tarihi"
              :showIcon="true" />

    <Calendar class="p-col-fixed" style="width: 200px ; margin-right:5px" v-model="offer.ValidationDate"
              placeholder="Geçerlilik Süresi"
              :showIcon="true" />


    <Dropdown class="p-col-fixed" style="width: 150px ; margin-right:5px" v-model="offer.Currency"
              :options="currency"
              optionLabel="name" placeholder="Para Birimi" />




    <br><br>

    <div class="CreateButton">
      <Button  @click="addOfferDetail" label="Ekle" icon="pi pi-plus" style="margin-right: 5px" class="p-button-sm" />


      <Button :disabled="selectedOfferDetail.length===0" label="Düzenle" icon="pi pi pi-pencil" class="p-button-sm" style="margin-right: 5px"
              @click="updateOfferDetail" />


      <Button :disabled="selectedOfferDetail.length===0" @click="deleteOfferDetail" label="Sil" icon="pi pi-times" style="margin-right: 5px" class="p-button-sm" />
    </div>
    <br><br>


    <TabView>

      <TabPanel header="Detaylar">

        <DataTable v-model:selection="selectedOfferDetail"

                   @contextmenu="onDataTableRightClick" aria-haspopup="true"

                   :value="offer.Items" data-keys="id" selection-mode="single" tabindex="-1">


          <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header"></Column>
          <span>Selected: {{ selectedOfferDetail.OfferNo }}</span>
          <ContextMenu ref="menu" :model="menu" />

        </DataTable>

        <br>

      </TabPanel>

      <TabPanel header="Süre Bilgisi">
        <Editor v-model="offer.TimeInformation" editorStyle="height: 320px" placeholder="Süre Bilgisini Giriniz" />
      </TabPanel>

      <TabPanel header="Ticari Koşullar">
        <Editor v-model="offer.CommercialTerms" editorStyle="height: 320px" placeholder="Ticari Koşulları Giriniz" />
      </TabPanel>

      <TabPanel header="Açıklamalar">
        <Editor v-model="offer.Descriptions" editorStyle="height: 320px" placeholder="Açıklamaları Giriniz" />
      </TabPanel>

    </TabView>

    <div class="SubmitButton">
      <Button class="p-button-danger p-button-lg" label="Kaydet" @click="handleClick($event)" />
    </div>

    <t-offer-edit-dialog v-if="showOfferDialog"
                         :close-dialog="closeOfferDialog"
                         :operation="selectedOfferOperation"
                         :offer-id="selectedOfferDetail.OfferNo"></t-offer-edit-dialog>
  </div>

</template>
<script>

import OfferService from "../../services/OfferService";
import TOfferEditDialog from "./TOfferEditDialog";


export default {

  props: {
    offerId: {
      type: Number,
      required: true
    },
    operation: {
      type: Number,
      default: 1
    }
  },
  components: {
    TOfferEditDialog: TOfferEditDialog
  },

  data() {
    return {
      selectedOfferDetail:[],
      displayModal: false,
      selectedOfferOperation: "1",
      showOfferDialog: false,
      offer: {
        Items: []
      },

      companies: [
        { name: "Firma1", code: "1" },
        { name: "Firma2", code: "2" },
        { name: "Firma3", code: "3" },

      ],
      companiesContact: [
        { name: "Firma İlgilisi 1", code: "1" },
        { name: "Firma İlgilisi 2", code: "2" },
        { name: "Firma İlgilisi 3", code: "3" },


      ],
      menu: [
        {
          label: "Ekle",
          icon: "pi pi-plus",
          command: () => {
            this.addOfferDetail();
          }

        },
        {
          label: "Düzenle",
          icon: "pi pi-pencil",
          command: () => {
            this.updateOfferDetail();
          }
        },
        {
          label: "Sil",
          icon: "pi pi-times",
          command: () => {
            this.deleteOfferDetail();
          }
        },
        {
          label:"Gönder",
          icon: "pi pi-check-circle",
          items:[
            {
              label:"E-mail",
              icon:"pi pi-inbox",
            },
            {
              label:"İndir",
              icon: "pi pi-download"
            }
          ]
        },
        {
          separator: true
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off"
        }

      ],

      ProfitRate: [
        {}
      ],
      selected: [],
      columns: [
        { field: "ProductType", header: "Ürün Cinsi" },
        { field: "TotalProduct", header: "Adet" },
        { field: "UnitPrice", header: "Birim Fiyatı" },
        { field: "Currency", header: "Para birimi" },

        { field: "Total", header: "Toplam" }


      ],
      companylist:{}

    };
  },
  methods: {
    getOfferList() {
      OfferService.getOfferList()
          .then((response) => {
            if (response.data.Success) {
              this.companylist = response.data.Payload;
            }
          });
    },
    addOfferDetail() {
      this.selectedOfferDetail.OfferNo = 0;
      this.selectedOfferOperation = 1;
      this.showOfferDialog = true;

     // console.log(this.offer);

    },
    updateOfferDetail() {

      this.selectedOfferOperation = 2;
      this.showOfferDialog = true;


    },
    deleteOfferDetail() {
      this.$confirm.require({
        message: "Silmek istediğinizden emin misiniz?",
        header: "Onay Ver",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          OfferService.deleteOfferDetail(this.selectedOfferDetail.OfferNo)
              .then((response) => {
                if (response.data.Success) {
                  this.offer.Items.splice(this.offer.Items.indexOf(this.selectedOfferDetail.OfferNo), 1);

                  this.$toast.add({ severity: "success", summary: "Silme İşlemi ", detail: "Başarılı", life: 3000 });
                }
              });
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });

    },




    handleClick() {
      if (this.operation === "1") {


          OfferService.addOffer(this.offer).then(request => {
            this.offer = request.data.Payload;
          })

        this.$router.push({ name: "OfferCreate" });



      } else {


           OfferService.updateOffer(this.offer).then(request => {
             this.selected.Id = request.data.selected.Id;
           });

        this.$router.push({ name: "OfferUpdate" });
      }
    },
    closeOfferDialog() {
      this.showOfferDialog = false;
    },

    onDataTableRightClick(event) {
      this.$refs.menu.show(event);
    }

  },
  mounted() {
    if (this.operation === 1)
      return;

    if (!this.offerId) {
      this.$router.push({ name: "OfferList" });
      return;
    }

    OfferService.getOffer(this.offerId)
        .then((data) => this.offer = data);

    this.getOfferList()



  }

};
</script>
<style>
.CreateButton, .SubmitButton {
  position: relative;
  float: right;


}


</style>