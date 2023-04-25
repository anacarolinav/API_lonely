const User = require('../model/user');

const login = async (req) => {
  const { username, password } = req.body;

  try {
    // Verifica se o usuário existe no banco de dados
    const existingUser = await User.findOne({ username });
    if (!existingUser) return { success: false, message: "Utilizador não encontrado." };

    // Verifica se a senha está correta
    const isPasswordCorrect = password === existingUser.password;
    if (!isPasswordCorrect) return { success: false, message: "Senha incorreta." };

    // Login efetuado com sucesso
    return { success: true, message: "Login efetuado com sucesso." };

  } catch (error) {
    console.log(error)
    //res.status(500).json({ message: "Erro ao autenticar usuário." });
  }
}

module.exports = {
  login
}




