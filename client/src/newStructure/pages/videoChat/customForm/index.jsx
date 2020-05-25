import { Button, Form } from 'semantic-ui-react';

import React from 'react';

export class CustomForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleRoomIdChange = this.handleRoomIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRoomIdChange(e) {
    this.props.onRoomIdChange(e.target.value);
  }

  handleSubmit(e) {
    this.props.onSubmit();
  }

  render() {
    let roomIdInput;
    roomIdInput = (
      <input
        type="text"
        onChange={this.handleRoomIdChange}
        placeholder="Enter room ID..."
        style={{
          fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
          fontSize: 15,
          paddingLeft: 5,
        }}
      />
    );

    return (
      <div style={{ marginBlockStart: 20 }}>
        <Form>
          <label>
            Room ID:<span>&nbsp;</span>
            {roomIdInput}
          </label>
          <br />
          <br />
          <Button variant="contained" onClick={this.handleSubmit}>
            Enter
          </Button>
        </Form>
      </div>
    );
  }
}