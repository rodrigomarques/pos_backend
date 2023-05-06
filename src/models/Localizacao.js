const dynamoose = require('dynamoose');
const uuid = require('uuid');
//dynamoose.AWS.config.update({
//    region: 'us-east-2',
//});
//dynamoose.local();
dynamoose.aws.ddb.local();
//dynamoose.aws.ddb.local(http://localhost:8000)

/*
// Create new DynamoDB instance
const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": "AKID",
        "secretAccessKey": "SECRET"
    },
    "region": "us-east-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);
*/
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
        type: number,
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