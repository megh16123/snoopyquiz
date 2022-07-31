#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { exit } from "process";

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));
var totalScore = 0;
var floflag = true;

const welcome = async (name) => {
  const welcomeMessage = chalkAnimation.rainbow(
    `Welcome ${name} to the short cli quiz`
  );
  await sleep();
  welcomeMessage.stop();
};
const inputName = async () => {
  const nameinput = await inquirer.prompt({
    type: "input",
    name: "name",
    message: "What is your name?",
    default: "Jack",
  });
  return nameinput.name;
};
const quizQuestions = [
  {
    question: "what is the full form of RAM?",
    options: [
      "Residual Access Memory",
      "Repeated Access Memory",
      "Random Access Module",
      "Random Access Memory",
    ],
    correct: "Random Access Memory",
  },
  {
    question: "what is the full form of CPU?",
    options: [
      "Central Processing Unit",
      "Central Program Unit",
      "Central Peripheral Unit",
      "Central Programming Unit",
    ],
    correct: "Central Processing Unit",
  },
  {
    question: "DSL telcos provide which of the following services?",
    options: [
      "Wired phone access",
      "ISP",
      "Wired phone access and ISP",
      "Network routing and ISP",
    ],
    correct: "Wired phone access and ISP",
  },
  {
    question: "Which standard TCP port is assigned for contacting SSH servers?",
    options: ["port 21", "port 22", "port 23", "port 24"],
    correct: "port 22",
  },
  {
    question: "DHCP is used for",
    options: ["IPv6", "IPv4", "Both IPv6 and IPv4", "None of the mentioned"],
    correct: "Both IPv6 and IPv4",
  },
  {
    question: "Which of the following is a form of DoS attack?",
    options: [
      "Vulnerability attack",
      "Bandwidth flooding",
      "Connection flooding",
      "All of the mentioned",
    ],
    correct: "All of the mentioned",
  },
];

const checker = async (isCorrect, correct) => {
  const spinner = createSpinner("Checking...").start();
  await sleep(1500);
  if (isCorrect) {
    spinner.success({ text: "Correct Answer!!" });
    totalScore += 1;
  } else {
    spinner.error({
      text: `Incorrect Answer\ncorrect answer is ${chalk.yellow(correct)}`,
    });
  }
};
const showQuestion = async (question, options, correct) => {
  let answerinput = await inquirer.prompt({
    type: "list",
    name: "answer",
    message: question,
    choices: options,
  });
  await checker(answerinput.answer == correct, correct);
};
const quiz = async () => {
  for (let i = 0; i < quizQuestions.length; i++) {
    await showQuestion(
      quizQuestions[i].question,
      quizQuestions[i].options,
      quizQuestions[i].correct
    );
  }
};

await welcome(await inputName());
while (floflag) {
  totalScore = 0;
  await quiz();
  console.log(
    chalk.bold("Score : ") +
      chalk.green(totalScore) +
      ` Out of ${quizQuestions.length}`
  );
  const confirmational = await inquirer.prompt({
    type: "confirm",
    name: "confirmation",
    message: "Do you want to continue?",
    default: true,
  });

  if (!confirmational.confirmation) {
    floflag = false;
  }
}

figlet("Bye Bye", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }

  console.log(gradient.pastel.multiline(data));
  exit(1);
});
