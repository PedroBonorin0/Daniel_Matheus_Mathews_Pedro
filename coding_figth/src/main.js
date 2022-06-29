import { createApp } from 'vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';
import { initializeApp } from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';

const firebaseConfig = {
  apiKey: 'AIzaSyCUkdOdaxFqrP3B4tQar5sBNkCCL5Hu_LM',
  authDomain: 'coding-fight.firebaseapp.com',
  databaseURL: 'https://coding-fight-default-rtdb.firebaseio.com',
  projectId: 'coding-fight',
  storageBucket: 'coding-fight.appspot.com',
  messagingSenderId: '1095265696059',
  appId: '1:1095265696059:web:16cd6ea44040eed996df1e',
  measurementId: 'G-1KVR7R2T66',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);

app.use(store).use(router);

app.component('BaseCard', BaseCard);
app.component('BaseButton', BaseButton);
app.component('BaseDialog', BaseDialog);

app.mount('#app');
