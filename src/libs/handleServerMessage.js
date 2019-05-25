//CONSTANTS
const NO_USER_FOUND = 'GraphQL error: No user found with that information';
const NO_INTERNET_CONNECTION = 'Network error: Failed to fetch';
const INFORMATIONS_UPDATED = 'Informations update success';
const ACCOUNT_ALREADY_EXISTS = 'GraphQL error: User already exists with that information';
const NOT_VALID_EMAIL = 'Email is not valid';
const SHORT_PASSWORD = 'Short password';
const SHORT_EMAIL = 'Short email';
const NOT_EQUALS_PASSWORDS = 'Not equals passwords';
const SHORT_FULLNAME = 'Short fullname';
const SHORT_COMPANYNAME = 'Short companyname';
const CAN_NOT_LOAD_DATA = 'Can not load data';
const CAN_NOT_BLOCK_COMPANY = 'Can not block company';
const COMPANY_SUCCESS_BLOCKED = 'Company successfully blocked';
const CAN_NOT_REMOVE_INVENTORY = 'Can not remove inventory';
const REMOVING_INVENTORY = 'Removing inventory';
const INVENTORY_DELETED = 'Inventory deleted';
const REGISTRATION_SUCCESSFUL = 'Registration successful';
const SUCCESSFULLY_ADDED = 'Successfully added';
const SUCCESSFULLY_EDITED = 'Successfully edited';
const SUCCESSFULLY_REMOVED = 'Successfully removed';

//FUNCTION HANDLE ERROR AND RETURN TRANSLATION MESSAGE
export const handleServerMessage = (errorMessage) => {
  switch(errorMessage) {
    case NO_USER_FOUND:
      return 'Používateľ sa nenašiel';
    case NO_INTERNET_CONNECTION:
      return 'Nepodarilo sa načítať dáta kvôli internetovému pripojeniu';
    case INFORMATIONS_UPDATED:
      return 'Informácie boli aktualizované';
    case ACCOUNT_ALREADY_EXISTS:
      return 'Tento účet už existuje';
    case NOT_VALID_EMAIL:
      return 'Zadaný email nie je validný!';
    case SHORT_PASSWORD:
      return 'Heslo musí mať aspoň 8 znakov';
    case SHORT_EMAIL:
      return 'Zadajte e-mail';
    case NOT_EQUALS_PASSWORDS:
      return 'Zadané heslá sa nezhodujú!';
    case SHORT_COMPANYNAME:
      return 'Zadajte názov spoločnosti';
    case SHORT_FULLNAME:
      return 'Zadajte svoje celé meno';
    case CAN_NOT_LOAD_DATA:
      return 'Dáta sa nepodarilo načítať, skúste znovu.';
    case CAN_NOT_BLOCK_COMPANY:
      return 'Spoločnosť sa nepodarilo zablokovať.';
    case COMPANY_SUCCESS_BLOCKED:
      return 'Stav spoločnosti bol úspšne aktualizovaný.';
    case CAN_NOT_REMOVE_INVENTORY:
      return 'Inventúru sa nepodarilo vymazať. Skúste znovu.';
    case REMOVING_INVENTORY:
      return 'Mažem dáta inventúry...';
    case INVENTORY_DELETED:
      return 'Inventúra bola úspešne vymazaná';
    case REGISTRATION_SUCCESSFUL:
      return 'Registrácia prebehla úspešne';
    case SUCCESSFULLY_ADDED:
      return 'Záznam bol úspešne pridaný';
    case SUCCESSFULLY_EDITED:
      return 'Záznam bol úspešne zmenený';
    case SUCCESSFULLY_REMOVED:
      return 'Záznam bol úspešne zmazaný';
    default:
      return 'Niečo sa pokazilo, prosím skúste znovu.';
  }
};