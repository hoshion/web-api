const fs = require('fs').promises;

const connect = async () => {
    const usersJSON = await fs.readFile("users.json", "utf-8");
}

class UsersModel {

    constructor(obj){
        fs.readFile("users.json", "utf-8").then(usersJSON => {
            this.object = JSON.parse(usersJSON)
            this.array = this.object.users;
        });
    }

    async add(email, password){
        this.array.push({email: email, password: password});
        await this.save();
        return {email}
    }

    isExists(email){
        if(this.array.some(user => user.email === email)) return true;
        else return false;
    }

    async save(){
        await fs.writeFile("users.json", JSON.stringify(this.object));
    }

    find(email){
        return this.array.find(user => user.email === email);
    }
}


module.exports = new UsersModel();