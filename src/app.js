import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: (new Date()).toString()
    };
  }

  onChange = (e) => this.setState({ date: e.target.value })

  handleSubmit(e) {
//     var date = this.state.date;
//     window.location.href = "localhost:8080/RoverExercise?date=" + date;
    e.preventDefault();
    fetch(`/RoverExercise?date=${encodeURIComponent(this.state.date)}`)
      .then(response => response.json());
  }

  render() {
    return (
      <div class="App">
      <input type="date" name="date" value={this.state.date} onChange={this.onChange} required/>
      <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
      </div>

    );



  }

}

/*
export default function App() {
  return (
    <div className="App">
    <input type="date"  name="date" ng-model="value"
    placeholder="MM-DD-YYYY" min="06-03-2015" max="03-17-2022" required/>
    <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
    </div>
  );
}*/
