import React, { Component } from 'react';
import * as contentful from 'contentful';
import Hero from './Hero';
import Layer from './Layer';


class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            id: '',
            layers: []
        }
    }

    client = contentful.createClient({
        space: process.env.REACT_APP_SPACE,
        accessToken: process.env.REACT_APP_ACCESS_TOKEN
    })

    fetchPosts = () => this.client.getEntries({ 'content_type': 'page' })
    fetchEntry = () => this.client.getEntry(this.state.id)
    setPost = post => {
        // console.log(post);
        const stack = post.fields.layers.map(layer => layer.sys.id);
        this.setState({
            heroId: post.fields.hero.sys.id,
            layers: stack
        })
    }

    componentDidMount(props) {
        this.fetchPosts()
            .then((response) => {
                const path = this.props.match.url.substring(1);
                response.items.forEach(item => {
                    if (path === item.fields.slug) {
                        this.setState({
                            title: path,
                            id: item.sys.id
                        })
                    }
                });
            })
            .then(this.fetchEntry)
            .then(this.setPost)
            .catch(error => {
                new Error('Cannot load post');
            });
    }

    render() {
        return (
            <div>
                <header>
                    <Hero heroId={this.state.heroId} />
                </header>
                {this.state.layers.map(layer => {
                    return <Layer key={layer} layerId={layer} />
                })}
            </div>
        )
    }
}

export default Page;
