/* eslint-env es6 */
var React = require('react')
var Relay = require('react-relay')

import { Mutation } from 'react-relay';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://192.168.1.6:1337/graphql'
  )
);

class Post extends React.Component {
  render() {
    return <li>{ this.props.post.title }</li>
  }
}

class Posts extends React.Component {
  render() {
    let page = this.props.page;
    let posts = page.posts

    return (
      <div>
      <h2>Posts Page:</h2>
        <ul>
        {
          posts.map(function(post) {
            console.log(post);
            return <Post post={ post }></Post>
          })
        }
        </ul>
      </div>
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
