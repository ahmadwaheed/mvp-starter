import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
//import Search from './components/Search.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '', 
      items: []
    }
    this.onceChanged = this.onceChanged.bind(this);
    this.search = this.search.bind(this);
    this.searchInvoker=this.searchInvoker.bind(this);
    this.historyDisplayer = this.historyDisplayer.bind(this);
    this.currentElement = this.currentElement.bind(this);
    // this.currentSearch = this.currentSearch.bind(this);
    // this.currentSearchInvoker = this.currentSearchInvoker.bind(this);
  }

  onceChanged(e) {
    console.log('term is', this.state.term);
    this.setState({
      term: e.target.value
    });
  }

  historyDisplayer() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        console.log('the type of data is ', data);
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  searchInvoker() {
    this.search(this.state.term);
  }

  search(term) {
    console.log('this is term', term);
    $.ajax({
      url: '/items',
      method: 'post',
      data: {term},
      success: function() {
        console.log('data has successfully been request');
      }, 
      error: function(err) {
        console.log('following error has occured', err);
      }
    });
  }


  currentElement() {
    var newArr =[];
    $.ajax({
      url: '/items', 
      success: (data) => {
        console.log('data in current element is ', data);
        newArr.push(data[data.length -1]);
        this.setState({
          items: newArr
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  // currentSearchInvoker() {
  //   this.currentSearch(this.state.term);
  // }

  // currentSearch(term) {
  //   console.log('term inside currentSearch is ', term);
  //   $.ajax({
  //     url: '/current', 
  //     method: 'post', 
  //     data: {term},
  //     success: function(data) {
  //       console.log('data has successfully been sent from current Search');
  //     }, 
  //     error: function(err) {
  //       console.log('error has occured while sending the the post req to /current');
  //     }
  //   });
  // }

  render () {
    return (<div>
      <h1>Air Quality Index</h1>
      <input type='text' value={this.state.term} onChange={this.onceChanged}/>       
      <button onClick={this.searchInvoker}>Search</button>
      <button onClick={this.currentElement}>View Current Element</button>
      <button onClick={this.historyDisplayer}>View History</button>

      <List items={this.state.items}/>
    </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));