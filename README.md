# soccerfield.js
jquery plugin for soccer field display with players on their positions

**Usage:**
For usage include jquery, plugin itself (jquery.soccerfield.js), basic stylesheet (soccerfield.css) and one of themes (soccerfield.default.css)
```javascript
$(document).ready(function(){
  $("#soccerfield").soccerfield(data,options);
});
```

**To see an example** simply clone/download the repo, go to the _demo_ folder and launch index.html


**Available options (example with comments):**
```javascript
var options =  {
  //options for soccer field
  field: {
    //soccer field width; default: 960px
    width: "960px",
    //soccer field height; default: 600px
    height: "600px",
    //img for soccer field default: 'img/soccerfield_green.png'
    img: 'img/soccerfield_green.png',
    //load page with hidden field; default:false
    startHidden: true,
    //animate field appearance with fade; default: false
    animate: true,
    //time for fadeIn 
    fadeTime: 1000,
    //reveal field automatically on load (default:true), if set to false needs extra $selector.data("soccerfield").revealField() call
    autoReveal:true,
    //callback on soccer field reveal
    onReveal: function () {
            } 
    },
  //options for players
  players: {
    //font size for player names in pixels (default 16)
    font_size: 16,
    //reveal players or load with players not hidden; default: true
    reveal: true,
    //reveal simultaneously (default: true); if false  - players reveal one by one after selected timeout
    sim: false,
    //timeout between players reveal in sim:false mode
    timeout: 1000,
    //time for fadeIn players animation
    fadeTime: 2000,
    //player img, no img if false (default: false)
    img: 'img/soccer-player.png',
    //callback after all players revealed
    onReveal: function () {
            alert("players revealed!");
            }
  }
};
```

**Data format requirements (example):**
```javascript
var data = [
  {name: 'Gianluigi Buffon', position: 'C_GK'},
  {name: 'Leonardo Bonucci', position: 'LC_B'},
  {name: 'Giorgio Chiellini', position: 'C_B'},
  {name: 'Andrea Barzagli', position: 'RC_B'},
  {name: 'Daniele De Rossi', position: 'C_DM'},
  {name: 'Alessandro Florenzi', position: 'L_M'},                
  {name: 'Emanuele Giaccherini', position: 'LC_M'},
  {name: 'Marco Parolo', position: 'RC_M'},
  {name: 'Antonio Candreva', position: 'R_M'},
  {name: 'Éder', position: 'LC_F'},
  {name: 'Lionel Messi', position: 'RC_F', img: 'img/argentina_flag.png'},
];
```

**Possible positions**
  Position consists of two parts, divided by underscore sign "_".
  
  _Left part id for "y" position:_
  * L - Left
  * LC- Left-Center
  * C - Center
  * RC - Right-Center
  * R - Right
 
  
_Right part is for "x" or "soccer" position:_
  * GK - GoalKeeper
  * B - Back
  * DM - Defending Midfielder
  * M - Midfielder
  * AM - Attacking MidFielder
  * F - Forward

  
You can combine these positions as it is showed in example


**Methods**

Methods are available through _$selector.data("soccerfield")_ attribute.

_revealField()_ - reveals field and players


_revealPlayers()_ - reveals hidden players


_destroy()_ - destroys instance of plugin


**Added features:**
Now you are able to assign picture individually for each player using _img_ key in you _data_ array 
If img is not set - the plugin will pick up one from the _options.players.img_


**Themes:**

You are free to create your own themes. For example soccerfield.default.css theme is provided


*TODO:*
* Create minified version
* Manage players's numbers
* Manage players changes and substitutions
* More customization and themes
* Bower install
