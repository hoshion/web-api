const jwt = require('jsonwebtoken')
const TokensModel = require('../models/TokensModel');

class TokenService {
    constructor() {
        this.tokens = TokensModel;
    }

    validateAccessToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn:'30s'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'});

        return {accessToken, refreshToken}
    }

    async saveToken(email, refreshToken){
        if(this.tokens.isExists(email)) {
            await this.tokens.updateToken(email, refreshToken)
        } else await this.tokens.add(email, refreshToken);

        return {email, refreshToken}
    }

    findToken(refreshToken){
        return this.tokens.find(refreshToken);
    }
}

module.exports = new TokenService();