import React from 'react';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: (new Date()).toString(),
      response: "",
    };
  }

  onChange = (e) => this.setState({ date: e.target.value })

  handleSubmit() {
    const url = "http://localhost:8080/RoverExercise?date=" + this.state.date;
    fetch(url, { method: 'GET', mode: 'no-cors' })
      .then((response) => {
        console.log(response);
        return response.json();
      });
  }

  render() {
    return (
      <div class="App">
      <input type="date" name="date" value={this.state.date} onChange={this.onChange} required/>
      <input type="submit" value="Submit" onClick={this.handleSubmit.bind(this)}/>
      <br></br>
      <textarea value={this.state.response} readonly={true}/>
      </div>
    );



  }

}
