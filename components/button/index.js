import Button from './button';

Button.install = function (app) {
  app.component(Button.name, Button);
};

export default Button;
