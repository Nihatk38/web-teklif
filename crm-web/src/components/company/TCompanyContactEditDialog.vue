<template>
  <Dialog :modal="true" :showHeader="false" :style="{width: '50vw'}" :visible="true">
    <div class="p-d-flex p-jc-center">
      <h5 class="p-text-center">Kayıt Oluştur</h5>
      <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-field">
          <div class="p-float-label">
            <InputText id="ContactId" v-model="v$.companyContact.ContactId.$model"
                       :class="{'p-invalid':v$.companyContact.ContactId.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.companyContact.ContactId.$invalid && submitted}" for="ContactId">Unvanı</label>
          </div>
          <small v-if="(v$.companyContact.ContactId.$invalid && submitted)" class="p-error">Bir
            ünvan belirlemeniz gerekli</small>
        </div>
        <br>

        <div class="p-field">
          <div class="p-float-label p-grid ">
            <InputText id="FirstName" v-model="v$.companyContact.FirstName.$model"
                       :class="{'p-invalid':v$.companyContact.FirstName.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.companyContact.FirstName.$invalid && submitted} " for="FirstName">İsim</label>
          </div>
          <small v-if="(v$.companyContact.FirstName.$invalid && submitted)"
                 class="p-error">İsim girmeniz gerekiyor</small>
        </div>
        <br>

        <div class="p-field">
          <div class="p-float-label p-grid">
            <InputText id="LastName" v-model="v$.companyContact.LastName.$model"
                       :class="{'p-invalid':v$.companyContact.LastName.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.companyContact.LastName.$invalid && submitted}" for="LastName">Soyisim</label>
          </div>
          <small v-if="(v$.companyContact.LastName.$invalid && submitted)" class="p-error">Soyisim girmeniz gerekiyor</small>
        </div>
        <br>

        <div class="p-field">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText id="email" v-model="companyContact.Email" :class="{'p-invalid':v$.companyContact.Email.$invalid && submitted}"
                       aria-describedby="email-error" />
            <label :class="{'p-error':v$.companyContact.Email.$invalid && submitted} " for="email">Email*</label>
          </div>


          <small v-if="(v$.companyContact.Email.$invalid && submitted)"
                 class="p-error">Geçerli bir email adresi girmelisiniz</small>
        </div>
        <br>
        <div class="p-field">
          <div class="p-float-label p-grid ">
            <InputText id="Phone" v-model="v$.companyContact.Phone.$model"
                       :class="{'p-invalid':v$.companyContact.Phone.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.companyContact.Phone.$invalid && submitted} " for="Phone">Telefon Numarası</label>
          </div>
          <small v-if="(v$.companyContact.Phone.$invalid && submitted)"
                 class="p-error">Lütfen 10 haneli bir telefon numarası giriniz.</small>
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

import { email, required, minValue, maxValue} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import CompanyService from "../../services/CompanyService";

export default {
  name: "TCompanyContactEditDialog",
  props: {
    contactId: {
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


      companyContact: {
        ContactId: {
          required
        },
        FirstName: {
          required
        },
        LastName: {
          required
        },
        Email: {
          required,
          email
        },
        Phone: {
          required,
          minValue: minValue(5300000000),
          maxValue: maxValue(5600000000)

        },

      },

    };
  },
  data() {
    return {
      submitted: false,
      companyContact: {},

    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      if (this.operation === 1) {
        CompanyService.addContact(this.companyContact).then(response => {
          if (response.data.Success)
            this.closeDialog(true);
        });
      } else
        this.$confirm.require({
          message: "Düzeltmek istediğinizden emin misiniz?",
          header: "Onay Ver",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            CompanyService.updateContact(this.companyContact).then(response => {
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

    if (!this.contactId)
      return;

    CompanyService.getContact(this.companyContact).then((response => {
      if (response.data.Success) {
        this.companyContact= response.data.Payload[0];
      }
    }));


  }
};
</script>

<style scoped>

</style>