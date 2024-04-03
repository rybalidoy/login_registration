const Student = require('../model/Student.js');
const bc = require('bcryptjs');

/** Server Variables */
const students = new Student;

var form_errors = [];

class StudentController {

    static index(req,res) {
        let status = req.session.status;
        res.render('login_registration',{status:status,form_errors:form_errors});
    }

    static async login(req,res) {
        let status;

        /** Should return array of errors or true */
        let validate = students.validate_login_form(req.body);

        if(validate == true) {
            let user_data = await students.fetch_student_by_email(req.body.email_address);
            if(user_data.length <= 0) {
                status = 'Incorrect email address/password';
                res.render('login_registration',{form_errors:null,status:status});
            }
            else {
                bc.compare(req.body.password,user_data[0].password,function(err,response) {
                    if(response) {
                        req.session.user_data = user_data;
                        res.redirect('/students/profile');
                    }
                    else {
                        console.log(err);
                        status = 'Incorrect email address/password.';
                        res.render('login_registration',{form_errors:null,status:status});
                    }
                })
            }
        }
        else {
            res.render('login_registration',{form_errors:validate,status:status});
        }
    }

    static async register(req,res) {
        let status;
        let validation = students.validate_registration_form(req.body);
        let exists = await students.checkRegistration(req.body.email_address);
        if(validation == true && !exists) {
            bc.genSalt(10,function(err,salt) {
                bc.hash(req.body.password,salt,function(err,hash) {
                    //Store hash in your password DB
                    req.body.password = hash;
                    let account_created = students.add_student(req.body);
                    req.session.status = 'Account successfully registered.';
                    res.redirect('/');
                });
            });
        }
        else if(exists && validation == true) {
            res.render('login_registration',{form_errors:['Email is already registered.'],status:status});
        }
        else {
            res.render('login_registration',{form_errors:validation,status:status});
        }
    }

    static profile(req,res) {
        /** Check if user is logged in
         *  else redirect to '/'
         */
        if(req.session.user_data) {
            res.render('profile',{data:req.session.user_data[0]});
        }
        else {
            res.redirect('/');
        }
    }
}

module.exports = StudentController;