import { default as Button } from './button';
import { default as Look } from './look';
const components = [Button,Look];
const install = function (app) {
  components.map((component) => {
    app.use(component);
  });
};
export default {
  install,
};
export { Button };
export { Look };
