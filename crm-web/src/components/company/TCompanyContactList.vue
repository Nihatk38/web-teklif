<template>
<div>
  <div>
    <div class="buttonList">
      <Button icon="pi pi-user-plus" label="Temsilci oluştur" @click="addNewContact" />
      <Button :disabled="selectedContact.length === 0" icon="pi pi-user-edit" label="Güncelle" @click="updateContact" />
      <Button :disabled="selectedContact.length===0" icon="pi pi-times" label="Sil" @click="deleteContact" />

    </div>
    <br>
    <br>
    <div>
      <DataTable v-model:selection="selectedContact"
                 :value="ContactList"
                 aria-haspopup="true" data-keys="id" selection-mode="single" tabindex="-1"
                 @contextmenu="onDataTableRightClick">
        <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header">
        </Column>
        <ContextMenu ref="menu" :model="items" />
      </DataTable>
    </div>
  <t-company-contact-edit-dialog
      v-if="showCompanyContactDialog"
      :close-dialog="closeCompanyContactDialog"
      :operation="selectedContactOperation"
      :contact-id="selectedContact.Id"
  ></t-company-contact-edit-dialog>
    </div>
</div>

</template>

<script>
import CompanyService from "../../services/CompanyService";
import TCompanyContactEditDialog from "./TCompanyContactEditDialog";


export default {
  name: "TCompanyContactList",
  props: {
    companyId: {
      type: Number,
      required: true
    },
    operation: {
      type: Number,
      default: 3
    }
  },
  components:{
    TCompanyContactEditDialog
  },

  data() {
    return {
      selectedContactOperation: 1,
      showCompanyContactDialog: false,

      items: [
        {
          label: "Ekle",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.addNewContact();
          }
        },
        {
          label: "Güncelle",
          icon: "pi pi-fw pi-pencil",

          command: () => {

            this.updateContact();

          }

        },
        {
          label: "Sil",
          icon: "pi pi-fw pi-times",
          command: () => {
            this.deleteContact();
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




      ContactList: [],
      selectedContact: [],
      columns: [
        { field: "Id", header: "ID" },
        { field: "CompanyId", header: "Şirket Kimliği" },
        { field: "FirstName", header: "İsim" },
        { field: "LastName", header: "Soyisim" },
        { field: "Email", header: "Email" },
        { field: "Phone", header: "Phone" },
      ]

    };
  },
  methods: {
    onDataTableRightClick(event) {
      this.$refs.menu.show(event);
    },
    getContactList(){
      CompanyService.getContactList(this.companyId)
          .then((response) => {
            if (response.data.Success) {
              this.ContactList = response.data.Payload;
            }
          });
    },
    addNewContact() {
      this.selectedContact.Id = 0;
      this.selectedContactOperation = 1;
      this.showCompanyContactDialog = true;
    },
    updateContact() {
      this.selectedContactOperation = 2;
      this.showCompanyContactDialog = true;
    },


    deleteContact() {
      this.$confirm.require({
        message: "Silmek istediğinizden emin misiniz?",
        header: "Onay Ver",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          CompanyService.deleteContact(this.selectedContact.Id)
              .then((response) => {
                if (response.data.Success) {
                  this.ContactList.splice(this.ContactList.indexOf(this.selectedContact), 1);

                  this.$toast.add({ severity: "success", summary: "Silme İşlemi ", detail: "Başarılı", life: 3000 });
                }
              });
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });

    },

    closeCompanyContactDialog(refresh) {
      this.showCompanyContactDialog = false;
      if (refresh)
        this.getContactList();
    }


  },
  mounted() {

    this.getContactList();


   /* CompanyService.getCompany(this.companyId).then((response => {
      if (response.data.Success) {
        this.ContactList = response.data.Payload[0];
      }
    }));
*/

  }


};
</script>
<style scoped>
.buttonList {
  position: relative;
  float: right;

}

</style>