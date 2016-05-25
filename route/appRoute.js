'use strict';

import Relay from 'react-relay';

export default class extends Relay.Route {
  static queries = {
    page: (Component) => Relay.QL`
      query {
        posts(offset: 0) { ${Component.getFragment('page')} }
      }
    `,
  };

  static routeName = 'AppRoute';
}
