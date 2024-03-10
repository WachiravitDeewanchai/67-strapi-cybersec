const md5 = require('md5');

module.exports = {
    async beforeCreate(event) {
        const IDStudent = event.params.data.IDStudent;
        const hashedIDStudent = md5(IDStudent).slice(0, 128);
        event.params.data.IDStudent = hashedIDStudent;

        const Student = event.params.data.Student;
        const hashedStudent = md5(Student).slice(0, 128);
        event.params.data.Student = hashedStudent;
    },
};