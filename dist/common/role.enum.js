"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleUser;
(function (RoleUser) {
    RoleUser[RoleUser["USER"] = 0] = "USER";
    RoleUser[RoleUser["EDITOR"] = 1] = "EDITOR";
    RoleUser[RoleUser["ADMIN"] = 2] = "ADMIN";
    RoleUser[RoleUser["SUPERADMIN"] = 3] = "SUPERADMIN";
})(RoleUser || (RoleUser = {}));
exports.default = RoleUser;
