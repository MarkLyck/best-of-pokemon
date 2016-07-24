## Best of Pokemon app

#### Team Members:
 - Mark Lyck
 - Caryn Ligon
 - Ahkeem Lang

#### Live Website
- [gh-pages](https://marklyck.github.io/best-of-pokemon/)

#### SCRUM:
- [Trello](https://trello.com/b/0uo5wthK/best-of-pokemon)

#### Process:
- **Front End**
  - Data Modeling
  - Wireframing
  - Set up file structure
  - Built router
  - Built out each view
  - Built out models and collections

### Style Guide

- **File Structure**:
  - scripts folder
   - collections folder
   - models folder
   - views folder
   - entry.js
   - router.js
   - store.js
- **Naming**:
  - Collections & Models that are dependent on one another should have the same capitalized name with the collection being plural
  - Views: will be the view its representing followed by "View
  - Buttons that route should be goto-theView-btn
  - SCSS Views: partial for each view: nameOfView.scss

- **Functions**:
  - Always use ```{}``` with arrow functions
 - spacing:
```javascript
 function() {} ```

- **Backbone View Structure**:
 - initialize
 - tagName
 - id/className
 - events
 - other functions
 - template
 - render

- **Import Organization**:
 - Dependencies
 - Router & store
 - Models/Collections
 - Views/other

- **Buttons**
 - form elements: ```<input>```
 - otherwise: ```<button>```
