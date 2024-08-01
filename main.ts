#!/usr/bin/env node
//shabang:
//this line states that this code can be published and can be used globally by npx tool.
import inquirer from "inquirer";
let num: number = 1234;
const pin: number = 1999;
let balance: number = 10000;
const checkPin = await inquirer.prompt([
  {
    name: "pin",
    type: "password",
    message: "Enter you 4 digit PIN:",
    mask: "*",
  },
]);
const originalPin = checkPin.pin;
checkPin.pin = Number(checkPin.pin);
if (checkPin.pin === pin) {
  atmService();
}
if (isNaN(checkPin.pin)) {
  console.log(`PIN can only contain integer values like ${num}.`);
}
if (originalPin.length !== 4) {
  console.log(`PIN must contain 4 digits.`);
} else {
  console.log(`You have entered invalid PIN.`);
}

let operations;

async function atmService() {
  operations = await inquirer.prompt([
    {
      name: "atm",
      type: "list",
      message: `Choose operation you want to execute:`,
      choices: ["Cash Withdrawal", "Check Balance"],
    },
  ]);
  if (operations.atm === "Check Balance") {
    console.log(`Your balance is: ${balance}$`);
  } else if (operations.atm === "Cash Withdrawal") {
    const amount = await inquirer.prompt([
      {
        name: "dollar",
        type: "number",
        message: `Enter amount to withdraw:`,
      },
    ]);

    if (isNaN(amount.dollar) || amount.dollar <= 0) {
      console.log(`Please enter a valid postive number .`);
    } else if (typeof amount.dollar === "number" && amount.dollar > balance) {
      console.log(`Your balance is not sufficient.`);
      console.log(`Your current balance is ${balance}$.`);
    } else if (typeof amount.dollar === "number" && amount.dollar <= balance) {
      balance -= amount.dollar;
      console.log(`You have withdrawn ${amount.dollar}$.`);
      console.log(`Your current balance is ${balance}$.`);
    } else {
      console.log(`Invalid input.`);
    }
  }
}
