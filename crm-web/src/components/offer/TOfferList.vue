<template>
  <div>



    <div class="CreateButton">
      <span class="p-input-icon-right" >
        <InputText type="text" placeholder="Search" style="margin-right: 5px" />
           <i class="pi pi-search" />
           </span>
      <Button @click="navigateToCreate" label="Teklif Oluştur" icon="pi pi-plus" style="margin-right: 5px"
              class="p-button-sm" />
      <Button :disabled="selected.length===0" @click="navigateToUpdate" label="Teklif Güncelle" icon="pi pi-pencil" style="margin-right: 5px"
              class="p-button-sm" />
      <Button :disabled="selected.length===0" @click="deleteOffer" label="Teklif Sil" icon="pi pi-times" style="margin-right: 5px"
              class="p-button-sm" />

    </div>
    <br><br><br>
    <div>
      <div>

        <DataTable v-model:selection="selected" :paginator="true"
                   :rows="10" :value="offerList" data-keys="id" selection-mode="single"
                   tabindex="-1"
                   @contextmenu="onDataTableOfferRightClick" aria-haspopup="true"

        >

          <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header"></Column>
          <ContextMenu ref="menu" :model="menu" />
        </DataTable>


      </div>

    </div>

  </div>
</template>

<script>

import OfferService from "../../services/OfferService";




export default {
  components: {},

  data() {
    return {

      offerList: [],

      selected: [],
      columns: [
        { field: "OfferNo", header: "Teklif Numarası" },
        { field: "CompanyName", header: "Şirket Adı" },
        { field: "State", header: "Teklif Durumu" },
        { field: "ReleaseDate", header: "Teklif Tarihi" },
        { field: "Currency", header: "Para Birimi" },
        { field: "TotalPrice", header: "Toplam Tutar" }

      ],
      menu: [
        {
          label: "Teklif Oluştur",
          icon: "pi pi-plus",
          command: () => {
            this.navigateToCreate();
          }


        },
        {
          label: "Teklif Güncelle",
          icon: "pi pi-pencil",
          command: () =>{
            this.navigateToUpdate();
          }
        },
        {
          label: "Teklif Sil",
          icon: "pi pi-times"
        },
        {
          separator: true
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off",
          command: () =>{
            this.deleteOffer();
          }
        }

      ],
    };
  },
  methods: {
    getOfferList() {
      OfferService.getOfferList()
          .then((response) => {
            if (response.data.Success) {
              this.offerList = response.data.Payload;
            }
          });
    },

    navigateToCreate() {
      this.$router.push({ name: "OfferCreate", params: { offerId: 0, operation: 1 } });
    },
    navigateToUpdate() {
      this.$router.push({ name: "OfferCreate", params: { offerId: this.selected.Id, operation: 2 } });
    },
    deleteOffer() {
      this.$confirm.require({
        message: "Silmek istediğinizden emin misiniz?",
        header: "Onay Ver",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          OfferService.deleteOffer(this.selected.Id)
              .then((response) => {
                if (response.data.Success) {
                  this.offerList.splice(this.offerList.indexOf(this.offerList), 1);

                  this.$toast.add({ severity: "success", summary: "Silme İşlemi ", detail: "Başarılı", life: 3000 });
                }
              });
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });

    },
    onDataTableOfferRightClick(event) {
      this.$refs.menu.show(event);
    },

  },

  mounted() {
    this.getOfferList()
  }
};

</script>


<style scoped></style>





