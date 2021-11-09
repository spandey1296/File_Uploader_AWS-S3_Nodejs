const fs = require('fs');
const AWS = require('aws-sdk');


const ID = 'Access Key ID';
const SECRET = 'Secret Access Key';


const BUCKET_NAME = 'elasticbeanstalk-ap-south-1-127148990401';;


const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadFile = (fileName) => {
    
    const fileContent = fs.readFileSync(fileName);

    const params = {
        Bucket: BUCKET_NAME,
        Key: 'sn.png', 
        Body: fileContent,
        ACL: "public-read"
    };

    s3.upload(params, function(err, data) {
        if (err) {
            throw err
        }
        console.log(`File uploaded successfully. ${data.Location}`)
    });
};

uploadFile('sn.png');