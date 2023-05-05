const User = require('../model/user');


const signup = async (req) => {
    const {username, password } = req.body;

    try {
        // Verifica se o usuário já existe no banco de dados
        const existingUser = await User.findOne({ username });
        if (existingUser) return { success: false, message: "Nome de utilizador já em uso." };

        const newUser = new User({
            username,
            password
        });

        // saves the data in our database in mongo
        await User.create(newUser);

        // Login efetuado com sucesso
        return { success: true, message: "Registo efetuado com sucesso." };

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup
};