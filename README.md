
# Juspay Assignment Scratch-like Project

This project is a visual coding environment inspired by MIT Scratch developed as part of the Juspay ReactJS Challenge. The goal is to implement key motion animations support multiple sprites.


## Features

#### 1. Motion Animations
```The following motion animations are supported under the ‘Motion’ category:
1.Move ____ steps: Move a sprite forward or backward based on the input steps.

2. Turn ____ degrees: Rotate a sprite clockwise or counterclockwise by a given number of degrees.

3.Go to x: ___ y: ____: Move the sprite to specified coordinates on the canvas.

4.Repeat Animation: Loop the animation for a specified number of times.

```
#### 2. Multiple Sprites Support
```
1.Create and manage multiple sprites on the canvas.

2.Each sprite can have its own set of animations, allowing for independent motion.

3.Play Button: Start all sprite animations simultaneously with a single button click.

```

## Installation

Install my-project with npm

```bash
  npm install
  npm start
```
```
 Open http://localhost:3000 to view the app in the browser.
```

    
## Live Site
```
https://juspay-scratch-suhelali.vercel.app/

```
## Optimizations

While the current implementation focuses on functionality, there are several optimization techniques that I know to improve performance and state management. Here's an outline of the approaches I’m familiar with:

#### Context API:

The Context API will help streamline state management, especially for passing down shared data or functions to deeply nested components without prop-drilling. This will improve scalability as more components and features are added.


#### Redux:

If the state management becomes more complex, such as handling global states across various sprites or animations, Redux will be introduced. Redux will ensure predictable state updates, making the application more maintainable and efficient as the number of components grows.






## Demo Video

https://drive.google.com/file/d/17jnvtHKk2fHpT_9VXLvB6OxQP6LZwj8f/view?usp=drive_link

https://github.com/user-attachments/assets/bd96ddb8-9cbb-4cec-916d-985a363227d1