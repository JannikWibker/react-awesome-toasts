import React from 'react';
import { storiesOf } from '@storybook/react';
import { ToastProvider, ToastConsumer, withToast } from '../src';
import Toast from '../src/Toast';
import * as T from '../src/ToastContext/ToastContext.types';

interface Props {
  toast: T.ToastContext;
}

const toastProps = {
  text: 'Message deleted',
  ariaLabel: 'Message deleted, click to undo',
  actionText: 'Undo',
};

class TestButton extends React.Component<Props> {
  handleClick = () => {
    this.props.toast.show({ ...toastProps, onActionClick: this.props.toast.hide });
  };

  render() {
    return <button onClick={this.handleClick}>Show toast</button>
  }
}

const ToastButton = withToast(TestButton);

storiesOf('Toast', module)
  .add('Using HOC', () => (
    <ToastProvider component={Toast}>
      <ToastButton />
    </ToastProvider>
  ))
  .add('Using consumer', () => (
    <ToastProvider component={Toast}>
      <ToastConsumer>
        {
          ({ show, hide }) => (
            <button onClick={() => show({ ...toastProps, onActionClick: hide })}>
              Show toast
            </button>
          )
        }
      </ToastConsumer>
    </ToastProvider>
  ))
  .add('Custom position', () => (
    <ToastProvider component={Toast} position="top-right">
      <ToastButton />
    </ToastProvider>
  ))
  .add('Custom timeout', () => (
    <ToastProvider component={Toast} timeout={1000}>
      <ToastButton />
    </ToastProvider>
  ));