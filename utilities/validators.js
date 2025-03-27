export const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const mobileReg = /^\+[1-9]{1}[0-9]{3,14}$/;
export const characterReg = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
export const digits = /^[0-9]+$/;
export const digitWithDot = /^[0-9]+(\.[0-9]+)?$/;
export const phoneRegex = /^\d{10}$/;
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/;
