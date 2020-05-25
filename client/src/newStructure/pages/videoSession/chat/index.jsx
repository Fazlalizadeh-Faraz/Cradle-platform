import $ from 'jquery';
import Button from '@material-ui/core/Button';
import { ChatHistory } from './history';
import Input from '@material-ui/core/Input';
import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class ChatComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chatHistory: [], // array of message objects
      pendingInput: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.getSender = this.getSender.bind(this);

    this.props.connection.onmessage = this.appendRemoteMessage.bind(this);
  }

  appendRemoteMessage(event) {

    let sender = this.getSender(true);


    this.setState(
      {
        pendingInput: '',
        chatHistory: this.state.chatHistory.concat({
          senderName: event.data.senderName,
          sender: sender,
          text: event.data.msg,
        }),
      },
      function () {
        // scroll to the bottom of chat
        $('#chatHistory').scrollTop(
          $('#chatHistory')[0].scrollHeight - $('#chatHistory')[0].clientHeight
        );
      }
    );
  }

  handleSubmit(event) {

    let data = {
      msg: this.state.pendingInput,
      senderName: this.props.user.firstName,
    };

    this.props.connection.send(data);

    let sender = this.getSender();

    this.setState(
      {
        pendingInput: '',
        chatHistory: this.state.chatHistory.concat({
          senderName: this.props.user.firstName,
          sender: sender,
          text: this.state.pendingInput,
        }),
      },
      function () {
        // scroll to the bottom of chat
        $('#chatHistory').scrollTop(
          $('#chatHistory')[0].scrollHeight - $('#chatHistory')[0].clientHeight
        );
      }
    );
  }

  handleChange(event) {

    this.setState({
      pendingInput: event.target.value,
    });
  }

  handleKeyDown(event) {
    // user presses enter
    if (event.keyCode == 13) {
      this.handleSubmit(event);
    }
  }

  getSender(isRemote) {
    if (isRemote) {
      if (this.props.isOpener) {
        return 'joiner';
      } else {
        return 'opener';
      }
    } else {
      if (this.props.isOpener) {
        return 'opener';
      } else {
        return 'joiner';
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div
        style={{
          height: `100%`,
          width: `25%`,
          borderLeft: `1px solid black`,
          backgroundColor: `white`,
        }}>
        <ChatHistory chatHistory={this.state.chatHistory} />
        <div
          style={{
            height: 95,
            width: `100%`,
            paddingLeft: 10,
            paddingRight: 10,
            boxShadow: `0px -1px 100px 1px rgba(50, 50, 50, 0.75)`,
          }}>
          <Button
            size="small"
            color="primary"
            className={classes.button}
            style={{
              position: `absolute`,
              right: `15px`,
              padding: `0`,
              fontSize: `10px`,
              marginRight: `0`,
            }}>
            Send
          </Button>

          <form
            id="chatForm"
            style={{ paddingRight: 35 }}>
            <Input
              id="outlined-multiline-static"
              multiline
              rows="4"
              placeholder="Send a message..."
              margin="normal"
              variant="outlined"
              style={{
                width: '100%',
                margin: '0',
              }}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={this.state.pendingInput}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.currentUser,
});

export const Chat = connect(
  mapStateToProps,
  null
)(withStyles(styles)(ChatComponent));