###Create component:
- createClass: using React.createClass({})
- using ES6: class <name_component> extends React.Component {}
- functional component: const <name_component> = (props) => { } 
(known as stateless component - only using for render html, not include lifecycle)

###Contact between parent component and child compnent
- Using props to pass data from parent to child
- Using state to manage internal data inside child component
- **Props features**:
	- *Props is immutable* (Not force change from child component)
	- Props changes make component re-render
	- initial default props:
		- using getDefaultProps() { return {} } (function) (for React.createClass)
		- using static defaultProps = {} (static object) (for ES6 Class)
	- validate props input by PropTypes
		- propTypes: {} (for React.createClass)
		- static propTypes = {} (for ES6 Class)
- **State features**:
	- *State is mutuable*
	- State changes make component re-render
	- inital default state
		- using getInitialState() { return {} ) (for React.createClass)
		- using state = {} (for ES6 Class)
	- Any actions to change state must use this.setState({})

###LifeCycle method in React Component  
The order methods to excute:
####Mounting
These methods are called when an instance of a component is being created and inserted into the DOM:  
- **constructor** (just once)  
- **componentWillMount** (just once)  
  - Most Common Use Case: App configuration in your root component.  
  - Can call setState: Don’t. Use default state instead.  
- **render()**  
- **componentDidMount** (just once)  
	- Feature: called when component is mounted  
	- Most common use cases:  
	  - be a helpful heavy lifter for our Components. One of the most common tasks is interacting with the Native UI. Unlike componentWillMount() or render() we can now fully interact with the Native stack. (css)  
	  - call API (ajax/fetch) and rerender by setState or forceUpdate()  
	- Can call setState: Yes.  
####Updating  
An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:  
- **componentWillReceiveProps(nexProps)**  
	- Feature: called when new props arrive  
	- Most Common Use Case: Acting on particular prop changes to trigger state transitions. (Note: componentWillReceiveProps - can still call even prop not change)  
	- Can call setState: Yes.  
- **shouldComponentUpdate(nextProps, nextState)**  
	- Feature:   
		- called after componentWillReceiveProps  
		- preventing unnecessary renders to improve performance  
		    > only should boolean ... return true or false // default return true  
  - Most Common use case: Controlling exactly when your component will re-render.  
  - Can call setState: No.  
- **componentWillUpdate(nextProps, nextState)**  
	- Feauture: 
		- same as componentWillReceiveProps  
		    > componentWillUpdate() will not be invoked if shouldComponentUpdate() returns false.  
  - Most Common Use Case:   
		- Used instead of componentWillReceiveProps on a component that also has shouldComponentUpdate (but no access to previous props).    
		- to handle configuration changes and prepare for the next render. If we want to access the old props or state, we can call this.props or this.state. We can then compare them to the new values and make changes/calculations as required.  
  - Can call setState: No.  
- **render()**  
- **componentDidUpdate(prevProps, prevState)**  
	- Feature:  
		- not called for the initial render.  
		    > componentDidUpdate() will not be invoked if shouldComponentUpdate() returns false.  
  - Most Common Use Case:  
		- Updating the DOM in response to prop or state changes.  
		- This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).  
  - Can call setState: Yes.  
####Unmounting  
This method is called when a component is being removed from the DOM:  
- **componentWillUnmount()**  
	- Most Common Use Case:  
		- Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any DOM element  
	- Can call setState: No.  
####Routing    
- Handle navigating render Component based on url    
- Core: compare window.location and hitory.location to decide to which component should render  
- package: react-router (core), react-router-dom  
  ```yarn add react-router-dom``` or ```npm install react-router-dom```

- Issue with Redux:    
[Blocked Updates](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)
  - Component doesn't update when the location changes (child routes or active nav links don't update)
  - This happens if:
    1. The component is connected to redux via ```connect()(Comp)```
    2. The component is not a "route component", meaning it is not rendered like so: ```<Route component={SomeCoonnectedThing} />```
  - The problem is that Redux implements ```shouldComponentUpdate``` and there's no indication that anything has changed if it isn't receiving props from the router.
  - To fix:
    1. Wrap Comp with ```withRouter``` higher-order component and it will be given the current location as one of its props.  

    ```Javascript
    // internally, withRouter just renders a pathless <Route>
    const BlockAvoider = withRouter(Blocker)
    const MyComponent = () => (
      <SomeComponent>
        <BlockAvoider />
      </SomeComponent>
    )
    ```
    2. Render a pathless <Route>. While <Route>s are typically used for matching a specific path, a pathless <Route> will always match, so it will always render its component.   
    ```Javascript
    // pathless <Route> = <Blocker> will always be rendered
    const MyComponent= () => (
      <SomeComponent>
        <Route component={Blocker} />
      </SomeComponent>
    )
    ```
