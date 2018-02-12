import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@observer
class Controller extends Component {
    @observable state
    render () {
        return <this.props.WrappedComponent {...this.collect()} />
    }
    collect () {
        throw new Error('[mobx-react-controller] : You have to implement the method collect!')
    }
}

// Copied from mobx-react inject.js
// https://github.com/mobxjs/mobx-react/blob/f8969e6785922b7d4f95cf660aff655ba220b381/src/inject.js#L37
const getDisplayName = Component => {
    return (
        Component.displayName ||
        Component.name ||
        (Component.constructor && Component.constructor.name) ||
        'Unknown'
    )
}

const connectController = ControllerComponent => WrappedComponent => {
    const ConnectedComponent = observer(props => {
        return <ControllerComponent {...props} WrappedComponent={observer(WrappedComponent)} />
    })

    ConnectedComponent.displayName = `connect-${getDisplayName(WrappedComponent)}-with-${getDisplayName(ControllerComponent)}`
    return ConnectedComponent
}

export { Controller, connectController, getDisplayName}
