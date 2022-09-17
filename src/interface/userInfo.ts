import { Document } from "mongoose"

export default interface IUserInfo extends Document {
    id: String, // ID đăng nhập
    name: String, // Tên nhân vật
    avatar: String,       // Tên avatar
    joinedOn: String, // Ngày tham gia
    email: String, // EMail
    veryphone: Boolean, // Trạng thái xác thực
    veryold: Boolean,  // Đã từng xác thực
}