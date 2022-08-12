import React from 'react';
import SelectMultiple from "react-native-select-multiple";

class selectList extends Component {
  state = { foodList: [] };

  onSelectionsChange = (foodList) => {
    this.setState({ foodList });
  };

  render() {
    return (
      <View>
        <SelectMultiple
          items={foodList}
          selectedItems={this.state.foodList}
          onSelectionsChange={this.onSelectionsChange}
        />
      </View>
    );
  }
}