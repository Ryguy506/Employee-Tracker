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

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    console.log(`Welcome to the Employee Tracker!`);
    start();
});


// function to start the application
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
                    // viewTable('roles');
                    showRoles();
                    break;
                case 'View all employees':
                    // viewTable('employee');
                    showEmployees()
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


//  function to view a table
function viewTable(arg) {
    db.query(`select * from ${arg}`, function (err, result) {
        if (err) throw err;
        console.log(`==================== ${arg} ====================`);
        console.table(result);
        start();
    })

}

// function to view a joined table with roles data and department names
function showRoles() {
    db.query(`SELECT roles.title, roles.id, department.name AS department, roles.salary
        FROM roles
        INNER JOIN department ON roles.department_id = department.id`, function (err, result) {
        if (err) throw err;
        console.log(`==================== Roles ====================`);
        console.table(result);
        start();
    })
}


// function to view a joined table with employee data , roles data and department names
function showEmployees() {
    db.query(`SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    department.name AS department,
    roles.salary, 
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
    FROM employee
    LEFT JOIN roles ON employee.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`, function (err, result) {
        if (err) throw err;
        console.log(`==================== Employees ====================`);
        console.table(result);
        start();
    })
}

// function to add a department to the database
function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'What is the name of the department you would like to add?'
        })
        .then((answer) => {
            db.query(`insert into department (name) values (?)`, answer.name, function (err, result) {
                if (err) throw err;
            }
            );
            viewTable('department');
        })

}

// function to add a role to the database
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
            db.query(`insert into roles (title, salary, department_id) values (?, ?, ?)`, [answer.title, answer.salary, answer.department_id], function (err, result) {
                if (err) throw err;
            }
            );
            viewTable('roles');
        })

}
// function to add an employee to the database
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
            db.query(`insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)`, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], function (err, result) {
                if (err) throw err;
            }
            );
            viewTable('employee');
        })

}

// function to update an employee role
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
            db.query(`update employee set role_id = ? where id = ?`, [answer.role_id, answer.id], function (err, result) {
                if (err) throw err;
            }
            );
            viewTable('employee');
        })

}
