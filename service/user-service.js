const UsersModel = require('../models/UsersModel');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const ApiError = require('../api-error')

class UserService {

    constructor() {
        this.users = UsersModel;
    }

    async register(email, password){
        if(this.users.isExists(email)) throw ApiError.BadRequest(`Пользователь с таким почтовым адресом уже существует!`);

        const hashPassword = await bcrypt.hash(password, 8);

        const user = await this.users.add(email, hashPassword);

        const tokens = tokenService.generateToken(user);
        await tokenService.saveToken(user.email, tokens.refreshToken);

        return {...tokens, user}
    }

    async login (email, password){
        if(!this.users.isExists(email)) throw ApiError.BadRequest(`Пользователь не был найден!`);

        const user = this.users.find(email);

        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) throw ApiError.BadRequest("Неверный пароль!");

        const tokens = tokenService.generateToken({email});

        await tokenService.saveToken(user.email, tokens.refreshToken);
        return {...tokens, email}
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }

        const tokens = tokenService.generateToken({email: userData.email});

        await tokenService.saveToken(user.email, tokens.refreshToken);
        return {...tokens, email: userData.email}
    }
}

module.exports = new UserService();