import React, { Component } from 'react';
import * as contentful from 'contentful';

class Layer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: ''
        }
    }

    client = contentful.createClient({
        space: process.env.REACT_APP_SPACE,
        accessToken: process.env.REACT_APP_ACCESS_TOKEN
    })

    fetchLayer = () => this.client.getEntry(this.props.layerId)

    componentDidMount() {
        this.fetchLayer().then((response) => {
            this.setState({
                title: response.fields.layerTitle,
                body: response.fields.layerBody
            })
        })
    }


    render() {
        return (
            <section>
                <h2>{this.state.title}</h2>
                <p>{this.state.body}</p>
            </section>
        )
    }
}
export default Layer;
