// const printProfileData = profileDataArr => {
//     for(let i=0; i < profileDataArr.length; i++) {
//         console.log(profileDataArr[i]);
//     }

//     console.log('================')

//     // is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
const inquirer = require('inquirer');
const fs = require('fs');
const generatePage = require('./src/page-template.js');

// // Equivalent functions
// // const userID = profileDataArgs[0];
// // const github = profileDataArgs[1];
// const pageHTML = generatePage(name, github)
// // 



const mockData = {
    name: 'Alex',
    github: 'alex-d-marten',
    confirmAbout: true,
    about: 'I like to code!',
    projects: [
        {
            name: 'Got Hops',
            description: 'Find local breweries.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/scottrohrig/got-hops',
            feature: true,
            confirmAddProject: true
        },
        {
            name: 'Password Generator',
            description: 'Generate a random password.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/alex-d-marten/password-generator',
            feature: false,
            confirmAddProject: true
        },
        {
            name: 'Weather Dashboard',
            description: 'Find local weather.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/alex-d-marten/weather-dashboard',
            feature: true,
            confirmAddProject: true
        },
        {
            name: 'Workday Scheduler',
            description: 'Create a workday schedule.',
            languages: ['JavaScript', 'HTML', 'CSS'],
            link: 'https://github.com/alex-d-marten/workday-scheduler',
            feature: false,
            confirmAddProject: false
        }
    ]
}

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name! (Required)')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is your GitHub account name? (Required)',
            validate: githubInput => {
                if(githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub account!')
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself.',
            when: ({ confirmAbout }) => {
                if(confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const prompProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    console.log(`
=================
Add a New Project
=================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if(projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!')
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if(descriptionInput) {
                    return true;
                } else {
                    console.log('Please describe your project!')
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if(linkInput) {
                    return true;
                } else {
                    console.log('Please enter your project link!')
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push (projectData);
        if(projectData.confirmAddProject) {
            return prompProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

// promptUser()
//     .then(prompProject)
//     .then(portfolioData => {
//         const pageHTML = generatePage(portfolioData);

//         fs.writeFile('./index.html', pageHTML, err => {
//           if (err) throw new Error(err);

//           console.log('Page created! Check out index.html in this directory to see it!');
//         });
//     });
const pageHTML = generatePage(mockData);
fs.writeFile('./index.html', pageHTML, err => {
    if (err) throw err;

    console.log('Portfolio complete! Check out index.html to see the output!');
});