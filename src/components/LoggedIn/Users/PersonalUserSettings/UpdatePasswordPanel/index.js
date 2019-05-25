import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class UpdatePasswordPanel extends Component {

  state = {
    submitLoading: false,
  };

  handleSubmitForm = async (event) => {
    event.preventDefault();
  };

  render() {
    const { submitLoading } = this.state;
    const btnTitle = submitLoading ? 'Načítavam' : 'Uložiť';

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>
          <Panel.Title>
            Nastaviť nové prihlasovacie heslo
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <form onSubmit={this.handleSubmitForm} method="POST">
            <fieldset disabled={submitLoading}>
              <div className="form-group">
                <label>Staré heslo</label>
                <input type="password" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Nové heslo</label>
                <input type="password" className="form-control" required />
              </div>
              <div className="form-group">
                <label>Potvrdiť nové heslo</label>
                <input type="password" className="form-control" required />
              </div>
            </fieldset>
            <div className="text-right">
              <button disabled={submitLoading} type="submit" className="btn btn-primary">{btnTitle}</button>
            </div>
          </form>
        </Panel.Body>
      </Panel>
    );
  }
}

UpdatePasswordPanel.propTypes = {
};

UpdatePasswordPanel.defaultProps = {
};
 
export default UpdatePasswordPanel;