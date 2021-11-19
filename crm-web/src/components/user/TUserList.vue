<template>
  <div>
    <div class="buttonList">
      <Button icon="pi pi-user-plus" label="Kullanıcı oluştur" @click="addNewUser" />
      <Button :disabled="selected.length === 0" icon="pi pi-user-edit" label="Güncelle" @click="updateUser" />
      <Button :disabled="selected.length===0" icon="pi pi-times" label="Sil" @click="deleteUser" />
    </div>
    <br>
    <br>
    <div>
      <DataTable v-model:selection="selected"
                 :value="Payload"
                 aria-haspopup="true" data-keys="id" selection-mode="single" tabindex="-1"
                 @contextmenu="onDataTableRightClick">
        <Column v-for="key in columns" :key="key" :field="key.field" :header="key.header">
        </Column>
        <ContextMenu ref="menu" :model="items" />
      </DataTable>
    </div>
    <t-user-edit-dialog v-if="showUserDialog"
                        :close-dialog="closeUserDialog"
                        :operation="selectedOperation"
                        :user-id="selected.Id"></t-user-edit-dialog>
  </div>
</template>
<script>


import UserService from "../../services/UserService";
import TUserEditDialog from "./TUserEditDialog";


export default {
  components: {
    TUserEditDialog


  },

  data() {
    return {
      selectedOperation: 1,
      showUserDialog: false,

      items: [
        {
          label: "Ekle",
          icon: "pi pi-fw pi-plus",
          command: () => {
            this.addNewUser();
          }
        },
        {
          label: "Güncelle",
          icon: "pi pi-fw pi-pencil",

          command: () => {

            this.updateUser();

          }

        },
        {
          label: "Sil",
          icon: "pi pi-fw pi-times",
          command: () => {
            this.deleteUser();
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


      Payload: [],
      selected: [],
      columns: [
        { field: "Id", header: "ID" },
        { field: "UserName", header: "Username" },
        { field: "FirstName", header: "Name" },
        { field: "LastName", header: "Surname" },
        { field: "Email", header: "Email" },
        { field: "Role", header: "Role" },

        { field: "Password", header: "Password" }

      ]

    };
  },
  methods: {
    onDataTableRightClick(event) {
      this.$refs.menu.show(event);
    },
    getUsers() {
      UserService.getUserList()
          .then((response) => {
            if (response.data.Success) {
              this.Payload = response.data.Payload;
            }
          });
    },
    addNewUser() {
      this.selected.Id = 0;
      this.selectedOperation = 1;
      this.showUserDialog = true;
    },
    updateUser() {
      this.selectedOperation = 2;
      this.showUserDialog = true;
    },
    deleteUser() {
      this.$confirm.require({
        message: "Silmek istediğinizden emin misiniz?",
        header: "Onay Ver",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          UserService.deleteUser(this.selected.Id)
              .then((response) => {
                if (response.data.Success) {
                  this.Payload.splice(this.Payload.indexOf(this.selected), 1);

                  this.$toast.add({ severity: "success", summary: "Silme İşlemi ", detail: "Başarılı", life: 3000 });
                }
              });
        },
        reject: () => {
          //callback to execute when user rejects the action
        }
      });

    },

    closeUserDialog(refresh) {
      this.showUserDialog = false;
      if (refresh)
        this.getUsers();
    }


  },
  mounted() {

    this.getUsers();


  }


};
</script>
<style scoped>
.buttonList {
  position: relative;
  float: right;

}

</style>