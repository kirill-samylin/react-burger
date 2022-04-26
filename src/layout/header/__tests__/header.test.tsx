import {render} from '@testing-library/react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Header} from '../header'

describe('test', function () {
  beforeAll(() => {
    render(
      <Router>
        <Switch>
          <Header />
        </Switch>
      </Router>
    )
  });

  it('Header',  () => {
    const header =  render(
        <Router>
          <Switch>
            <Header />
          </Switch>
        </Router>
    );
    expect(header).toMatchSnapshot();
  });
});
