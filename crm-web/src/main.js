import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from "primevue/config";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";

import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Divider from "primevue/divider";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import ConfirmPopup from "primevue/confirmpopup";
import ContextMenu from "primevue/contextmenu";
import TabMenu from "primevue/tabmenu";
import primeflex from "primeflex/primeflex.css";
import ScrollPanel from "primevue/scrollpanel";
import Panel from "primevue/panel";
import Textarea from 'primevue/textarea';
import Dropdown from 'primevue/dropdown';
import Editor from "primevue/editor";
import Calendar from 'primevue/calendar';
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import TabPanel from "primevue/tabpanel";
import TabView from "primevue/tabview";

import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import router from './router'
const app = createApp(App);

app.use(PrimeVue);
app.component("TabView",TabView);
app.component("TabPanel",TabPanel);
app.component("Calendar",Calendar);
app.component("Editor",Editor);
app.component("Dropdown", Dropdown);
app.component("Textarea", Textarea);
app.component("Panel", Panel);
app.component("ScrollPanel", ScrollPanel);
app.component("primeflex", primeflex);
app.component("TabMenu", TabMenu);
app.component("ContextMenu", ContextMenu);
app.component("ConfirmPopup", ConfirmPopup);
app.component("Button", Button);
app.component("Dialog", Dialog);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);

app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);

app.component("InputText", InputText);

app.component("Password", Password);
app.component("Divider", Divider);

app.component("ConfirmDialog", ConfirmDialog);
app.use(ConfirmationService);

app.component("Toast", Toast);
app.use(ToastService);




app.use(router);
app.mount("#app");

