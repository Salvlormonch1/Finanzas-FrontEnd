/**
 * Vue Router
 * @description: Vue Router configuration
 * @docs: https://router.vuejs.org/
 */
import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../public/pages/home.component.vue";
import SignInComponent from "../iam/pages/sign-in.component.vue";
import SignUpComponent from "../iam/pages/sign-up.component.vue";
import BillsComponent from "../bills/pages/bills.component.vue";
import AddBillsComponent from "../bills/pages/add-bill.component.vue";
import BillDetailsComponent from "../bills/pages/bill-details.component.vue";
import EditBillComponent from "../bills/pages/edit-bill.component.vue";
import ReportComponent from "../bills/pages/report.component.vue";
import {authenticationGuard} from "../iam/services/authentication.guard.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/home",            name: 'home',           component: HomeComponent,           meta: { title: "Home"}},
        { path: '/sign-in',         name: 'sign-in',        component: SignInComponent,         meta: { title: 'Sign In' } },
        { path: '/sign-up',         name: 'sign-up',        component: SignUpComponent,         meta: { title: 'Sign Up' } },
        { path: '/bills',           name: 'bills',          component: BillsComponent,          meta: { title: 'Bills' } },
        { path: '/add-bill',        name: 'add-bill',       component: AddBillsComponent,       meta: { title: 'Add Bills' } },
        { path: '/report',          name: 'report',         component: ReportComponent,         meta: { title: 'Report' } },
        { path: '/bill-details/:billId',    name: 'bill-details',   component: BillDetailsComponent,    meta: { title: 'Bills Details' } },
        { path: '/edit-bill/:billId',    name: 'edit-bill',   component: EditBillComponent,    meta: { title: 'Edit Bill' } },
        { path: "/",                redirect: "/home"},
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Billetera Virtual';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    // Call the authentication guard
    authenticationGuard(to, from, next);
});

export default router;