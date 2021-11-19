<template>
  <div>
    <div class="buttonList">
      <Button icon="pi pi-user-plus" label="Şirket oluştur" @click="addNewCompany" />
      <Button :disabled="selected.length===0" icon="pi pi-user-edit" label="Güncelle" @click="updateCompany" />
      <Button :disabled="selected.length===0" icon="pi pi-times" label="Sil" @click="deleteCompany" />
      <Button :disabled="selected.length===0" label="Temsilci" @click="navigateToContactList"/>
    </div>
    <br>
    <br>
    <div>
      <DataTable v-model:selection="selected"
                 :value="companies"
                 aria-haspopup="true" data-keys="id" selection-mode="single" tabindex="-1"
                 @contextmenu="onDataTableRightClick">
        <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header">
        </Column>
        <ContextMenu ref="menu" :model="items" />
      </DataTable>
    </div>
    <TCompanyEditDialog v-if="showCompanyDialog"
                        :close-dialog="closeCompanyDialog"
                        :operation="selectedOperation"
                        :company-id="selected.Id"></TCompanyEditDialog>
  </div>
</template>
<script>



import TCompanyEditDialog from "./TCompanyEditDialog";
import CompanyService from "../../services/CompanyService";


export default {
  components: {
    TCompanyEditDialog


  },

  data() {
    return {
      selectedOperation: 1,
      showCompanyDialog: false,

      items: [
        {
          label: "Ekle",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.addNewCompany();
          }
        },
        {
          label: "Güncelle",
          icon: "pi pi-fw pi-pencil",

          command: () => {

            this.updateCompany();

          }

        },
        {
          label: "Sil",
          icon: "pi pi-fw pi-times",
          command: () => {
            this.deleteCompany();
          }
        },
        {
          separator: true
        },
        {
          label: "Quit",
          icon: "pi pi-fw pi-power-off"
        }

      ],

      displayConfirmation: false,
      displayModal1: false,
      displayModal2: false,


      companies: [],
      selected: [],
      columns: [
        { field: "Id", header: "ID" },
        { field: "Name", header: "Şirket Adı" },

      ]

    };
  },
  methods: {
    onDataTableRightClick(event) {
      this.$refs.menu.show(event);
    },
    getCompanyList() {
      CompanyService.getCompanyList()
          .then((response) => {
            if (response.data.Success) {
              this.companies = response.data.Payload;
            }
          });
    },
    addNewCompany() {
      this.selected.Id = 0;
      this.selectedOperation = 1;
      this.showCompanyDialog = true;
    },
    updateCompany() {
      this.selectedOperation = 2;
      this.showCompanyDialog = true;
    },
    navigateToContactList() {
      this.$router.push({ name: "CompanyContact", params: { companyId: this.selected.Id, operation: 3 } });
    },

    deleteCompany() {
      this.$confirm.require({
        message: "Silmek istediğinizden emin misiniz?",
        header: "Onay Ver",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          CompanyService.deleteCompany(this.selected.Id)
              .then((response) => {
                if (response.data.Success) {
                  this.companies.splice(this.companies.indexOf(this.selected), 1);

                  this.$toast.add({ severity: "success", summary: "Silme İşlemi ", detail: "Başarılı", life: 3000 });
                }
              });
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });

    },

    closeCompanyDialog(refresh) {
      this.showCompanyDialog = false;
      if (refresh)
        this.getCompanyList();
    }


  },
  mounted() {

    this.getCompanyList();


  }


};
</script>
<style scoped>
.buttonList {
  position: relative;
  float: right;

}

</style>