const DB = require("./../database/connection")

class ClienteController {
  async cadastrar(req, res) {
    let data = {}
    try {

      let body = req.body
      
      let tipo = body.tipo
      let cpf = body.cpf
      
      let sql = `select * from usuario where cpf = ?`;
      const con = await DB.connect()
      const [usuarios] = await con.query(sql, [cpf]);

      if(usuarios.length > 0){
        data.message = "Usuario ja cadastrado"
        return res.json(data)
      }

      if(tipo == "USUARIO"){
        let sql = `insert into usuario values(NULL, '${cpf}', '${tipo}')`;
        await con.execute(sql);
        data.message = "Usuário salvo com sucesso!"
      }else if(tipo == "VENDEDOR"){
        let sql = `insert into usuario values(NULL, '${cpf}', '${tipo}')`;
        let rs = await con.query(sql, {}, async function (err, result, fields) {
          return result;
        });
        
        let idUser = rs[0].insertId
        let descricao = body.descricao
        
        let sqlVendedor = `insert into vendedor values(NULL, '${idUser}', '${descricao}')`;
        await con.query(sqlVendedor);
        data.message = "Vendedor salvo com sucesso!"
      }else{
        data.message = "TIPO NÃO PERMITIDO!"
      }

      return res.json(data)
    } catch (e) {
      console.log(e.message)
      data.erro = "Erro ao salvar cliente"
      return res.status(500).json(data)
    }
  }

  async buscar(req, res) {
    let cpf = req.params.cpf
    let data = {}
    try {
      let sql = `select * from usuario where cpf = ?`;
      const con = await DB.connect()
      const [usuarios] = await con.query(sql, [cpf]);

      if(usuarios.length > 0){
        data.usuario = usuarios
        return res.json(data)
      }else{
        data.usuario = {}
        return res.status(404).json(data)
      }
    } catch (e) {
      console.log(e.message)
      data.erro = "Erro ao buscar cliente"
      return res.status(500).json(data)
    }
  }
}

module.exports = new ClienteController