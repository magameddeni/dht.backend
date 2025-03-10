import { checkSchema } from "express-validator"

export const createAttributesValidate = {
  attributes: {
    isArray: {
      errorMessage: "Поле характеристики должен быть массивом",
      bail: true,
      options: {
        min: 1,
      },
    },
  },
  "attributes.*.attribute_name": {
    notEmpty: true,
    isLength: {
      errorMessage: "Длина названия аттрибута не может быть меньше 3 символово",
      options: { min: 3 },
    },
  },
  "attributes.*.data_type": {
    notEmpty: true,
    isString: {
      bail: true,
      errorMessage: 'Поле "Тип строки" не может быть пустым',
    },
    isIn: {
      options: [["string", "number", "boolean"]],
      errorMessage: 'Не подходящий тип для поля "Тип строки"',
    },
  },
  "attributes.*.required": {
    notEmpty: true,
    isBoolean: {
      bail: true,
      errorMessage:
        "Поле required может принимать только булевые значения. true/false",
    },
  },
}

export const createAttributesValidateSchema = checkSchema({
  "parent_category.id": {
    notEmpty: {
      bail: true,
      errorMessage: "Поле id категории не может быть пустым",
    },
    toInt: true,
  },
  ...createAttributesValidate,
})

export const getAttributesSchema = checkSchema({
  categoryId: {
    notEmpty: true,
    isString: {
      bail: true,
      errorMessage: "Нужно обязательно передать id категории",
    },
    in: ["params"],
  },
})
