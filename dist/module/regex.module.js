"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Regex;
(function (Regex) {
    Regex["phone_vn"] = "/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/";
    Regex["email"] = "^[a-zA-Z0-9]{5,50}$";
    Regex["password"] = "/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/";
    Regex["linkYoutube"] = "/(?:^$|^(?:https?:)?(?://)?(?:youtu.be/|(?:www.|m.)?youtube.com/(?:watch|v|embed)(?:.php)?(?:?.*v=|/))([a-zA-Z0-9_-]{7,15})(?:[?&][a-zA-Z0-9_-]+=[a-zA-Z0-9_-]+)*$)/";
    Regex["url"] = "/[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/";
})(Regex || (Regex = {}));
exports.default = Regex;
