<h1>Book Search & Save</h1>
  <image src='https://img.shields.io/badge/license-MIT-green.svg' />
  <h2>Description</h2>
  
  Book Search & Save is a MERN web application that allows users to create an account, search for books using Google's book search API, save books from the search results, view your saved books and delete books from your saved books. 

  <h3>Technology</h3>

  Book Search & Save utilizes MongoDB, Express, React, and Node. Mongoose is used on the back end to setup the models and schema used to populate the database. However, rathern than using traditional routes in express, we are using Apollo. Apollo allows us to communicate to GraphQL to make queries and mutations to our MongoDB. The queries and mutations take the place of the traditional fetch requests that one would make. Queries take the place of any 'get' requests, and mutations take the place of any 'post', 'put, and 'delete' requests. The queries and mutations are built on the server side by creating typeDefs and resolvers for each request. The typeDefs define what data each request requires and what type data each request returns. The resolvers contain the actual Mongoose requests that interact with the database. On the front end, the Apollo Client is utilized to invoke the queries and mutations that were created on the back end. The benefit to using GraphQL is that the front-end code for requests is much more controlled. One can structure their queries to access the exact amount of data that is required as opposed to filtering through excess information. Additionally, multiple fetch requests can be chained into one single GraphQL request. This cleans up the code on the front end and helps to minimize the total amount of request routes one would need on the back end. 

  An additional benefit to using GraphQL was using the context feature of the Apollo Server / Client. All requests were able to be intercepted and checked to see if a JWT (json web token) was present. This allows for control over routes that require a certain amount of authentication (like needing to be signed in). This happens automatically by Apollo once the developer sets up the requisite auth functions. This saves the developer from having to include the authentication functions in each API request. 


  <h2>Website</h2>

  [https://whispering-cove-83234.herokuapp.com/](https://whispering-cove-83234.herokuapp.com/)
 
  
  <h2 id="license">License</h2>

  MIT - Find out more about this project's license(s) at: [https://choosealicense.com/licenses/](https://choosealicense.com/licenses/)

  
  <h2 id="questions">Questions</h2>
  
  <p> 
  Made by: AshisPatel<br />
  Github Profile: https://github.com/AshisPatel<br />
  </p>Email: ashis.n.patel@gmail.com<br />Please send me an email with any questions, comments, or concerns that you have regarding this application.

  <h2>End Note - A Thank You To The Reader</h2>

  Hello there friend! I hope that you're having a good day, afternoon, evening, or odd midnight hours! If you aren't, then I hope the fun fact and gif at the end of this section can brighten your mood.  But first, let me rant. I'll be honest, introducing a new technology always has me feeling a little bit shaky. Originally, wrapping my head around GraphQL was strange due to what seemed to be a large reduction in code from the traditional approach of writing API routes. However, now I think that the process is more delegated. By having the route split into the types, resolvers, and finally the actual request it allows one to fully structure the request to one's needs. This of course, would require some planning in advance but combo'd with MongoDB, updating the models and schemas iteratively wouldn't be a problem! Ok, that's it from me, thanks for reading, and as always have a beautiful day! (^^)b

  **Fun fact**: Cows moo with regional accents. Apparently, a cow's moo is impacted by it's overall peer group, thus resulting in a variance of moos across the world. Should you need it, I'm sure this would lead you on an interesting youtube rabbit hole. 

  _Me to myself after I spent hours trying to understand why my models weren't updating when it was all because I was trying to populate an already populated schema subdocument_
  
  ![Girl spin flips a goat that has seen her artwork](https://github.com/AshisPatel/Book-Search-Engine/blob/main/repo-assets/spin.gif)
  