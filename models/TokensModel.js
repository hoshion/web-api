const fs = require('fs').promises;

class TokensModel {

    constructor(obj){
        fs.readFile("tokens.json", "utf-8").then(tokensJSON => {
            this.object = JSON.parse(tokensJSON)
            this.array = this.object.tokens;
        })
    }

    async add(email, refreshToken) {
        this.array.push({email, refreshToken});
        await this.save();
    }

    isExists(email){
        if(this.array.some(token => token.email === email)) return true;
        else return false;
    }

    async updateToken(email, refreshToken){
        this.array = this.array.map(token => {if(token.email === email) token.refreshToken = refreshToken});
        await this.save()
    }

    async save(){
        await fs.writeFile("tokens.json", JSON.stringify(this.object));
    }

    find(refreshToken){
        this.array.find(token => token.refreshToken === refreshToken);
    }
}


module.exports = new TokensModel();