const DB = require("./../database/connection")

class LocalizaoController {
    async enviarLocalizacao(req, res) {
        let data = {}
        try {
            let body = req.body

            let latitude = body.latitude
            let longitude = body.longitude
            let usuario = body.usuario
            
            let sqlUser = `select * from usuario where id = ?`;
            const con = await DB.connect()
            const [usuarios] = await con.query(sqlUser, [usuario]);

            if(usuarios.length > 0){
                let sql = `select * from localizacao where usuario_id = ?`;
                const [local] = await con.query(sql, [usuario]);

                if(local.length > 0){
                    data.message = "Localização atualizada"
                    let sqlupdate = `update localizacao set latitude = ${latitude}, longitude = ${longitude} where usuario_id = ${usuario}`;
                    await con.execute(sqlupdate);
                    return res.json(data)
                }else{
                    data.message = "Localização salva"
                    let sqlinsert = `insert into localizacao values(${usuario}, ${latitude}, ${longitude}, now())`;
                    await con.execute(sqlinsert);
                    return res.json(data)
                }
            }else{
                data.erro = "Usuario nao encontrado"
                return res.status(400).json(data)    
            }
            
        } catch (e) {
            console.log(e.message)
            data.erro = "Erro ao salvar cliente"
            return res.status(500).json(data)
        }
    }

    async buscar(req, res) {
        let data = {}
        try {

            let lat = req.params.lat
            let lon = req.params.lon

            if(lat == undefined || lon == undefined){
                return res.json({ lista : []})
            }
            
            let sql = `SELECT *, (6371 *
                acos(
                    cos(radians(${lat})) *
                    cos(radians(latitude)) *
                    cos(radians(${lon}) - radians(longitude)) +
                    sin(radians(${lat})) *
                    sin(radians(latitude))
                )) AS distance
            FROM localizacao l 
            inner join usuario u on l.usuario_id = u.id 
            inner join vendedor v on v.usuario_id = u.id 
            WHERE TIMESTAMPDIFF(MINUTE,atualizacao,NOW()) < 30  HAVING distance <= 5`

            const con = await DB.connect()
            const [localizacao] = await con.query(sql);
            //https://pt.stackoverflow.com/questions/55669/identificar-se-conjunto-de-coordenadas-est%C3%A1-dentro-de-um-raio-em-android
            return res.json({ lista : localizacao})
        } catch (e) {
            data.erro = "Erro ao listar pessoas"
            return res.status(500).json(data)
        }
    }
}
  
module.exports = new LocalizaoController