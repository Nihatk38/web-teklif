import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home";
import TUserList from "../components/user/TUserList";
import TOfferList from "../components/offer/TOfferList";
import TCompanyList from "../components/company/TCompanyList";
import TCreateOffer from "../components/offer/TCreateOffer";

import TUserEditDialog from "../components/user/TUserEditDialog";
import TCompanyContactList from "../components/company/TCompanyContactList";

const routes = [
  { path: "/", name: "homepage", component: Home },

  { path: "/UserList", component: TUserList, name: "UserList" },
  {
    path: "/EditUser",
    component: TUserEditDialog,
    name: "TUserEditDialog",
    props: (route) => ({
      userId: Number(route.params.userId),
      operation: Number(route.params.operation),
    }),
  },

  { path: "/OfferList", component: TOfferList, name: "OfferList" },
  {path: "/OfferCreate",component: TCreateOffer , name: "OfferCreate", props: (route) => ({ offerId: Number(route.params.offerId), operation: Number(route.params.operation) })},
  {path: "/OfferCreate",component: TCreateOffer , name: "OfferUpdate"},



  { path: "/CompanyList", component: TCompanyList },
  {path: "/CompanyContact",component: TCompanyContactList , name: "CompanyContact", props: (route) => ({ companyId: Number(route.params.companyId), operation: Number(route.params.operation) })},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
