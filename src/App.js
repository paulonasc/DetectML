import React, { Component } from 'react';
import Clarifai from 'clarifai';
import ImageRecognition from './components/ImageRecognition/ImageRecognition';
import NavBar from './components/NavBar/NavBar';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';
import LoadingScreen from 'react-loading-screen';

const app = new Clarifai.App({
  apiKey: // API KEY HERE
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      loading: true
    }
  }

  componentDidMount () {
    setTimeout(() =>
      this.setState({ loading: false })
    , 1400)
  }


  // displayBox = (box) => {
  //   console.log(box);
  //   // this.setState({box: box});
  // }

  onInputChange= (event) => {
    this.setState({input: event.target.value});
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // use this link to test 
    // http://3.bp.blogspot.com/-Fk1uB7TLdrg/Vq1v1jtPi3I/AAAAAAAADcQ/5IZZTfDn_TY/s1600/2016%2B01-30%2BFrom%2BWork%2B2.jpg
    // const name = response.hits[0].input.data.concepts[0].name;

    //Show this:
    
    app.inputs.search({ input: {url: this.state.input} })
      .then(response => alert(response.hits[0].input.data.concepts[0].name + '\nServing Size 1 Can\nAmount Per Serving:\nCalories: 140\nTotal Fat: 0g\nSodium: 65mg\nCarbohydrates: 38g\nSugar: 38g\nProtein: 0g'))
      .catch(err => console.log(err));
  }


  render() {
    const { loading } = this.state
    return (
      <div className="App">
        <LoadingScreen
          loading={loading}
          bgColor='#ffffff'
          spinnerColor='#9ee5f8'
          textColor='#676767'
          logoSrc='https://www.freeiconspng.com/minicovers/fitness-icon-png-fitness-nutrition-16.png'
          text='Welcome to DetectML'
        ></LoadingScreen>

        <NavBar />

        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <ImageRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>


      </div>
    );
  }
}

export default App;
