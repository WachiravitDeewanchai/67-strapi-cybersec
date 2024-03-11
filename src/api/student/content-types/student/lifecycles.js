const md5 = require('md5')
const cryptoJs = require('crypto-js');
const cryptoKey = 'my-secret-key'

module.exports = {
    async beforeCreate(event) {
        if (event.params.data && event.params.data.IDStudent) {
            let IDStudent = event.params.data.IDStudent;
            IDStudent = IDStudent.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedIDStudent = cryptoJs.AES.encrypt(IDStudent, cryptoKey).toString();
            event.params.data.IDStudent = hashedIDStudent;
        }

        if (event.params.data && event.params.data.StudentAid) {
            let StudentAid = event.params.data.StudentAid;
            StudentAid = StudentAid.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedStudentAid = cryptoJs.AES.encrypt(StudentAid, cryptoKey).toString();
            event.params.data.StudentAid = hashedStudentAid;
        }
    },
    async afterFindOne(event) {
        if (event.result && event.result.IDStudent) {
            let IDStudent = cryptoJs.AES.decrypt(event.result.IDStudent, cryptoKey).toString(cryptoJs.enc.Utf8);
            IDStudent = IDStudent.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.IDStudent = IDStudent;
        }

        if (event.result && event.result.StudentAid) {
            let StudentAid = cryptoJs.AES.decrypt(event.result.StudentAid, cryptoKey).toString(cryptoJs.enc.Utf8);
            StudentAid = StudentAid.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.StudentAid = StudentAid;
        }
    },
    async afterFindMany(event) {
        event.result.map(result => {
            if (result && result.IDStudent) {
                let IDStudent = cryptoJs.AES.decrypt(result.IDStudent, cryptoKey).toString(cryptoJs.enc.Utf8);
                IDStudent = IDStudent.trim(); // ตัดช่องว่างที่เหลือออก
                result.IDStudent = IDStudent;
            }

            if (result && result.StudentAid) {
                let StudentAid = cryptoJs.AES.decrypt(result.StudentAid, cryptoKey).toString(cryptoJs.enc.Utf8);
                StudentAid = StudentAid.trim(); // ตัดช่องว่างที่เหลือออก
                result.StudentAid = StudentAid;
            }

            return result;
        });
    }
}
