const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
require('dotenv').config();




const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })

    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        start();
        });
        
            

 const start = () => {
inquirer
    .prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: ['View all departments',
        'Add a department',
        'View all roles', 
        'Add a role',
        'View all employees', 
        'Add an employee',
         'Update an employee role',
          'Exit']

    })
    .then((answer) => {
        switch (answer.choice) {
            case 'View all departments':
                viewTable('department');
               
                break;
            case 'View all roles':
                viewTable('roles');
                break;
            case 'View all employees':
                viewTable('employee');
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                break;


        }

})
}



function viewTable(arg) {
db.query(`select * from ${arg}`, function(err, result) {
    if (err) throw err;
    console.table(result);
    start();
    })
    
}


function addDepartment() {
        inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?'
        })
        .then((answer) => {
            db.query(`insert into department (name) values (?)`, answer.name , function(err, result) {
                if (err) throw err;
                }
            );
            viewTable('department');
            start();
        })
        
        }

