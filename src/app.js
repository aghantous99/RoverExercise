
const handleSubmit = event => {

};


export default function App() {
  return (
    <div className="App">
    <input type="date"  name="input" ng-model="value"
        placeholder="MM-DD-YYYY" min="06-03-2015" max="03-17-2022" required/>
    <input type="submit" value="Submit" />
    </div>
  );
}
