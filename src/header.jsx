// rcc
import axios from 'axios'
import React, { Component } from 'react'

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            count: 1,
            text: "salom",
            data: null,
            error: false
        }
    }
    componentDidMount() {
        axios.get("https://dummyjson.com/products")
            .then((res) => this.setState({ data: res.data }))
            .catch(err => this.setState({ error: err }))

    }
    componentDidUpdate() {
        console.log(this.state.data)
    }
    render() {
        return (
            <div>
                {this.state.data?.products.map((item) => (
                    <h2>{item.title}</h2>
                ))}
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>increment</button>
                <button disabled={this.state.count <= 1} onClick={() => this.setState({ count: this.state.count - 1 })}>decrement</button>
                <button onClick={() => this.setState({ text: "hello" })}>{this.state.text}</button>
            </div>
        )
    }
}
