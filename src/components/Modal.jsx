import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  hadleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { targetImg } = this.props;

    return (
      <div className="overlay" onClick={this.hadleOverlayClick}>
        <div className="modal">
          <img src={targetImg} alt="" />
        </div>
      </div>
    );
  }
}
