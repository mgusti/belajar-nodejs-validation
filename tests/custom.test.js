import Joi from "joi";

describe("Joi", () => {
  it("should can create custom validation", () => {
    const registerSchema = Joi.object({
      username: Joi.string().required().min(3).max(100).email(),
      password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .custom((value, helpers) => {
          if (value.startsWith("eko")) {
            return helpers.error("password.wrong");
          } else {
            return value;
          }
        })
        .messages({
          "password.wrong": 'password cant start with "eko"',
        }),
      confirmPassword: Joi.string().required().min(6).max(100),
    })
      .custom((value, helpers) => {
        if (value.password !== value.confirmPassword) {
          return helpers.error("register.password.different");
        } else {
          return value;
        }
      })
      .messages({
        "register.password.different":
          "Password dan Konfirmasi Password tidak sama",
      });

    const request = {
      username: "eko@pzn.com",
      password: "12345eko",
      confirmPassword: "salah123",
    };
    const result = registerSchema.validate(request, {
      abortEarly: false,
    });
    console.info(result);
  });
});
