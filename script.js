console.log("work");

import { archieve, thumbDown, thumbUp } from "./svg.js";

//We have to fetch the topic list by this link
const endpoint = 'https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json';

//Grab the element that we need from the html file
const nextTopic = document.querySelector(".next_topic");
const pastTopic = document.querySelector(".past_topic");
const addingListForm = document.querySelector("form");

let topics = []

async function fetchTopics() {
    let response = await fetch(endpoint);
    let data = await response.json();
    topics = data;
    console.log(topics);
    return topics;
}

const handleClickBtn = e => {}

const UpVoteBtn = e => {}

const downVoteBtn = e => {}


async function fetchAndGiveContentTopics() {
  topics = await fetchTopics();
  displayTopics(topics);
}

function displayTopics(myTopic) {
  const html = myTopic.map(topic => {
    return `
    <div class="topic-list" id="${topic.discussedOn}">
      <button class="archive">${archieve}</button>
      <p>${topic.title}</p>
      <div class="buttons">
        <button class="thumb">${thumbUp}</button>
        <button class="thumb">${thumbDown}</button>
      </div>      
    </div>`
  }).join(' ');

  if(topics.discussedOn === "") {
    nextTopic.innerHTML = html;
  } else {
    pastTopic.innerHTML = html;
  }
}

//Allow the user to add the list in the states
const handleSubmitAddingList = e => {
  e.preventDefault();
  console.log("Adding list");
  const formEl = e.currentTarget;
  const newTopic = {
    title: formEl.title.value,
    id: Date.now(),
  };

  topics.push(newTopic);
  formEl.reset();
}

addingListForm.addEventListener("submit", handleSubmitAddingList);
window.addEventListener("click", handleClickBtn);
fetchAndGiveContentTopics()