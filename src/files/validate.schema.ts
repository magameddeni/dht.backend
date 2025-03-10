import { checkSchema } from "express-validator"

export const createFileValidate = {
  files: {
    isArray: {
      errorMessage: "Должно присуствовать хотя бы одно изображение",
      bail: true,
      options: {
        min: 1,
      },
    },
  },
  "files.*.file_type": {
    notEmpty: true,
    isMimeType: true,
    isString: {
      bail: true,
      errorMessage: 'Поле "Тип файла" не может быть пустым',
    },
  },
  "files.*.file_key": {
    notEmpty: true,
    isString: {
      bail: true,
      errorMessage: 'Поле "Ключ файлы" не может быть пустым',
    },
  },
  "files.*.file_link": {
    notEmpty: true,
    isString: {
      bail: true,
      errorMessage: 'Поле "Ссылка на файл" не может быть пустым',
    },
  },
  "files.*.file_order": {
    isInt: {
      bail: true,
      errorMessage: "Индекс файла должен быть числом",
    },
  },
}
export const createFileValidateSchem = checkSchema(createFileValidate)
