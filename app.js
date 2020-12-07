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
            messaage: 'What is your role?',
            name: 'role',
            choices: ['Manager', 'Engineer', 'Intern']
        },{
            type: 'input',
            message: 'What is your name?',
            name: 'name'
        },{
            type: 'input',
            message: 'What is your ID number?',
            name: 'id'
        },{
            type: 'input',
            message: 'What is your email address?',
            name: 'email'
        }, 
        {
            when: (response) => response.role === 'Manager',      
            type:'input',
            name: 'officeNumber',
            message:'Please input your office number'
        },
        {
            when: (response) => response.role === 'Engineer',
            type:'input',
            name: 'github',
            message:'Please input in your github username:'
        },
        {
            when: (response) => response.role === 'Intern',
            type:'input',
            name: 'school',
            message:'Which school are you enrolled in?'
        },
        {
            type: 'confirm',
            message: 'Do you have more employees to enter?',
            name: 'moreTeamMembers',
            }, 
    ]).then((response) => {
        console.log(response);
                
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
            console.log(employeeArr);

            fs.writeFile(outputPath, render(employeeArr), (err) =>
            err ? console.log(err) : console.log('Success!')
          );
        }
    }) 
}

teamQuestions();


    // After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.


