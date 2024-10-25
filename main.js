import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Text } from "troika-three-text";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  2000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

camera.position.set(0, 3, 600);
camera.lookAt(0, 3.5, 1);

const loader = new GLTFLoader();
let model;

loader.load(
  "/millennium_puzzle_yugioh/scene.gltf",
  function (gltf) {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(1, 1, 1);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(5, 5, 5);
const light2 = new THREE.DirectionalLight(0xffffff, 10);
light2.position.set(-5, -5, -5);
scene.add(light, light2);

function randomTxt() {
  let answerType;
  const choices = {
    affirmativeAnswers: [
      "It is certain",
      "It is decidely so",
      "without a doubt",
      "Yes definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
    ],
    nonCommitalAnswers: [
      "Reply hazy, try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Concentrate and ask again",
    ],
    negativeAnswers: [
      "Don't count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful",
    ],
  };

  switch (Math.floor(Math.random() * 3)) {
    case 0:
      answerType = choices.affirmativeAnswers;
      break;
    case 1:
      answerType = choices.nonCommitalAnswers;
      break;
    case 2:
      answerType = choices.negativeAnswers;
      break;
    default:
      console.log("error");
      return;
  }
  return answerType[Math.floor(Math.random() * answerType.length)];
}

const myText = new Text();
scene.add(myText);

myText.text = randomTxt();
myText.fontSize = 15;
myText.position.set(-80, 85, 150);
myText.color = 0xffffff;
myText.visible = false;

const bttn = document.querySelector("#startBttn");

let question = false;
let rotationSpeed = 5; // Initial rotation speed
let speedMultiplier = 1; // Speed multiplier to gradually increase
let maxRotation = 6 * Math.PI + Math.PI; // Target rotation (90 degrees in radians)
let rotatedAmount = 0; // Track how much the model has rotated
function answer() {
  camera.position.set(0, 100, 300);
  if (rotatedAmount < maxRotation) {
    speedMultiplier += 5;
    setTimeout(() => {
      if (model) {
        model.position.set(0, 0, 0);
        let rotationStep = rotationSpeed * speedMultiplier;
        model.rotation.y += rotationStep;
        rotatedAmount += rotationStep;
      }
      setTimeout(() => {
        myText.visible = true;
      }, 3000);
    }, 2000);
  }
}

function millenniumPuzzle() {
  if (question) {
    answer();
  } else {
    camera.position.set(0, 3, 600);
    camera.lookAt(0, 3.5, 1);
    rotationSpeed = 0.01;
    speedMultiplier = 1;
    rotatedAmount = 0;
    if (model) {
      console.log("works");
      model.position.set(0, 0, 0);
    }
  }
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(millenniumPuzzle);
function setQuestion() {
  question = !question;
}
bttn.addEventListener("click", setQuestion);
