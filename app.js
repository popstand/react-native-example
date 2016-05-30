/* eslint-env es6 */
import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import Relay, { Mutation } from 'react-relay';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:1337/graphql'
  )
);

class Post extends React.Component {
  render() {
    return <Text>{ this.props.post.title }</Text>
  }
}

class Posts extends React.Component {
  render() {
    let page = this.props.page;
    let posts = page.posts;

    console.log(this.props);

    return (
      <View style={{marginTop: 30}}>
      <Text>Posts Page:</Text>
        <View>
        {posts.map((post) => <Post key={post.id} post={ post } />)}
        </View>
      </View>
    )
  }
}

// The component we need to export is a Relay wrapper around our App component
// from above. It declares the GraphQL fragments where we list the properties
// we want to be fetched – eg, user.name, user.widgets.edges, etc

let PostContainer = Relay.createContainer(Post, {
  fragments: {
    post: () => Relay.QL`
      fragment on Post {
        id
        title
      }
    `,
  },
})

exports.PostList = Relay.createContainer(Posts, {
  fragments: {
    // The property name here reflects what is added to `this.props` above.
    // This template string will be parsed by babel-relay-plugin when we browserify.
    page: () => Relay.QL`
      fragment on Viewer {
        posts { id, title }
      }
    `,
  },
})

// The Relay root container needs to know what queries will occur at the top
// level – these configurations are currently called Routes in Relay, but this
// name is misleading and under review so we don't use it here.
exports.queries = {
  name: 'AppQueries', // can be anything, just used as an identifier
  params: {},
  queries: {
    // We can use this shorthand so long as the component we pair this with has
    // a fragment named "user", as we do above.
    page: (Component) => Relay.QL`
      query {
        posts(offset: 0) { ${Component.getFragment('page')} }
      }
    `,
  },
}
