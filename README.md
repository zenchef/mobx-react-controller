# MobX React Controller

This project is meant to separate (pure) views from component state and lifecycle events.
It is used in conjuction with mobx-react

In order to do that, There is a `Controller` Component that is connected through the HoC `connectController`


# Usage

In order to use, you need to have a component that extends `Controller`
`Controller` extends React.Component and already defines a render method
You can add lifecycle events and regular state and methods to your controller component

The controller needs to define a method `collect` that will provide props to the "dumb" view component

```javascript
class MyController extends Controller {
    collect() {
        return {
            foo: 'bar'
        }
    }
}
```

Then you need to use `connectController` to connect the Controller and the View component

```javascript
MyComponent = connectController(MyController)(({foo}) => {
    <div>{foo}</div>
})
```

The View and the Controller are mobx-react _observers_ so they will rerender if they use observable values that change

# Example

Here is a working example

```javascript
import { Controller, connectController } from 'mobx-react-controller'

class HelloController extends Controller {
    state = {
        name: 'World'
    }
    changeName = () => {
        this.setState({ name: 'People' })
    }
    collect = () => {
        return {
            name: this.state.name,
            changeName: this.changeName
        }
    }
}

const HelloView = ({ name, changeName }) => {
    return (
        <div>
            <span>Hello {name} !</span>
            <button onClick={changeName}>Change Name</button>
        </div>
    )
}

const Hello = connectController(HelloController)(HelloView)
```

It works well with mobx-react's `inject` method :

```javascript
import { Controller, connectController } from 'mobx-react-controller'

inject('myStore')
class HelloController extends Controller {
    collect = () => {
        return {
            name: this.props.myStore.state.name,
            changeName: this.props.myStore.changeName
        }
    }
}

const HelloView = ({ name, changeName }) => {
    return (
        <div>
            <span>Hello {name} !</span>
            <button onClick={changeName}>Change Name</button>
        </div>
    )
}

const Hello = connectController(HelloController)(HelloView)
```
