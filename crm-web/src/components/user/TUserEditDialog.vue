<template>
  <Dialog :modal="true" :showHeader="false" :style="{width: '50vw'}" :visible="true">
    <div class="p-d-flex p-jc-center">
      <h5 class="p-text-center">Kayıt Oluştur</h5>
      <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-field">
          <div class="p-float-label">
            <InputText id="UserName" v-model="v$.user.UserName.$model"
                       :class="{'p-invalid':v$.user.UserName.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.user.UserName.$invalid && submitted}" for="UserName">Kullanıcı Adı</label>
          </div>
          <small v-if="(v$.user.UserName.$invalid && submitted)" class="p-error">Bir
            kullanıcı adı belirlemeniz gerekli</small>
        </div>
        <br>

        <div class="p-field">
          <div class="p-float-label p-grid ">
            <InputText id="FirstName" v-model="v$.user.FirstName.$model"
                       :class="{'p-invalid':v$.user.FirstName.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.user.FirstName.$invalid && submitted} " for="FirstName">İsim</label>
          </div>
          <small v-if="(v$.user.FirstName.$invalid && submitted)"
                 class="p-error">İsim girmeniz gerekiyor</small>
        </div>
        <br>

        <div class="p-field">
          <div class="p-float-label p-grid">
            <InputText id="LastName" v-model="v$.user.LastName.$model"
                       :class="{'p-invalid':v$.user.LastName.$invalid && submitted}" type="text" />
            <label :class="{'p-error':v$.user.LastName.$invalid && submitted}" for="LastName">Soyisim</label>
          </div>
          <small v-if="(v$.user.LastName.$invalid && submitted)" class="p-error">Soyisim girmeniz gerekiyor</small>
        </div>
        <br>

        <div class="p-field">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText id="email" v-model="user.Email" :class="{'p-invalid':v$.user.Email.$invalid && submitted}"
                       aria-describedby="email-error" />
            <label :class="{'p-error':v$.user.Email.$invalid && submitted} " for="email">Email*</label>
          </div>


          <small v-if="(v$.user.Email.$invalid && submitted)"
                 class="p-error">Geçerli bir email adresi girmelisiniz</small>
        </div>
        <br>

        <div v-if="operation===1" class="p-field">
          <div class="p-float-label">
            <Password id="Password" v-model="v$.user.Password.$model"
                      :class="{'p-invalid':v$.user.Password.$invalid && submitted}"
                      toggleMask>
              <template #header>
                <h6>Parola giriniz</h6>
              </template>
              <template #footer>
                <Divider />
                <p class="p-mt-2">Öneriler</p>
                <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
                  <li>En az bir küçük harf</li>
                  <li>En az bir büyük harf</li>
                  <li>En az bir rakam</li>
                  <li>Minimum 8 karakter</li>
                </ul>
              </template>
              <br>

            </Password>
            <label :class="{'p-error':v$.user.Password.$invalid && submitted } "
                   for="Password">Parola</label>

          </div>
          <small v-if="(v$.user.Password.$invalid && submitted)"
                 class="p-error">Bir Parola belirlemelisiniz!</small>

        </div>
        <br>
        <div v-if="operation === 1" class="p-field">
          <div class="p-float-label">
            <Password id="PasswordConfirmation" v-model="v$.PasswordConfirmation.$model"

                      :feedback="false" />
            <label
                for="PasswordConfirmation">Parola
              doğrulama</label>
          </div>
          <small v-if="((v$.PasswordConfirmation.$model) !== (v$.user.Password.$model))&&submitted" class="p-error">Parolalar
            aynı değil</small>
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
import UserService from "../../services/UserService";
import { email, required, requiredIf } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "TUserEditDialog",
  props: {
    userId: {
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


      user: {
        UserName: {
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
        Password: {
          requiredPassword: requiredIf(this.operation === 1)
        }
      },
      PasswordConfirmation: {
        requiredPasswordConfirmation: requiredIf(this.operation === 1)
      }
    };
  },
  data() {
    return {
      submitted: false,
      user: {},
      PasswordConfirmation: null
    };
  },
  methods: {
    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }

      if (this.operation === 1) {
        UserService.addUser(this.user).then(response => {
          if (response.data.Success)
            this.closeDialog(true);
        });
      } else
        this.$confirm.require({
          message: "Düzeltmek istediğinizden emin misiniz?",
          header: "Onay Ver",
          icon: "pi pi-exclamation-triangle",
          accept: () => {
            UserService.updateUser(this.user).then(response => {
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

    if (!this.userId)
      return;

    UserService.getUser(this.userId).then((response => {
      if (response.data.Success) {
        this.user = response.data.Payload[0];
      }
    }));


  }
};
</script>

<style scoped>

</style>