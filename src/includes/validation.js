import {
  min_value as minValue,
  min,
  required,
  email,
  confirmed,
} from "@vee-validate/rules";
import { configure, defineRule } from "vee-validate";

defineRule("required", required);
defineRule("email", email);
defineRule("confirmed", confirmed);
defineRule("minValue", minValue);
defineRule("min", min);

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `The ${ctx.field} field is required`,
      alphaDash: `The ${ctx.field} field should contain only alphabhets and dashes`,
      email: "Invalid email address",
      integer: "Only integers are allowed",
      min: `The ${ctx.field} field must have atleast ${ctx.rule.params[0]} characters`,
      confirmed: `The ${ctx.field} & password must match`,
    };

    const message =
      messages[ctx.rule.name] || `The ${ctx.field} field is invalid`;
    return message;
  },
});
