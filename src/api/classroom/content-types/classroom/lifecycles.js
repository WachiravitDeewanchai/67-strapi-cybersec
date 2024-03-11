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

        if (event.params.data && event.params.data.IDStudent) {
            let IDStudent = event.params.data.IDStudent;
            IDStudent = IDStudent.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedIDStudent = cryptoJs.AES.encrypt(IDStudent, cryptoKey).toString();
            event.params.data.IDStudent = hashedIDStudent;
        }

        if (event.params.data && event.params.data.IDTeach) {
            let IDTeach = event.params.data.IDTeach;
            IDTeach = IDTeach.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedIDTeach = cryptoJs.AES.encrypt(IDTeach, cryptoKey).toString();
            event.params.data.IDTeach = hashedIDTeach;
        }

        if (event.params.data && event.params.data.IDClassroom) {
            let IDClassroom = event.params.data.IDClassroom;
            IDClassroom = IDClassroom.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedIDClassroom = cryptoJs.AES.encrypt(IDClassroom, cryptoKey).toString();
            event.params.data.IDClassroom = hashedIDClassroom;
        }
    },
    async afterFindOne(event) {
        if (event.result && event.result.SubjectID) {
            let SubjectID = cryptoJs.AES.decrypt(event.result.SubjectID, cryptoKey).toString(cryptoJs.enc.Utf8);
            SubjectID = SubjectID.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.SubjectID = SubjectID;
        }

        if (event.result && event.result.IDStudent) {
            let IDStudent = cryptoJs.AES.decrypt(event.result.IDStudent, cryptoKey).toString(cryptoJs.enc.Utf8);
            IDStudent = IDStudent.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.IDStudent = IDStudent;
        }

        if (event.result && event.result.IDTeach) {
            let IDTeach = cryptoJs.AES.decrypt(event.result.IDTeach, cryptoKey).toString(cryptoJs.enc.Utf8);
            IDTeach = IDTeach.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.IDTeach = IDTeach;
        }

        if (event.result && event.result.IDClassroom) {
            let IDClassroom = cryptoJs.AES.decrypt(event.result.IDClassroom, cryptoKey).toString(cryptoJs.enc.Utf8);
            IDClassroom = IDClassroom.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.IDClassroom = IDClassroom;
        }
    },
    async afterFindMany(event) {
        event.result.map(result => {
            if (result && result.SubjectID) {
                let SubjectID = cryptoJs.AES.decrypt(result.SubjectID, cryptoKey).toString(cryptoJs.enc.Utf8);
                SubjectID = SubjectID.trim(); // ตัดช่องว่างที่เหลือออก
                result.SubjectID = SubjectID;
            }

            if (result && result.IDStudent) {
                let IDStudent = cryptoJs.AES.decrypt(result.IDStudent, cryptoKey).toString(cryptoJs.enc.Utf8);
                IDStudent = IDStudent.trim(); // ตัดช่องว่างที่เหลือออก
                result.IDStudent = IDStudent;
            }

            if (result && result.IDTeach) {
                let IDTeach = cryptoJs.AES.decrypt(result.IDTeach, cryptoKey).toString(cryptoJs.enc.Utf8);
                IDTeach = IDTeach.trim(); // ตัดช่องว่างที่เหลือออก
                result.IDTeach = IDTeach;
            }

            if (result && result.IDClassroom) {
                let IDClassroom = cryptoJs.AES.decrypt(result.IDClassroom, cryptoKey).toString(cryptoJs.enc.Utf8);
                IDClassroom = IDClassroom.trim(); // ตัดช่องว่างที่เหลือออก
                result.IDClassroom = IDClassroom;
            }

            return result;
        });
    }
}
