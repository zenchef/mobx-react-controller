import React from 'react'
import { connectController, Controller } from '../src/index'
import ReactTestUtils from 'react-dom/test-utils'
import { expect } from 'chai'
import ShallowRenderer from 'react-test-renderer/shallow'
import { observable } from 'mobx'


// Setup a mobx Store
class Store {
    @observable
    state = {
        name: 'World'
    }
    changeName = () => {
        this.state.name = 'Nassim'
    }
}
const store = new Store()

class HelloController extends Controller {
    state = {
        name: 'World'
    }
    changeName = () => {
        this.setState({ name: 'Nassim' })
    }
    collect = () => {
        return {
            name: this.state.name,
            changeName: this.changeName,
            storeName: store.state.name
        }
    }
    render () {
        return super.render()
    }
}

const HelloView = ({ name, storeName, changeName }) => {
    return (
        <div>
            <span>Hello {name} !</span>
            <p>Hello {storeName} !</p>
            <button onClick={changeName}>Change Name</button>
        </div>
    )
}

const Hello = connectController(HelloController)(HelloView)

class Wrapper extends React.Component {
    render () {
        return this.props.children
    }
}

describe('mobx-react-controller', function () {
    it('should render a text field and button', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Hello />
            </Wrapper>
        )

        const span = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span')
        const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p')
        const button = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button')

        expect(span).to.be.ok
        expect(p).to.be.ok
        expect(button).to.be.ok
    })
    it('should render the correct text', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Hello />
            </Wrapper>
        )

        const span = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span')
    })

    it('should change text after click on the button', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Hello />
            </Wrapper>
        )
        const span = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'span')
        const button = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button')

        ReactTestUtils.Simulate.click(button)

        expect(span).to.be.ok
        expect(button).to.be.ok
        expect(span.textContent).to.equal('Hello Nassim !')
    })
    it('should render name from external store', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Hello />
            </Wrapper>
        )

        const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p')
        const button = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'button')

        expect(p).to.be.ok
        expect(button).to.be.ok
        expect(p.textContent).to.equal('Hello World !')
    })

    it('should rerender when store changes', () => {
        const component = ReactTestUtils.renderIntoDocument(
            <Wrapper>
                <Hello />
            </Wrapper>
        )

        const p = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'p')

        store.changeName()

        expect(p.textContent).to.equal('Hello Nassim !')
    })
})
