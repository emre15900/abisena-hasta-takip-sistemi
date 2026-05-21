export enum BloodType {
  A_POS = 'A+',
  A_NEG = 'A-',
  B_POS = 'B+',
  B_NEG = 'B-',
  AB_POS = 'AB+',
  AB_NEG = 'AB-',
  O_POS = '0+',
  O_NEG = '0-',
}

export const BLOOD_TYPE_VALUES = Object.values(BloodType) as BloodType[]
