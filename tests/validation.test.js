import Joi from "joi";

describe("Joi", () => {
  it("should can create schema", () => {
    const schema = Joi.string().min(3).max(100).required();

    const result = schema.validate("eko");

    if (result.error) {
      console.info(result.error);
    }
  });

  it.only("should can validate basic data type", () => {
    const usernameSchema = Joi.string().email().required();
    const isAdminSchema = Joi.boolean().required();
    const priceSchema = Joi.number().required().min(1000).max(1000000);

    const resultUsername = usernameSchema.validate("eko@pzn.com");
    console.info(resultUsername);

    const resultIsAdminSchema = isAdminSchema.validate("true");
    console.info(resultIsAdminSchema);

    console.info(typeof "true");
    console.info(typeof resultIsAdminSchema.value);
    console.info(typeof resultIsAdminSchema.error);

    const resultPriceSchema = priceSchema.validate("10000");
    console.info(resultPriceSchema);
  });
});
