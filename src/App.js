import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Draggable from 'react-draggable';
import './App.css';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: true,
      popupBodyHeight: 200
    };
    this.mouseDown = false;
    this.initialMouseDown = null;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(event) {
    this.mouseDown = true;
    this.initialMouseDown = event.clientY;
    this.popupBodyHeight = this.state.popupBodyHeight;
  }
  handleMouseUp(){
    this.mouseDown = false;
  }
  handleMouseMove(event){
    if(this.mouseDown){
      let computedHeight = this.popupBodyHeight+event.clientY-this.initialMouseDown;
      if(computedHeight <= 120){
        computedHeight = 121;
      } else if(computedHeight >= 300) {
        computedHeight = 299;
      }
      this.setState({popupBodyHeight: computedHeight});
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <section>
        <Modal show={this.state.show} onHide={this.handleClose} onMouseUp={()=>{this.handleMouseUp()}} onMouseMove={(event)=>{this.handleMouseMove(event)}}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{height:this.state.popupBodyHeight+'px'}}>
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
            <div
              className='handle'
              onMouseDown={(event)=>{this.handleMouseDown(event)}}
            >
            </div>
          </Modal.Footer>
        </Modal>
      </section>
    );
  }
}

export default App;