- **API**  
  ```  
    <Prompt   
      message: string  
      message: func  
      when: bool  
    />  
  ```  
  => Used to prompt the user before navigating away from a page.  
  ```
  <Redirect  
    to: string  
    to: object  
    push: bool  
    from: string  
  />  
  ```
  => Used to navigate to a new location which will override the current location in the history stack  
  - to: string (the URL to redirect to)  
  - to: object (a location to redirect to)  
  - push: bool (when true, redirecting will push a new entry onto the history instead of replacing the current one)  
  - from: string (a pathname to redirect from)  
    > only be used to match a location when rendering a ```Redirect``` inside of a ```Switch```  
  ```
  <Route  
    Route render method   
    Route props  
    component  
    render: func  
    children: func  
    path: string  
    exact: bool  
    strict: bool  
    location: object  
  />  
  ```
  => used in most case to render some UI when a location matches the route's path  
    > A Route is always technically rendered even though its rendering null.  
  - Route render methods
    - ```<Route component>```
      > component:
      > - When location matches, the routes uses React.createElement to create a new React Element from the given component.
    - ```<Route render>```
      > render: func
      > - use for inline rendering and wrapping without undesired remouting every location matches.
    - ```<Route children>```
      > children: func
      > - render whether the path matches the location or not.
      > - work sames as ```render```
      > when the location does not match, match is null
  - path: string  
    - any valid URL path that path-to-regexp  
      > Routes without a path always match.  
  - exact: bool  
    - when true, will only match if the path matches the location.pathname exactly  
  - strict: bool  
    > when true, a path that has a trailling slash will only match a location.pathname with a trailing slash.  
  - location: object  
  ```
  <Router  
    history: object  
    children: node  
  />  
  ```
  > - low-level interface  
  > - to synchronize a custom history with a state management lib like Redux or Mobx.  
    - hitory: object  
      > A history object to use for navigation  
  ```Javascript
    import createBrowserHistory from 'history/createBrowserHistory'
    const customHistory = createBrowserHistory();
    <Router history={customHistory} />
  ```
    - children: node  
    > a single child element to render
  ```Javascript
  import { BrowserRouter } from 'react-router-dom'

  <BrowserRouter
    basename={optionalString}
    forceRefresh={optionalBool}
    getUserConfirmation= {optionalFunc}
    keyLength={optionalNumber}
  >
  ```
  - A Route uses the HTML5 history API (pushState, replaceState and the popstate event) to keep UI in sync with the URL.  
  - basename: string  
    > the base URL for all locations. (*should have a leading slash, but no trailing slash*)  
  - getUserConfirmation: func  
    > a function to use to confirm navigation. Defaults to using window.confirm  
  - forceRefresh: bool  
    > if true the router will use full page refreshes on page navigation (for browsers that don't support the HTML5 history API)  
  - keyLength: number  
    > the length of location.key. Defaults to 6  
  - children: node  
    > a single child element to render  
  ```  
  <Switch  
    Switch props  
  >  
  ```  
  > - Render the first child Route and Redirect that matches the location  
  > - Route elements are matched using their path props and Redirect elements are matched using their from prop.  
  ```  
  location  
  {  
    key: 'ac3df4', // not with HashHistory!  
    pathname: '/somewhere'  
    search: '?some=search-string',  
    hash: '#howdy',  
    state: {  
      [userDefined]: true  
    }  
  }  
  ```  
  ```  
  match (contains information about how a Route path matched the URL match object)  
  {  
    params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path  
    isExact - (boolean) true if the entire URL was matched (no trailing characters)  
    path - (string) The path pattern used to match. Useful for building nested <Route>s  
    url - (string) The matched portion of the URL. Useful for building nested <Link>s  
  }  
  ```  
