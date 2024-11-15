<script lang="ts">
import { useRouter } from "vue-router";
import { BillApiService } from "../services/bill-api.service.js";
import { Bill } from "../model/bill.entity.js";
import { useAuthenticationStore } from "../../iam/services/authentication.store.js";
import BillCancelledCardComponent from "../components/bill-cancelled-card.component.vue";

export default {
  name: "report",
  components: { BillCancelledCardComponent },
  data() {
    return {
      router: useRouter(),
      bills: [],
      bill: {},
      billsApi: null,
      eac: 0,
      vf: 0,
      eacTimesVfAdd: 0,
      vfAdd: 0,
      totalEac: 0,
      authenticationStore: useAuthenticationStore()
    };
  },
  created() {
    this.billsApi = new BillApiService();

    this.billsApi.getCancelledBills(this.currentUserId).then((response) => {
      let bills = response.data;
      this.bills = bills.map((bill) => Bill.toDisplayableBill(bill));

      this.calculateTotalEac();
    });
  },
  computed: {
    currentUserId() {
      return this.authenticationStore.currentUserId;
    }
  },
  methods: {
    async calculateTotalEac() {
      this.eacTimesVfAdd = 0;
      this.vfAdd = 0;

      for (let bill of this.bills) {
        const eacResponse = await this.billsApi.getBillEac(bill.id);
        const vfResponse = await this.billsApi.getBillFinalValue(bill.id);

        const eac = eacResponse.data;
        const vf = vfResponse.data;

        this.eacTimesVfAdd += eac * vf;
        this.vfAdd += vf;
      }
      this.totalEac = this.eacTimesVfAdd / this.vfAdd;
    }
  }
};
</script>

<template>
  <div class="full-container">
    <h1>Reporte de facturas canceladas</h1>
    <div class="card-container">
      <bill-cancelled-card-component v-for="bill in bills" :key="bill.id" :bill="bill"/>
    </div>
    <h1>Tasa de Coste Efectiva Anual (TCEA) total de la cartera: {{ totalEac.toFixed(7) }}%</h1>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  height: 70%;
}

.full-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-image: url('https://movypay.com/wp-content/uploads/2019/10/Fotolia_182043508_Subscription_Monthly_M.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow-y: auto;
}

h1 {
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid white;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  font-size: 1.8rem;
}
</style>
