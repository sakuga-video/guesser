import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'


const HistoryUI = () => {
    return (
        <div className="App">
          <header>
            <h1>We now have Auth!</h1>
          </header>
          <AmplifySignOut />
        </div>
      );
}

export default withAuthenticator(HistoryUI);