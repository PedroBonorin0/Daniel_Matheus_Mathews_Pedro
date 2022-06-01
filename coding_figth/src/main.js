import { createApp } from 'vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store).use(router);

app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);

app.mount('#app');
