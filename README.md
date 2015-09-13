<b>Inspiration</b><br>
Omegle and chatroulette have been sources of some amazing moments, but those moments are very few in comparison to the standard experience. We wanted to make an app that enabled users to experience only those moments, and allow for more than just two parties to directly witness them.

<b>What it does</b><br>
Kantare is a video conferencing app that allows for users to randomly connect with each other and engage in activities from karaoke to rap battles to and debates. It enables third party guests to hop in and watch these thrilling moments as they occur, as well as interact with them by upvoting and downvoting.

<b>How WE built it</b><br>
We built Kantare using meteor.js and a WebRTC video conferencing api, peer.js.

<b>Challenges WE ran into</b><br>
We initially wanted to build the project using rails, and invested the majority of our time doing the research to implement WebRTC with rails. The implementation became dramatically simpler once we decided to switch to javascript and peer.js, which handles all of the WebRTC implementations.

<b>What WE learned</b><br>
DO NOT DO RAILS FOR REAL TIME APPS.

<b>What's next for Kantare</b><br>
Provide direct modules for each of the room types, such as background music or policy debate timings. Implement a further means of interaction between audience and presenter with text chat. Allow for private rooms. Build a matchmaking and elo rating system for competitive topics such as debate.

