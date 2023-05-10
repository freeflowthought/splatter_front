<template>
  <v-main id="login">
    <v-window v-model="windowStep">
      <!-- login window -->
      <v-window-item id="login-window" :value="1">
        <section>
          <img src="~/assets/sources/logos/logo.svg" alt="logo" class="mb-16" style="--w: max(150px, 13em)">

          <v-form
            ref="formLogin" class="card divcol"
            style="--bg: var(--primary); --w: 100%; gap: 1em"
            @submit.prevent="login()"
          >
            <div class="divcol" style="gap: .5em">
              <label for="username-login">USUARIO:</label>
              <v-text-field
                id="username-login"
                v-model="formLogin.username"
                :rules="rules.required"
                placeholder="Ingresa tu usuario"
                hide-details solo
              ></v-text-field>
            </div>
            
            <div class="divcol" style="gap: .5em">
              <label for="password-login">CONTRASEÑA:</label>
              <v-text-field
                id="password-login"
                v-model="formLogin.password"
                type="password"
                :rules="rules.required"
                placeholder="Ingresa tu contraseña"
                hide-details solo
              ></v-text-field>
            </div>
            
            <v-btn
              class="btn align" style="--bg: var(--active)"
              @click="login()">
              Iniciar sesión
            </v-btn>
          </v-form>

          <aside class="divcol center tcenter" style="gap: inherit; --fs: max(15px, 1.25em)">
            <a style="--fw: 800" @click="windowStep = 3">
              ¿Olvidaste tu contraseña?
            </a>

            <span class="hspan divcol center">
              ¿No tienes cuenta?
              <a style="--fw: 800; --fs: 1em" @click="windowStep = 2">Registrate aquí</a>
            </span>
          </aside>
        </section>
      </v-window-item>


      <!-- register window -->
      <v-window-item id="register-window" :value="2">
        <section>
          <img src="~/assets/sources/logos/logo.svg" alt="logo" class="mb-10" style="--w: max(190px, 17em)">

          <v-form ref="formRegister" class="fill_w divcol" style="gap: 1em">
            <div class="divcol" style="gap: .5em">
              <label for="email-register">CORREO <sup>*</sup></label>
              <v-text-field
                id="email-register"
                v-model="formRegister.email"
                solo hide-details
                :rules="rules.email"
              ></v-text-field>
            </div>
            
            <div class="divcol" style="gap: .5em">
              <label class="relative" for="username-register">USUARIO <sup>*</sup></label>
              <v-text-field
                id="username-register"
                v-model="formRegister.username"
                solo hide-details
                :rules="rules.required"
              ></v-text-field>
            </div>
            
            <div class="divcol" style="gap: inherit">
              <div class="divcol" style="gap: .5em">
                <label class="relative" for="password-register">CONTRASEÑA <sup>*</sup></label>
                <v-text-field
                  :id="formRegister.password ? '' : 'password-register'"
                  v-model="formRegister.password"
                  type="password"
                  solo hide-details
                  :rules="rules.required"
                ></v-text-field>
              </div>
              
              <v-text-field
                :id="formRegister.password ? 'password-register' : ''"
                v-model="passwordConfirmerRegister"
                type="password"
                solo hide-details
                :rules="rules.confirmPasswordRegister"
              ></v-text-field>
            </div>
            
            <div class="divcol" style="gap: .5em">
              <label for="partner-register">PATROCINADOR</label>
              <v-text-field
                id="partner-register"
                v-model="formRegister.partner"
                solo hide-details
              ></v-text-field>
            </div>
            
            <div class="divcol" style="gap: .5em">
              <label for="phone-register">TELÉFONO <sup>*</sup></label>
              <v-text-field
                id="phone-register"
                v-model="formRegister.phone"
                type="number"
                hide-spin-buttons
                solo hide-details
                :rules="rules.required"
              >
                <template #prepend>
                  <v-select
                    v-model="formRegister.phonePrefix"
                    :items="countryPhoneList"
                    item-text="number"
                    solo hide-details
                    menu-props="auto"
                    append-icon="mdi-chevron-down"
                  >
                    <template #selection="{ item }">
                      <img :src="item.icon" alt="country flag" class="mr-2 aspect" style="--w: 22px; --of: cover; --br: 50%; --b: 1px solid #fff">
                      <span style="--fw: 100">{{item.number}}</span>
                    </template>
                    
                    <template #item="{ item }">
                      <img :src="item.icon" alt="country flag" class="mr-2 aspect" style="--w: 22px; --of: cover; --br: 50%; --b: 1px solid #fff">
                      <span class="not_clr" style="--fw: 100">{{item.number}}</span>
                    </template>
                  </v-select>
                </template>
              </v-text-field>
            </div>
            
            <v-btn
              class="btn align mt-5" style="--bg: var(--primary)"
              @click="register()">
              REGISTER
            </v-btn>
          </v-form>
        </section>
      </v-window-item>


      <!-- recover window -->
      <v-window-item id="login-window" :value="3">
        <section>
          <img src="~/assets/sources/logos/logo.svg" alt="logo" class="mb-10" style="--w: max(190px, 17em)">

          <v-form
            ref="formRecover" class="card divcol"
            style="--bg: var(--primary); --w: 100%; gap: 1em"
            @submit.prevent="recover()"
          >
            <div class="divcol" style="gap: .5em">
              <label class="relative" for="password-recover">NUEVA CONTRASEÑA:</label>
              <v-text-field
                id="password-recover"
                v-model="formRecover.password"
                type="password"
                :rules="rules.required"
                placeholder="Ingresa nueva contraseña"
                hide-details solo
              ></v-text-field>
            </div>
            
            <div class="divcol" style="gap: .5em">
              <label for="confirm-password-recover">CONFIRMAR CONTRASEÑA:</label>
              <v-text-field
                id="confirm-password-login"
                v-model="passwordConfirmerRecover"
                type="password"
                :rules="rules.confirmPasswordRecover"
                placeholder="Confirma contraseña"
                hide-details solo
              ></v-text-field>
            </div>
            
            <v-btn
              class="btn align" style="--bg: var(--active)"
              @click="recover()">
              Recuperar
            </v-btn>
          </v-form>
        </section>
      </v-window-item>
    </v-window>
  </v-main>
