"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
class SlugifyClass {
    slug(slug) {
        const s = (0, slugify_1.default)(slug, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: "vi",
            trim: true
        });
        return s;
    }
}
exports.default = new SlugifyClass();
