import 'fly-ui/style.js';
import { createApp, version } from 'vue';
import App from './App.vue';
// import {Button,Look} from 'fly-ui/index.js';
import flyui from 'fly-ui/index.js';
// eslint-disable-next-line no-console
console.log('Vue version: ', version);
const app = createApp(App);
app.use(flyui).mount('#app');
