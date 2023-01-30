drop database if exists Tracker;

create database Tracker;

use Tracker;


tables

create table department (
    id int not null auto_increment primary key,
    name varchar(30) not null
);


create table roles (
    id int not null auto_increment primary key,
    title varchar(30) not null,
    salary decimal(10,2) not null,
    department_id int not null,
    foreign key (department_id) references department(id)
);


create table employee (
    id int not null auto_increment primary key,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    foreign key (role_id) references role(id)
);



insert into department (name) values ('Software Development');
insert into department (name) values ('Sales');
insert into department (name) values ('Design');
insert into department (name) values ('Customer Service');


insert into roles (title, salary, department_id) values ('Software Developer', 100000, 1);
insert into roles (title, salary, department_id) values ('Software Development Manager', 150000, 1);
insert into roles (title, salary, department_id) values ('Sales Lead', 100000, 2);
insert into roles (title, salary, department_id) values ('Salesperson', 80000, 2);
insert into roles (title, salary, department_id) values ('Lead Designer', 120000, 3);
insert into roles (title, salary, department_id) values ('Designer', 100000, 3);
insert into roles (title, salary, department_id) values ('Customer Service Manager', 90000, 4);
insert into roles (title, salary, department_id) values ('Customer Service Representative', 60000, 4);


insert into employee (first_name, last_name, role_id, manager_id) values ('John', 'Doe', 1, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ('Jane', 'Doe', 2, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Jim', 'Halpert', 3, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Pam', 'Beesly', 4, 3);
insert into employee (first_name, last_name, role_id, manager_id) values ('Michael', 'Scott', 5, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Dwight', 'Schrute', 6, 5);    
insert into employee (first_name, last_name, role_id, manager_id) values ('Angela', 'Martin', 7, null);
insert into employee (first_name, last_name, role_id, manager_id) values ('Kevin', 'Malone', 8, 7);
