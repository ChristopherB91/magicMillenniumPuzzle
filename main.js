import * as THREE from "three";
import { GLTFLoader, OrbitControls } from "three/examples/jsm/Addons.js";
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

camera.position.set(0, 2, 600);

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

const controls = new OrbitControls(camera, renderer.domElement);

controls.update();

function millenniumPuzzle() {
  controls.update();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(millenniumPuzzle);

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
  return answerType[Math.floor(Math.random() * answerType.length - 1)];
}

const myText = new Text();
scene.add(myText);

myText.text = randomTxt();
myText.fontSize = 30;
myText.position.set(5, 5, 5);
myText.color = 0xffffff;

// author credits
// "Millennium Puzzle (Yugioh)" (https://skfb.ly/6Rr9W) by Yanez Designs is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/)
