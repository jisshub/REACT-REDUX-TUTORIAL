# Setting Up Redux in React

## Installing packages

### 1. React Redux Package

**React-Redux** is the library which helps us to connect the redux store to our react application.

```bash
  npm install --save redux react-redux
```

## Create our Store

Good place to start is in *index.js* file.

1. Import **createStore()** from redux and create a store object.

```js
import {createStore} from 'redux';

const store = createStore(() => {});
```

2. We use **Provider** component to interact with store object. We import this component from **react-redux**. Surround this root App component with Provider. Pass *store* object to Provider. By doing this, it will provide our application with access to the store object. This is how we can access the store object from anywhere in our application.

```js
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.getElementById('root')
);
```

**index.js**

```js
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(() => {});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
```

3. Next we have to pass a reducer into the store.

  - Create a **reducers** folder in src.
  - Create a *rootReducer.js* file in **reducers** folder.
  - Define a **rootReducer** function.  
  - Inside reducer function we take a state and action as parameters.
  - Return a state.
  - Define a default state variable *initState*.
  - Initialize the state parameter in **rootReducer** function with *initState*.
  - Thus state begins with the initial state.

**rootReducer.js**

```js
const initState = () => {
    posts = [];
}
const rootReducer = (state=initState, action) => {
    return state;
}
export default rootReducer;
```

4. Import reducer in **index.js** file and pass it to **createStore** function. This reducer will then interact with the store.

```js
import reducer from './reducers/rootReducer';

const store = createStore(reducer);
```

# Mapping State to Props

- Connect our components to the Store so we can interact with the state and gets the data from the state.

- We create a json file in *data/db.json* directory.

- Pass that data to *initState* and assign the same to *state* object. 

**rootReducer.js**

```js
import data from '../data/db.json';

const initState = data.posts;
const rootReducer = (state=initState, action) => {
    return state;
}
```

## Using Connect Component

- Connect **Home** component to Redux store object. For this we use **connect** component from **react-redux**.

- connect is a function that returns a higher order component.
  - It takes a function as an argument.
  - It returns a higher order component.

**Syntax Desctiption**

```js 
  connect()(Component)
```
**connect()** returns a higher order component. Then that higher order component takes a component as an argument.

**Home.js**

```js
import { connect } from 'react-redux';

export default connect()(Home);
```
 
- So we connected Home component to the store object now. Next We have to retrive the data from the store object.

- For a component to access the store, We take some data from the store object and map that data to the props of component. **Ie We take the data we want and map them to the props.**

- We create a function called *mapStateToProps* where we pass *state* as argument and return posts or json data from that state object. 

- Then pass *mapStateToProps* function to **connect** function.

- So when we connect to Redux, It knows what data we want to grab from redux and that data saved to property **posts** here. Just like below:


**Home.js**

```js
const mapStateToProps = (state) => {
  return {
    posts: state
  }
};

export default connect(mapStateToProps)(Home);
```

# Blog Details Page

- Clicking on blog needs to lead to details page.
- Connect **Post** component to redux store and get that individual post data.

1. First import connect function from **react-redux**.

**components/Post.js**

```js
import { connect } from 'react-redux';

export default connect()(Post);
```

2. Create a function called *mapStateToProps* where we pass *state* and *ownProps* as argument and gets the post id from the url parameters.

**components/Post.js**

```js
const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id;
}
```

3. Next return the individual post data from the store object and check the *id* we got is same as the *id* of the post using the **find** method.
**find** method cycles through the posts on the state object and returns the post object if the id matches.
 
4. Finally pass the **mapStateToProps** function to **connect** function.

**components/Post.js**

```js
const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.post_id;
    return {
        post: state.find(post => post.id === id) 
    }
}

export default connect(mapStateToProps)(Post);
```

5. Update the **render()** function by replacing *this.state.post* with *this.props.post*.

**components/Post.js**
```jsx
render() {
    const post = this.props.post ? (
      <div className="post">
        <h4 className="center">{this.props.post.title}</h4>
        <p>{this.props.post.body}</p>
      </div>
    ) : (
      <div className="center">Loading post...</div>
    );

    return (
      <div className="container">
        {post}
      </div>
    )
  }
}
```