import React from 'react'
import { StackNavigator } from 'react-navigation'
import Navigator from './components/Navigator'
import { Provider as MobXProvider, observer } from 'mobx-react/native'
import Store from './stores/store'

const store = new Store();

export default observer(class App extends React.Component {
  render() {
    return (
      <MobXProvider store={store}>
        <Navigator />
      </MobXProvider>
    );
  }
})


