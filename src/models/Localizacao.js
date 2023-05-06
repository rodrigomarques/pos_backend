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

Pelo Default

AKIAWJNXYTUNRYC5J576
s/c19uFW4vARZ+26RuBN39xoEb2PiTeMieSQlGAj

// Create new DynamoDB instance
*/
const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": "AKIAWJNXYTUNRYC5J576",
        "secretAccessKey": "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"
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
    posicao:{
        type: String,
    },
},
{
    timestamps: true,
});
module.exports = dynamoose.model('Localizacao', localizacaoSchema);