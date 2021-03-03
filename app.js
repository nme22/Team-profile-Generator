const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const newTeam = []

const questions =[
    {
        type: 'input',
        name: 'name',
        message: 'What is the name of your Manager?'
    },
    {
        type: 'input',
        name: 'id',
        message: 'What is the Managers ID?'
    },
    {
        type: 'input',
        name: 'email',
        message: ' What is the Managers email?'
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: 'What is the office number of your Manager?'
    },
    {
        // Make a list type of the kind of employee you're adding to the team
        type: 'list',
        name: 'teamMember',
        message: 'Any team members you want to add?',
        choices: [
            'Engineer',
            'Intern',
            'None'
        ]
    }
]

inquirer.prompt(questions).then(answers => {
    console.log(answers);
    //log the new employee

    let newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    // pass the new employee to the newTeam array
    newTeam.push(newManager);
    if(answers.teamMember === 'Engineer') {
        console.log('adding an Enineer to the team!')
        engineerQuestions()
    }
})


const engineerQuestions = function () {
    console.log('We are adding an engineer to the team!')
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your Engineer?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your Engineers ID?'
        },
        {
            type: 'input',
            name: 'email',
            message: ' What is the Engineers email?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your Engineers github username?'
        },
        {
            // Make a list type of the kind of employee you're adding to the team
            type: 'list',
            name: 'teamMember',
            message: 'Any team members you want to add?',
            choices: [
                'Engineer',
                'Intern',
                'None'
            ]
        }
    ]).then(answers => {
        console.log(answers)
        let newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github, answers.teamMember)
        //push newEngineer to the end of the newTeam Array
        newTeam.push(newEngineer)
        if (answers.teamMember === 'Engineer'){
            console.log('Add a Engineer')
            engineerQuestions()
        }else if(answers.teamMember === 'Intern'){
            internQuestions()
        } else {
            console.log('No new team member!')
            let teamHTML = render(newTeam)
            fs.writeFile('./product/team.html', teamHTML, (err) =>
            err ? console.log(err) : console.log('Done!'))
        }
    })
}
const internQuestions = function () {
    console.log('Time for an Internship!!')
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your Intern?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is your Interns ID?'
        },
        {
            type: 'input',
            name: 'email',
            message: ' What is the Interns email?'
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is your Interns school?'
        },
        {
            // Make a list type of the kind of employee you're adding to the team
            type: 'list',
            name: 'teamMember',
            message: 'Any team members you want to add?',
            choices: [
                'Engineer',
                'Intern',
                'None'
            ]
        }
    ]).then(answers => {
        console.log(answers)
        let newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
        // push newIntern to the back of the newTeam Array
        newTeam.push(newIntern)
        if (answers.teamMember === 'Engineer'){
            console.log('Add a Engineer')
            engineerQuestions()
        }else if(answers.teamMember === 'Intern'){
            internQuestions()
        } else {
            console.log('No new team member!')
            let teamHTML = render(newTeam)
            fs.writeFile('./product/team.html', teamHTML, (err) =>
            err ? console.log(err) : console.log('Done!'))
        }
    })
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