</template>

<script>
export default {
  name: "LoginPage",
  layout: "empty-layout",
  data() {
    return {
      windowStep: 1,
      formLogin: {
        username: undefined,
        password: undefined,
      },
      formRegister: {
        email: undefined,
        username: undefined,
        password: undefined,
        partner: undefined,
        phonePrefix: "+593",
        phone: undefined,
      },
      passwordConfirmerRegister: undefined,
      formRecover: {
        password: undefined,
      },
      passwordConfirmerRecover: undefined,
      countryPhoneList: [
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Flag_of_the_First_Spanish_Republic.svg/220px-Flag_of_the_First_Spanish_Republic.svg.png",
          number: "+593",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Flag_of_Venezuela.svg/2560px-Flag_of_Venezuela.svg.png",
          number: "+58",
        },
        {
          icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png",
          number: "+2134",
        },
      ],
      rules: {
        required: [(v) => !!v || "Field required"],
        email: [
          (v) => !!v || "Field required",
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        confirmPasswordRegister: [
          (v) => !!v || "Field required",
          v => this.formRegister.password === this.passwordConfirmerRegister || 'Password must match',
        ],
        confirmPasswordRecover: [
          (v) => !!v || "Field required",
          v => this.formRecover.password === this.passwordConfirmerRecover || 'Password must match',
        ],
      }
    }
  },
  head() {
    const title = 'Login';
    return {
      title,
    }
  },
  // mounted() {
  //   this.$targetTooltip('.modalSettings img[alt="info"]')
  //   window.addEventListener("resize", () => this.$targetTooltip('.modalSettings img[alt="info"]', 13))
  // },
  methods: {
    login() {
      if (!this.$refs.formLogin.validate()) return alert("verifica que los campos sean correctos");
      localStorage.setItem("auth", true)
      this.$router.push(this.basePath('/'))
    },
    register() {
      if (!this.$refs.formRegister.validate()) return alert("verifica que los campos sean correctos");
      localStorage.setItem("auth", true)
      this.$router.push(this.basePath('/'))
    },
    recover() {
      if (!this.$refs.formRecover.validate()) return alert("verifica que los campos sean correctos");
      console.log("recovered")
      this.$alert("success", {title: "recovered"})
      this.$router.go()
    }
  }
}
</script>

<style src="~/assets/styles/pages/login.scss" lang="scss" />
