const md5 = require('md5')
const cryptoJs = require('crypto-js');
const cryptoKey = 'my-secret-key'

module.exports = {
    async beforeCreate(event) {
        if (event.params.data && event.params.data.IDTeach) {
            let IDTeach = event.params.data.IDTeach;
            IDTeach = IDTeach.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedIDTeach = cryptoJs.AES.encrypt(IDTeach, cryptoKey).toString();
            event.params.data.IDTeach = hashedIDTeach;
        }

        if (event.params.data && event.params.data.TeacherAid) {
            let TeacherAid = event.params.data.TeacherAid;
            TeacherAid = TeacherAid.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedTeacherAid = cryptoJs.AES.encrypt(TeacherAid, cryptoKey).toString();
            event.params.data.TeacherAid = hashedTeacherAid;
        }
        
        if (event.params.data && event.params.data.TelNumber) {
            let TelNumber = event.params.data.TelNumber;
            TelNumber = TelNumber.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedTelNumber = cryptoJs.AES.encrypt(TelNumber, cryptoKey).toString();
            event.params.data.TelNumber = hashedTelNumber;
        }
        
        if (event.params.data && event.params.data.Email) {
            let Email = event.params.data.Email;
            Email = Email.padEnd(128, ' '); // เพิ่มช่องว่างเพื่อให้มีความยาวเท่ากับ 128
            const hashedEmail = cryptoJs.AES.encrypt(Email, cryptoKey).toString();
            event.params.data.Email = hashedEmail;
        }
    },
    async afterFindOne(event) {
        if (event.result && event.result.IDTeach) {
            let IDTeach = cryptoJs.AES.decrypt(event.result.IDTeach, cryptoKey).toString(cryptoJs.enc.Utf8);
            IDTeach = IDTeach.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.IDTeach = IDTeach;
        }

        if (event.result && event.result.TeacherAid) {
            let TeacherAid = cryptoJs.AES.decrypt(event.result.TeacherAid, cryptoKey).toString(cryptoJs.enc.Utf8);
            TeacherAid = TeacherAid.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.TeacherAid = TeacherAid;
        }

        if (event.result && event.result.TelNumber) {
            let TelNumber = cryptoJs.AES.decrypt(event.result.TelNumber, cryptoKey).toString(cryptoJs.enc.Utf8);
            TelNumber = TelNumber.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.TelNumber = TelNumber;
        }

        if (event.result && event.result.Email) {
            let Email = cryptoJs.AES.decrypt(event.result.Email, cryptoKey).toString(cryptoJs.enc.Utf8);
            Email = Email.trim(); // ตัดช่องว่างที่เหลือออก
            event.result.Email = Email;
        }
    },
    async afterFindMany(event) {
        event.result.map(result => {
            if (result && result.IDTeach) {
                let IDTeach = cryptoJs.AES.decrypt(result.IDTeach, cryptoKey).toString(cryptoJs.enc.Utf8);
                IDTeach = IDTeach.trim(); // ตัดช่องว่างที่เหลือออก
                result.IDTeach = IDTeach;
            }

            if (result && result.TeacherAid) {
                let TeacherAid = cryptoJs.AES.decrypt(result.TeacherAid, cryptoKey).toString(cryptoJs.enc.Utf8);
                TeacherAid = TeacherAid.trim(); // ตัดช่องว่างที่เหลือออก
                result.TeacherAid = TeacherAid;
            }

            if (result && result.TelNumber) {
                let TelNumber = cryptoJs.AES.decrypt(result.TelNumber, cryptoKey).toString(cryptoJs.enc.Utf8);
                TelNumber = TelNumber.trim(); // ตัดช่องว่างที่เหลือออก
                result.TelNumber = TelNumber;
            }

            if (result && result.Email) {
                let Email = cryptoJs.AES.decrypt(result.Email, cryptoKey).toString(cryptoJs.enc.Utf8);
                Email = Email.trim(); // ตัดช่องว่างที่เหลือออก
                result.Email = Email;
            }

            return result;
        });
    }
}
