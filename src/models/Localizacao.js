const dynamoose = require('dynamoose');
const uuid = require('uuid');
dynamoose.AWS.config.update({
    region: 'us-east-2',
});
dynamoose.local();
const localizacaoSchema = new dynamoose.Schema({
    _id: {
        type: String,
        hashKey: true,
        default: uuid.v1(),
    },
    tipo: {
        type: String,
    },
    chave_fk:{
        type: Integer,
        required: true,
    },
    data:{
        type: DateTime,
    },
    posicao:{
        type: String,
    },
},
{
timestamps: false,
});
module.exports = dynamoose.model('Localizacao', localizacaoSchema);