const { productVarList, supplierList, orderList, userList } = require("../database");
const { Roles } = require("../constant");
const _ = require("lodash");

const getElementByIndexArr = (input_list, index_arr) => {
  if (!Array.isArray(index_arr)) {
    return [];
  }
  let result = [];
  input_list.forEach((element) => {
    if (index_arr.includes(element.id)) {
      result.push(element);
    }
  });
  return result;
};

const processProductVar = (productVar) => {
  productVar.orders = getElementByIndexArr(orderList, productVar.orders);
  productVar.supplier =
    productVar.supplier != null
      ? getElementByIndexArr(supplierList, [productVar.supplier])[0]
      : null;
  return productVar;
};

const processProduct = (product) => {
  product.variations = getElementByIndexArr(productVarList, product.variations);
  product.variations.forEach((productVar, index) => {
    let temp = _.cloneDeep(product.variations[index]);
    product.variations[index] = processProductVar(temp);
  });
  product.createdBy = getElementByIndexArr(userList, [product.createdBy])[0].name;
  return product;
};

const processSupplier = (supplier) => {
  supplier.products = getElementByIndexArr(productVarList, supplier.products);
  supplier.products.forEach((productVar, index) => {
    let temp = _.cloneDeep(supplier.products[index]);
    supplier.products[index] = processProductVar(temp);
  });
  return supplier;
};

const processUser = (user) => {
  delete user.password;
  Object.keys(Roles).forEach((Role_key) => {
    if (user.role === Roles[Role_key].id) user.role = Role_key;
  });
  return user;
};

const processList = (list, obj) => {
  let targetFunc = null;
  let cloneList = _.cloneDeep(list);
  switch (obj) {
    case "product":
      targetFunc = processProduct;
      break;
    case "productVar":
      targetFunc = processProductVar;
      break;
    case "supplier":
      targetFunc = processSupplier;
      break;
    case "user":
      targetFunc = processUser;
      break;
    default:
      return [];
  }
  return cloneList.map((element) => {
    let cloneElement = _.cloneDeep(element);
    return targetFunc(cloneElement);
  });
};

const filterData = (list, filters) => {
  let result = _.cloneDeep(list);
  filters.forEach((filter) => {
    result = result.filter((element) => element[filter.key] === filter.value);
  });
  return result;
};

module.exports = {
  processList,
  filterData,
};
