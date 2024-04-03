const Database = require('../config.js');
const validator = require('email-validator');
let db = new Database;

class Student {
    fetch_all() {
        let query = db.executeQuery('SELECT * FROM login_registration_table');
        return query;
    }
    
    fetch_student_by_email(email_address) {
        let query = db.executeQuery(
            'SELECT * FROM login_registration_table WHERE email_address="' + email_address +'"'
        );
        return query;
    }
    add_student(form_data) {
        let query = db.executeQuery(
            'INSERT INTO login_registration_table(first_name,last_name,email_address,password) ' +
            'VALUES("' + form_data.first_name + '","' + form_data.last_name + '","' + form_data.email_address + '","' + form_data.password + '")'
        )
        return 'Successfully registered';
    }

    /** Form validations */
    validate_login_form(form_data) {
        let form_errors = [];
        //console.log(form_data);

        if(form_data.email_address == '') {
            form_errors.push('Email cannot be blank.');
        }

        else if(!validator.validate(form_data.email_address)) {
            form_errors.push('Invalid email address.');
        }

        if(form_data.password == '') {
            form_errors.push('Password cannot be blank.');
        }

        else if(form_data.password.length < 8) {
            form_errors.push('Invalid password.');
        }
        

        /** Check if there are errors */
        if(form_errors.length > 0) {
            console.log('There are errors');
            return form_errors;
        }
        else {
            return true;
        }
    }
    validate_registration_form(form_data) {
        let form_errors = [];

        //Form Validations
        if(form_data.first_name == '' || form_data.last_name == '') {
            if(form_data.first_name == '') {
                form_errors.push('First name cannot be blank.');
            }
            if(form_data.last_name == '') {
                form_errors.push('Last name cannot be blank.');
            }
        }
        else if(form_data.first_name.length < 3 || form_data.last_name.length < 3) {
            if(form_data.first_name.length < 3) {
                form_errors.push('Invalid First name.');
            }
            if(form_data.last_name.length < 3) {
                form_errors.push('Invalid last name.');
            }
        }
        else if(form_data.first_name.length > 3 || form_data.last_name > 3) {
            if(!isNaN(form_data.first_name)) {
                form_errors.push('Invalid first name.');
            }
            if(!isNaN(form_data.last_name)) {
                form_errors.push('Invalid last name.');
            }
        }
        
        if(form_data.email_address == '') {
            form_errors.push('Email cannot be blank.');
        }
        else if(!validator.validate(form_data.email_address)) {
            form_errors.push('Invalid email address.');
        }
        if(form_data.password == '') {
            form_errors.push('Password cannot be blank.');
        }
        else if(form_data.password.length < 8 && form_data.password.length > 16) {
            form_errors.push('Invalid password.');
        }
        else if(form_data.password != form_data.confirm_password) {
            form_errors.push('Passwords do not match.');
        }

        if(form_errors.length != 0) {
            console.log('There are errors!');
            return form_errors;
        }
        else {
            return true;
        }
    }

    async checkRegistration(email_address) {
        let query = await db.executeQuery('SELECT 1 as count FROM login_registration_table where email_address="' + email_address +'"');
        if(query.length >= 1) {
            return true;
        }
        else {
            return false;
        }
        
    }

}

module.exports = Student;