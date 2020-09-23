const Permissions = {
  Create_User: 1,
  Update_User: 2,
  Delete_User: 3,
  Create_Product: 4,
  Update_Product: 5,
  Delete_Product: 6,
};

const ResponseCode = {
  //Success
  Login_success: { code: 200, msg: "Login successfully." },
  Register_success: { code: 200, msg: "Register successfully." },
  Logout_success: { code: 200, msg: "Logout successfully." },
  //Errors
  Unauthorized: { code: 401, msg: "Unauthorized permission." },
  Login_wrong_input: { code: 401, msg: "Wrong password or username." },
  Internal_server_error: {
    code: 500,
    msg: "Internal Server Error. Try again later.",
  },
  Permission_denied: {
    code: 403,
    msg: "Permission denied",
  },
};

const Roles = {
  SuperAdmin: {
    id: 1,
    permissions: [
      Permissions.Create_Product,
      Permissions.Update_Product,
      Permissions.Delete_Product,
      Permissions.Create_User,
      Permissions.Update_User,
      Permissions.Delete_User,
    ],
  },
  User: {
    id: 2,
    permissions: [
      Permissions.Update_Product,
      Permissions.Create_Product,
      Permissions.Delete_Product,
    ],
  },
};

module.exports = {
  Permissions,
  Roles,
  ResponseCode,
};