import React from 'react';

class SearchForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
        />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

export default SearchForm;
