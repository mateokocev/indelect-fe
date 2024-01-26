<script setup>

</script>

<template>
  <v-img
    class="mx-auto"
    max-width="228"
    :src="'https://cdn.discordapp.com/attachments/913519250872881233/1200473327085555783/Screenshot_2024-01-09_at_00.53.45.png?ex=65c64ee8&is=65b3d9e8&hm=282c381b6904fdde1699c2c0cf8a9e23e4115d4ec3c52025f994756f7deab363'"
  ></v-img>
  <div class="center-container">
    <v-card
      class="mx-auto"
      style="max-width: 500px;"
    >
      <v-toolbar
        color="#EB4511"
        cards
        dark
        flat
      >
        <v-btn icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-card-title class="text-h6 font-weight-regular">
          Sign up
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form
        ref="form"
        v-model="isValid"
        class="pa-4 pt-6"
      >
        <v-text-field
          v-model="email"
          :rules="[rules.email]"
          variant="filled"
          color="#B02E0C"
          label="Email address"
          type="email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
          variant="filled"
          color="#EB4511"
          counter="6"
          label="Password"
          style="min-height: 96px"
          type="password"
        ></v-text-field>
        <v-checkbox
          v-model="agreement"
          :rules="[rules.required]"
          color="#B02E0C"
        >
          <template v-slot:label>
            I agree to the&nbsp;
            <a
              href="#"
              @click.stop.prevent="dialog = true"
            >Terms of Service</a>
            &nbsp;and&nbsp;
            <a
              href="#"
              @click.stop.prevent="dialog = true"
            >Privacy Policy</a>*
          </template>
        </v-checkbox>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          variant="text"
          @click="form.reset()"
        >
          Clear
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!isValid"
          :loading="isLoading"
          color="#8EB1C7"
        >
          Submit
        </v-btn>
      </v-card-actions>
      <v-dialog
        v-model="dialog"
        max-width="400"
        persistent
      >
        <v-card>
          <v-card-title class="text-h5 bg-grey-lighten-3">
            Legal
          </v-card-title>
          <v-card-text>
            Nista jos kume
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              variant="text"
              @click="agreement = false, dialog = false"
            >
              No
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="#8EB1C7"
              variant="tonal"
              @click="agreement = true, dialog = false"
            >
              Yes
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      agreement: false,
      dialog: false,
      email: undefined,
      isValid: false,
      isLoading: false,
      password: undefined,
      phone: undefined,
      rules: {
        email: v => !!(v || '').match(/@/) || 'Please enter a valid email',
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
    }),
  }
</script>

<style scoped>

</style>
