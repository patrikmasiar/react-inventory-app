// USER
import {
  signinUser,createUser, allCompanyUsers, deleteUser, userDetail, updateUser, updateBlockUserStatus
} from './user.gquery';

// COMPANY
import {
  createCompany, company, updateAddress, createAddress, updateCompany, allCompanies, updateCompanyBlockStatus, companyDataForImport,
} from './company.gquery';

// OFFICE
import {
  allCompanyOffices, officeInfo, deleteOffice, updateOffice,
} from './office.gquery';

// OFFICE ROOMS
import {
  allOfficeRooms, createOfficeRoom, deleteOfficeRoom, officeRoomInfo, updateOfficeRoom
} from './officerooms.gquery';

// CUSTOMER
import {
  allCompanyCustomers, createCustomer, deleteCustomer, customerInfo, updateCustomer,
} from './customer.gquery';

// INVENTORY
import {
  allCompanyInventories, createInventory, inventoryDetail, updateInventoryAvailable, updateInventoryClosed,
  deleteInventory, userInventories, updateInventoryGeneralData,
} from './inventory.gquery';

// PROPERTY
import {
  createProperty,
} from './property.gquery';

export {
  userDetail,
  updateUser,
  signinUser,
  createUser,
  allCompanyUsers,
  deleteUser,
  createCompany,
  company,
  updateAddress,
  createAddress,
  updateCompany,
  allCompanyOffices,
  officeInfo,
  allOfficeRooms,
  createOfficeRoom,
  deleteOffice,
  updateOffice,
  deleteOfficeRoom,
  allCompanyCustomers,
  createCustomer,
  deleteCustomer,
  allCompanyInventories,
  createInventory,
  inventoryDetail,
  createProperty,
  officeRoomInfo,
  updateOfficeRoom,
  customerInfo,
  updateCustomer,
  allCompanies,
  updateCompanyBlockStatus,
  updateBlockUserStatus,
  updateInventoryAvailable,
  updateInventoryClosed,
  deleteInventory,
  companyDataForImport,
  userInventories,
  updateInventoryGeneralData,
};