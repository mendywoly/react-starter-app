import React, { Component } from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
export default class SideBar extends Component {
    state = {
        activeItem: 'dashboard',
    };

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

  render() {
    const {activeItem} = this.state;

    return (
      <div>
        <Menu fixed='left' vertical>
            <Menu.Item as={Link} to={'/'} name='dashboard' active={activeItem === 'dashboard'}
                        onClick={this.handleItemClick}>
                    Dashboard
            </Menu.Item>
        </Menu>
      </div>
    )
  }
}
