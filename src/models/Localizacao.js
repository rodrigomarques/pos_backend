const dynamoose = require('dynamoose');
const uuid = require('uuid');
//dynamoose.AWS.config.update({
//    region: 'us-east-2',
//});
//dynamoose.local();

//dynamoose.aws.ddb.local({
//    "region": "us-east-2"
//});
//dynamoose.aws.ddb.local(http://localhost:8000)

/*
AWS Access Key ID [None]: possystemkey
AWS Secret Access Key [None]: 1q2w3e4r
Default region name [None]: us-east-2
Default output format [None]:

// Create new DynamoDB instance
*/
const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": "possystemkey",
        "secretAccessKey": "1q2w3e4r"
    },
    "region": "us-east-2"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

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
        type: Number,
        required: true,
    },
    data:{
        type: Date,
    },
    posicao:{
        type: String,
    },
},
{
timestamps: false,
});
module.exports = dynamoose.model('Localizacao', localizacaoSchema);