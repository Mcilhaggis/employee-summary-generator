const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeArr = [];

function teamQuestions(){
inquirer
    .prompt([
                {
            type: 'list',
            messaage: 'What is this persons role?',
            name: 'role',
            choices: ['Manager', 'Engineer', 'Intern']
        },{
            type: 'input',
            message: 'What is their name?',
            name: 'name'
        },{
            type: 'input',
            message: 'What is their ID number?',
            name: 'id'
        },{
            type: 'input',
            message: 'What is their email address?',
            name: 'email'
        }, 
        {
            when: (response) => response.role === 'Manager',      
            type:'input',
            name: 'officeNumber',
            message:'Please input their office number'
        },
        {
            when: (response) => response.role === 'Engineer',
            type:'input',
            name: 'github',
            message:'Please input in their github username:'
        },
        {
            when: (response) => response.role === 'Intern',
            type:'input',
            name: 'school',
            message:'Which school are they enrolled in?'
        },
        {
            type: 'confirm',
            message: 'Do you have more employees to enter?',
            name: 'moreTeamMembers',
            }, 
    ]).then((response) => {
                
        if(response.role === 'Manager') {
            const NewManager = new Manager(response.name, response.id, response.email, response.officeNumber);

            employeeArr.push(NewManager)

        } else if(response.role === 'Engineer') {
            const NewEngineer = new Engineer(response.name, response.id, response.email, response.github);

            employeeArr.push(NewEngineer)

        } else if(response.role === 'Intern') {
            const NewIntern = new Intern(response.name, response.id, response.email, response.school)

            employeeArr.push(NewIntern)
        }

        if(response.moreTeamMembers){ 
            teamQuestions();
        
        }else {
            fs.writeFile(outputPath, render(employeeArr), (err) =>
            err ? console.log(err) : console.log('Success!')
          );
        }
    }) 
}

teamQuestions();


