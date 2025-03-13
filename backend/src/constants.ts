export const MONGO_ID_REGEX = /^[a-f\d]{24}$/;

export const DATE_REGEX = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

export const TIME_REGEX = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const MIN_DATE = new Date("2025-01-01").getTime();

export const EMAIL_REGEX =
  /^[a-zñ\d]+(.[_a-zñ\d]+)*@[a-zñ\d-]+(.[a-zñ\d-]+)*(.[a-zñ]{2,15})$/i;
