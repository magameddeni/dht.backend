import { checkSchema } from "express-validator"
import { createAttributesValidate } from "../attributes/validate.schema"
import { createFileValidate } from "../files/validate.schema"

export const createProductValidateSchema = checkSchema({
  ...createAttributesValidate,
  ...createFileValidate,
  "attributes.*.value": {
    notEmpty: true,
    isString: {
      bail: true,
      errorMessage: "Поле значение характеристики должно быть заполнено",
    },
  },
  brand_name: {
    isString: { bail: true, errorMessage: "'Бренд' обязательное поле" },
  },
  manufacturer_name: {
    isString: { bail: true, errorMessage: "'Производитель' обязательное поле" },
  },
  country_manufacturer: {
    isString: {
      bail: true,
      errorMessage: "'Страна производитель' обязательное поле",
    },
  },
  category_id: {
    isInt: {
      bail: true,
      errorMessage: "id категории не может быть пустым",
    },
    toInt: true,
  },
  seller_id: {
    isInt: {
      bail: true,
      errorMessage: "id магазина не может быть пустым",
    },
    toInt: true,
  },
  description: {
    isString: {
      bail: true,
      errorMessage: "Описание товара не может быть пустым",
    },
    isLength: {
      errorMessage: "Длина описание товара не может быть меньше 20 символово",
      options: { min: 20 },
    },
  },
  weight: {
    isInt: {
      errorMessage: '"Вес" не может быть равно нулю',
      options: { min: 1 },
    },
  },
  height: {
    isInt: {
      errorMessage: '"Высота" не может быть равно нулю',
      options: { min: 1 },
    },
  },
  length: {
    isInt: {
      errorMessage: '"Длина" не может быть равно нулю',
      options: { min: 1 },
    },
  },
  width: {
    isInt: {
      errorMessage: '"Ширина" не может быть равно нулю',
      options: { min: 1 },
    },
  },
  base_price: {
    isInt: {
      options: { min: 1 },
    },
  },
  stock_quantity: {
    isInt: {
      options: { min: 0 },
    },
  },
  color_name: {
    isString: true,
    isLength: {
      options: { min: 5 },
    },
  },
  color_hex: {
    isHexColor: {
      bail: true,
      errorMessage: "Цвет товара должен быть в hex-формате",
    },
  },
})
