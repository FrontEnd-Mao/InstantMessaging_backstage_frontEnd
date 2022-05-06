//文件下放入你所需用到的组件即可，这里我是用了 Button 
import Vue from 'vue';
import { Button } from 'vant';
import { Popup } from 'vant';
import { Picker } from 'vant';
import { Cell } from 'vant';
import { Form, Field, CellGroup } from 'vant';
import { DatetimePicker } from 'vant';
import { Uploader } from 'vant';
Vue.use(Uploader);
Vue.use(DatetimePicker);
Vue.use(Cell);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Form);
Vue.use(CellGroup);
Vue.use( Button );