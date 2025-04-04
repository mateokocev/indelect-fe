<template>
  <v-dialog v-model="internalVisible" max-width="500">
    <v-card>
      <v-card-title class="text-h5 text-center">
        Payment for {{ museumName }}
      </v-card-title>
      <v-card-subtitle class="text-center">
        Price: ${{ price }}
      </v-card-subtitle>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="cardNumber"
            :rules="cardNumberRules"
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            required
            maxlength="19"
            @input="(val) => formatCardNumber(val)"
          ></v-text-field>
          <div class="d-flex">
            <v-text-field
              v-model="expiryDate"
              :rules="expiryDateRules"
              label="Expiry Date (MM/YY)"
              placeholder="MM/YY"
              required
              class="mr-4"
              maxlength="5"
              @input="(val) => formatExpiryDate(val)"
            ></v-text-field>
            <v-text-field
              v-model="cvv"
              :rules="cvvRules"
              label="CVV"
              placeholder="123"
              required
              maxlength="3"
              type="password"
              autocomplete="off"
            ></v-text-field>
          </div>
          <v-text-field
            v-model="cardholderName"
            :rules="nameRules"
            label="Cardholder Name"
            placeholder="John Doe"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center pb-4">
        <v-btn color="#B02E0C" text @click="closeDialog">
          Cancel
        </v-btn>
        <v-btn 
          color="#EF866F" 
          :disabled="!valid" 
          @click="processPayment"
          :loading="processing"
        >
          Pay Now
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    museumName: {
      type: String,
      default: ''
    },
    price: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      valid: false,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      processing: false,
      cardNumberRules: [
        v => !!v || 'Card number is required',
        v => (v && v.replace(/\s/g, '').length === 16) || 'Card number must be 16 digits'
      ],
      expiryDateRules: [
        v => !!v || 'Expiry date is required',
        v => (v && /^\d{2}\/\d{2}$/.test(v)) || 'Expiry date must be in MM/YY format'
      ],
      cvvRules: [
        v => !!v || 'CVV is required',
        v => (v && v.length === 3) || 'CVV must be 3 digits'
      ],
      nameRules: [
        v => !!v || 'Cardholder name is required',
        v => (v && v.length >= 3) || 'Name must be at least 3 characters'
      ]
    }
  },
  emits: ['update:visible', 'payment-successful', 'payment-failed'],
  computed: {
    internalVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  methods: {
    formatCardNumber(value) {
      if (typeof value !== 'string') return;
      let v = value.replace(/\D/g, '');
      this.cardNumber = v.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    },
    formatExpiryDate(value) {
      if (typeof value !== 'string') return;
      let v = value.replace(/\D/g, '');
      if (v.length > 2) {
        this.expiryDate = v.substring(0, 2) + '/' + v.substring(2, 4);
      } else {
        this.expiryDate = v;
      }
    },
    processPayment() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.processing = true;
      setTimeout(() => {
        this.processing = false;
        this.$emit('payment-successful');
        this.internalVisible = false;
      }, 1500);
    },
    closeDialog() {
      this.internalVisible = false;
    }
  }
}
</script>

<style scoped>
  .qr-code {
    max-width: 100%;
    height: auto;
    margin: 20px auto;
    display: block;
  }
</style>
