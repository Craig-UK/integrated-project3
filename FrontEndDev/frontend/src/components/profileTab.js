import React from 'react'
import{ Divider, Tab } from 'semantic-ui-react'

function profileTab(){
    const colors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
      ]
      
      const panes = [
        {
          menuItem: 'Posts',
          render: () => <Tab.Pane attached={false}>Tab 1 Content</Tab.Pane>,
        },
        {
          menuItem: 'Likes',
          render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
        },
        {
          menuItem: 'Tab 3',
          render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
        },
      ]
    state = { color: colors[0] }

    handleColorChange = (e) => this.setState({ color: e.target.value })
  

  
      return (
        <div>
          <select onChange={this.handleColorChange}>
            {_.map(colors, (c) => (
              <option key={c} value={c}>
                {_.startCase(c)}
              </option>
            ))}
          </select>
  
          <Divider hidden />
  
          <Tab
            menu={{ color, inverted: true, attached: false, tabular: false }}
            panes={panes}
          />
        </div>)
    
    }


export default profileTab();