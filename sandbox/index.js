/**
import type as PropsType from {component}
import Component from {component}

class Sandbox extends Component {
  componentDidMount = () => {
    socket.onMessage(this.onMessage)
  }
  onChange = (event, formData) => {
    this.send({props: formData})
  }
  send = (message) => {
    socket.send({id: this.state.id, content: message})
  }
  onMessage = ({id, content: {props} = {}}) => {
    if (this.state.id === id && props) {
      this.setState({ props })
    }
  }
  render () {
    const {path} = this.props
    const {props} = this.state
    return (
      <section className="Sandbox">
        <Toolbar props={props} onChange={this.onChange} />
        <iframe src={path/live} id={id} ref={el => this.iframe = el} />
      </section>
    )
  }
}


**/
