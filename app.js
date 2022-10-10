"use strict";

class Typewriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = +wait;
    this.txt = "";
    this.wordIndex = 0;
    this.type();
    this.isDeleting = false;
  }

  type() {
    //current index of word
    const index = this.wordIndex % this.words.length;

    //get fulltext of current word
    const word = this.words[index];

    //check if deleting
    if(this.isDeleting){
      //Remove char
      this.txt = word.substring(0,this.txt.length - 1);
    } else {
      //Add char
      this.txt = word.substring(0,this.txt.length + 1);
    }

    //Insert txt into txtElement
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`

    //Type Speed
    let typeSpeed = 300;
    if(this.isDeleting){
      typeSpeed/=2;
    }

    //check if the word is complete
    if(!this.isDeleting && this.txt === word){
       //Make pause at end
       typeSpeed = this.wait;

       //set isDeleting to true
       this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
      //set isDeleting to false
      this.isDeleting = false;

      //Move to next word
      this.wordIndex++;

      //pause before start typing
      typeSpeed = 500;

    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

//init function
function init() {
  console.log("loaded");
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  //console.log(words);
  const wait = txtElement.getAttribute("data-wait");
  //init typewriter
  let ty = new Typewriter(txtElement, words, wait);
}

//Init on DOM load
document.addEventListener("DOMContentLoaded", init);