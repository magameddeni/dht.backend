export interface ICategory {
  id?: number
  name: string
  nesting: number
  icon?: string
  parent_id?: string
}

export interface ICategoryBrand {
  category_id: number
  brand_id: number
  id: number
}

export interface ICategoryCountryManufacturer {
  category_id: number
  country_manufacturer_id: number
  id: number
}

export interface ICategoryManufacturer {
  category_id: number
  manufacturer_id: number
  id: number
}
