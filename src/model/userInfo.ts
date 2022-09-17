import mongoose from 'mongoose'
import IUserInfo from '../interface/userInfo'

let Schema = new mongoose.Schema({
	id:        {type:String, required:true, unique:true}, // ID đăng nhập
	name:      {type:String, required:true, unique:true}, // Tên nhân vật
	avatar:    {type:String, default:'0'},       // Tên avatar
	joinedOn:  {type:Date, default:new Date()}, // Ngày tham gia
	email:     {type: String, default: ''}, // EMail
	veryphone: {type:Boolean, default:false}, // Trạng thái xác thực
	veryold:   {type:Boolean, default:false},  // Đã từng xác thực
});

export default mongoose.model<IUserInfo>('UserInfo', Schema)
