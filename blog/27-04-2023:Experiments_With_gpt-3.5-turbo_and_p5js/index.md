<link rel="stylesheet" href="/style.css" />

# Experiments with gpt-3.5-turbo and p5.js


Introducing a new project, which explores the applications of [gpt-3.5-turbo](https://platform.openai.com/docs/models/gpt-3-5) (the API that powers chatGPT) in creative coding. The project utilizes the API to generate p5.js code based on a prompt. The generated code can be edited by the user or rewritten using another prompt to make modifications.

[p5.js](https://p5js.org/) is a JavaScript library that simplifies the process of creating interactive graphics and animations on the web. It provides a range of tools and functions that enable developers to create visually appealing content with ease.

To ensure that the generated code is in the correct format, I had to experiment with the initial prompt I used to generate it. I ended up using a technique called one-shot prompting. This is where you provide an example of an input and an expected output. Surprisingly one example was enough to the get the API returning code in the correct format every single time that I have used it. The current iteration of the prompt is:

```
You are going to construct a p5.js sketch based on a users prompt and some previous code. If there is no previous code you should construct the p5.js sketch from scratch. You should only reply with code, nothing else, no commentary only javascript code. The code you should base your sketch on is `%s` . The users prompt is `%s` . You should write the code in p5 "instance mode" style. Remember you cannot access any of p5s global variables in instance mode you need to access them by passing around the "p" object to any functions that require them. Do not enclose the code in any markdown tags or quotations (e.g. do not use ``` to enclose the code). Your reply should be valid javascript code. You should not include the code "let myp5 = new p5(sketch);" in your response. You should assign the variable sketch to "window.sketch"

Example Prompt: "draw a circle in the center of the canvas"
Example Response:

window.sketch = function(p) {
	p.setup = function() {
    p.createCanvas(400, 400);
};

p.draw = function() {
    p.ellipse(p.width/2, p.height/2, 50, 50); //draws circle in center of canvas
};
```
<br>

The project was built using Laravel with React on the frontend. Although Laravel may be overkill for this project, I chose it because I am familiar with the technology and I want to add database features in the future. It's what I am familiar with and was the quickest way for me to get started.

To give you an idea of how the project works, here are some video examples. You might want to skip through them a bit as the slow response times for the API mean that the videos are pretty long:

<video width="500" controls >
    <source src="./random_squares_demo.mp4" type="video/mp4">
</video>
Shows some squares moving randomly around the canvas with easing in between each movement.

<video width="500" controls >
    <source src="./particle_system_demo.mp4" type="video/mp4">
</video>
Shows gpt generating a particle system and then iterating on the design

<video width="500" controls >
    <source src="./lissajous_patterns_demo.mp4"type="video/mp4">
</video>
For this demo I used the app to generate lissajous curves and then iterated on the sketch several times. (Sorry about the length of this one.)



There are some issues I have found with generating code this way. The API response times can be really slow (> 30 seconds), sometimes the code is incorrect although this doesn't happen very often and if you iterate on a sketch multiple times occasionally you will end up with unused variables and bits of code that aren't being called. However the generated code is usually correct, and can serve as a starting point for further development and experimentation. I have discovered some interesting p5j.s techniques that I hadn't used before so the project is definitely useful even if it's just for gettng some inspiration. 

Looking to the future, I want to explore the use of other creative coding frameworks, like [Hydra](https://hydra.ojack.xyz/), [A-frame](https://aframe.io/), and [Three.js](https://threejs.org/). I also want to add the ability to save sketches and return to earlier versions of a sketch. I also want to host a version of the app that people can use themselves without having to download the whole project, although I want to do this in a way that limits usage so that I don't run up an expensive bill for the usage of the API.

You can find the project repo [here](https://github.com/gabrieldavison/creative_code.gpt).

*note: this post was partially written using ChatGPT*