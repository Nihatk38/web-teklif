<template>
  <Dialog :modal="true" :showHeader="false" :style="{width: '50vw'}" :visible="true">
    <div class="p-d-flex p-jc-center">
      <h5 class="p-text-center">Kayıt Oluştur</h5>
      <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-field">
          <div class="p-float-label">
            <InputText id="Name" v-model="v$.company.Name.$model"
                       :class="{'p-invalid':v$.company.Name.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.company.Name.$invalid && submitted}" for="Name">Şirket Adı</label>
          </div>
          <small v-if="(v$.company.Name.$invalid && submitted)" class="p-error">Bir
            şirket adı belirlemeniz gerekli</small>
        </div>
        <br>
        <div class="p-field">
          <div class="p-float-label">
            <InputText id="Prefix" v-model="v$.company.Prefix.$model"
                       :class="{'p-invalid':v$.company.Prefix.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.company.Prefix.$invalid && submitted}" for="Prefix">Prefix</label>
          </div>
          <small v-if="(v$.company.Prefix.$invalid && submitted)" class="p-error">Bir
            şirket adı belirlemeniz gerekli</small>
        </div>
        <br>
        <div class="p-field">
          <div class="p-float-label p-grid ">
            <InputText id="Phone" v-model="v$.company.Phone.$model"
                       :class="{'p-invalid':v$.company.Phone.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.company.Phone.$invalid && submitted} " for="Phone">Telefon Numarası</label>
          </div>
          <small v-if="(v$.company.Phone.$invalid && submitted)"
                 class="p-error">Lütfen bir telefon numarası giriniz.</small>
        </div>
        <br>

        <div class="p-field">
          <div class="p-float-label p-grid">
            <InputText id="Fax" v-model="v$.company.Fax.$model"
                       :class="{'p-invalid':v$.company.Fax.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.company.Fax.$invalid && submitted}" for="Fax">Fax</label>
          </div>
          <small v-if="(v$.company.Fax.$invalid && submitted)" class="p-error">Fax numarası giriniz.</small>
        </div>
        <br>
        <div class="p-field">
          <div class="p-float-label p-grid">

            <Textarea id="Address" v-model="company.Address" rows="5" cols="30" />
            <label for="Address">Address</label>
          </div>
        </div>



        <br>
        <br>
        <Button class="p-mt-2" label="Kaydet" type="submit"></Button>
        <Button class="p-mt-2" label="Kapat" @click="closeDialog"></Button>


      </form>
    </div>
  </Dialog>
</template>

<script>
import CompanyService from "../../services/CompanyService";
import {numeric, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "TCompanyEditDialog",
  props: {
    companyId: {
      type: Number,
      required: true
    },
    operation: {
      type: Number,
      required: true
    },
    closeDialog: {
      type: Function,
      required: true
    }
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {


      company: {
        Name:{
          required
        },
        Prefix:{
          required
        },
        Phone: {
          required,numeric


        },
        Fax: {
          required
        },
        Address: {
          required,

        },

      },

    };
  },
  data() {
    return {
      submitted: false,
      company: {},

    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      if (this.operation === 1) {
        CompanyService.addCompany(this.company).then(response => {
          if (response.data.Success)
            this.closeDialog(true);
        });
      } else
        this.$confirm.require({
          message: "Düzeltmek istediğinizden emin misiniz?",
          header: "Onay Ver",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            CompanyService.updateCompany(this.company).then(response => {
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


    }
  },
  mounted() {

    if (this.operation === 1)
      return;

    if (!this.companyId)
      return;

    CompanyService.getCompany(this.companyId).then((response => {
      if (response.data.Success) {
        this.company = response.data.Payload[0];
      }
    }));


  }
};
</script>

<style scoped>

</style>