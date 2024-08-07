#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { createProjectStructure } from '../lib/createProjectStructure.js';

const program = new Command();

// Display a stylized message
const displayMessage = (callback) => {
  figlet.text('XpressKit', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(chalk.green(data));
    console.log(chalk.cyan('XpressKit the automated backend project setup tool!'));
    console.log(chalk.yellow('Creating your project...'));

    // Call the callback function after displaying the message
    if (callback) {
      callback();
    }
  });
};

program
  .name('Xpresskit')
  .version('1.0.0')
  .description('CLI to create a comprehensive  express backend project structure')
  .argument('<projectName>', 'name of the project')
  .action((projectName) => {
    displayMessage(() => {
      createProjectStructure(projectName);
      console.log(chalk.green('Project Created Successfully'));
    });
  });

program.parse(process.argv);
