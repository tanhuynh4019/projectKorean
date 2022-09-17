import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import IUser from '../interface/user'

let Schema = new mongoose.Schema({
	local: {
		email:   { type: String,  required: true, unique: true},
		password:   { type: String,  required: true, hide: true },
        role: { type: Number, default: 1 },
        fullname: {Type: String, default: ''},
		token:      String,
		lastDate:   Date,
		lastLogin:  Date,
		regDate:    Date,
        ip: String,
	}
});

// Các phương thức ======================
// Tạo mã hóa mật khẩu
Schema.methods.generateHash = function(password: string) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
};
// kiểm tra mật khẩu có trùng khớp
Schema.methods.validPassword = function(password: string) {
	return bcrypt.compareSync(password, this.password);
};

export default mongoose.model<IUser>('User', Schema)