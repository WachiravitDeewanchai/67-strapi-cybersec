const md5 = require('md5')
const cryptoJs = require('crypto-js');
const cryptoKey = 'my-secret-key'

module.exports = {
    async beforeCreate(event) {
        if (event.params.data && event.params.data.SubjectID) {
            let SubjectID = event.params.data.SubjectID;
            SubjectID = SubjectID.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedSubjectID = cryptoJs.AES.encrypt(SubjectID, cryptoKey).toString();
            event.params.data.SubjectID = hashedSubjectID;
        }

        if (event.params.data && event.params.data.SubjectAid) {
            let SubjectAid = event.params.data.SubjectAid;
            SubjectAid = SubjectAid.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedSubjectAid = cryptoJs.AES.encrypt(SubjectAid, cryptoKey).toString();
            event.params.data.SubjectAid = hashedSubjectAid;
        }
    },
    async afterFindOne(event) {
        if (event.result && event.result.SubjectID) {
            let SubjectID = cryptoJs.AES.decrypt(event.result.SubjectID, cryptoKey).toString(cryptoJs.enc.Utf8);
            SubjectID = SubjectID.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.SubjectID = SubjectID;
        }

        if (event.result && event.result.SubjectAid) {
            let SubjectAid = cryptoJs.AES.decrypt(event.result.SubjectAid, cryptoKey).toString(cryptoJs.enc.Utf8);
            SubjectAid = SubjectAid.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.SubjectAid = SubjectAid;
        }
    },
    async afterFindMany(event) {
        event.result.map(result => {
            if (result && result.SubjectID) {
                let SubjectID = cryptoJs.AES.decrypt(result.SubjectID, cryptoKey).toString(cryptoJs.enc.Utf8);
                SubjectID = SubjectID.trim(); // ตัดช่องว่างที่เหลือออก
                result.SubjectID = SubjectID;
            }

            if (result && result.SubjectAid) {
                let SubjectAid = cryptoJs.AES.decrypt(result.SubjectAid, cryptoKey).toString(cryptoJs.enc.Utf8);
                SubjectAid = SubjectAid.trim(); // ตัดช่องว่างที่เหลือออก
                result.SubjectAid = SubjectAid;
            }

            return result;
        });
    }
}
