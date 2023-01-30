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


        function addRole() {

            inquirer
            .prompt([{
                type: 'input',
                name: 'title',
                message: 'What is the title of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department id of the role you would like to add?'
            }
        ])
            .then((answer) => {
                db.query(`insert into roles (title, salary, department_id) values (?, ?, ?)`, [answer.title, answer.salary, answer.department_id] , function(err, result) {
                    if (err) throw err;
                    }
                );
                viewTable('roles');
                start();
            })
            
            }
        
        function addEmployee() {
            
                inquirer
                .prompt([{
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the first name of the employee you would like to add?'
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the last name of the employee you would like to add?'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the role id of the employee you would like to add?'
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: 'What is the manager id of the employee you would like to add?'
                }
            ])
                .then((answer) => {
                    db.query(`insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)`, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id] , function(err, result) {
                        if (err) throw err;
                        }
                    );
                    viewTable('employee');
                    start();
                })
                
                }
        
        
        function updateEmployeeRole() {
                
                inquirer
                .prompt([{
                    type: 'input',
                    name: 'id',
                    message: 'What is the id of the employee you would like to update?'
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: 'What is the new role id of the employee you would like to update?'
                }
            ])
                .then((answer) => {
                    db.query(`update employee set role_id = ? where id = ?`, [answer.role_id, answer.id] , function(err, result) {
                        if (err) throw err;
                        }
                    );
                    viewTable('employee');
                    start();
                })
                
                }
        