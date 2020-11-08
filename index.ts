var DELIB = require("all-the-german-words");
import { Words } from "./class";
import "./style.css";

let woerter = new Words(DELIB);

const appDiv: HTMLElement = document.getElementById("app");

const out = woerter.applyFilter({ modifier: "standart" }).randomString(20);

appDiv.innerHTML = `<p>${out}</p>`;
