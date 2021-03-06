//const axios = require('axios').default;
/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


// Build the user card
function createUserCard(user) {
  // Create the card container
  const userCard = document.createElement('div');
  userCard.classList.add('card');

  // Set user image
  const userImage = document.createElement('img');
  userImage.src = user.avatar_url;
  //userImage.alt = 'Hacking away 1989';
  userCard.appendChild(userImage);

  // Build the card info
  const cardInfo = document.createElement('div'); // build the parent
  cardInfo.classList.add('card-info'); // Holds all card info

  // Add real name
  const realName = document.createElement('h3');
  realName.classList.add('name');
  realName.textContent = user.name;
  cardInfo.appendChild(realName);

  // Add user name
  const userName = document.createElement('p');
  userName.classList.add('username');
  userName.textContent = user.login;
  cardInfo.appendChild(userName);

  // Add location
  const location = document.createElement('p');
  location.textContent = `Location: ${user.location}`;
  cardInfo.appendChild(location);

  // Add profile
  const profile = document.createElement('p');
  profile.textContent = 'Profile: ';
  const profileLink = document.createElement('a');
  profileLink.textContent = user.html_url
  profileLink.href = user.html_url;
  profile.appendChild(profileLink);
  cardInfo.appendChild(profile);

  //  Add followers
  const followers = document.createElement('p');
  followers.textContent = `Followers: ${user.followers}`;
  cardInfo.appendChild(followers);

  // Add following 
  const following = document.createElement('p');
  following.textContent = `Following: ${user.following}`;
  cardInfo.appendChild(following);

  // Add bio 
  const bio = document.createElement('p');
  const bioIbfo = `Bio: <i>${user.bio}</i>`; // Why !!! We should be using innerHTML
  bio.innerHTML = bioIbfo;

  //bio.textContent = `Bio: ${user.data.bio}`;
  //bio.style.fontStyle = "italic"; // changes everything to italic.
  cardInfo.appendChild(bio);


  //********************* */

  // Keep the spaces above, may be more to add
  // Add the user card and return the new component.
  userCard.appendChild(cardInfo);
  return userCard;

}

// Team Array
let theTeam = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell', 'JLong5795'];

const cards = document.querySelector('.cards');
// Get my github info
axios.get(`https://api.github.com/users/phmenard`)
  .then((response) => {
    // Build my user card
    cards.appendChild(createUserCard(response.data));
    return axios.get(`https://api.github.com/users/phmenard/followers`);
  })
  .then((response) => {

    response.data.forEach((follower) => {
      //add my followers to the array
      theTeam.unshift(follower.login);

    })

    creatTheUserContent(theTeam);
  })
  .catch((err) => {

  })


function creatTheUserContent(team) {
  console.log(theTeam.length);

  team.forEach((item) => {
    // grab user info
    axios.get(`https://api.github.com/users/${item}`)
      .then((response) => {
        const cards = document.querySelector('.cards');
        //console.log(response);
        // Build user card
        cards.appendChild(createUserCard(response.data));

      })

      .catch((err) => { // Somthing bad happen
        console.log(err);
      })
  })


}









