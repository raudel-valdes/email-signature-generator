import React, { Component } from 'react';
import './Stylesheet.css'

class Form extends React.Component {
  state= {
    firstName: '',
    lastName: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    display: false,
    logo:'default',
    editEmail:'',
    button: true,
  }

  answeredAllFields(){
    const {firstName, lastName, jobTitle, email, phoneNumber, logo} = this.state
    if( 
      firstName.trim() !== '' && 
      lastName.trim() !== '' && 
      jobTitle.trim() !== '' &&
      email.trim() !== '' &&
      phoneNumber.trim() !== '' && 
      logo.trim() !== ''
    ) {
        this.setState({button: false});
    }
  }

  valueUpdate(data) {    
    const {email} = this.state

    this.setState({ [data.target.name]: data.target.value});
    this.setState({editEmail: "mailto:" + email});
    this.answeredAllFields();

    if(data.target.name === "phoneNumber") {
      this.setState({ [data.target.name]: data.target.value.replace(/[^\d]/g,'')});
    }
  };

  submitForm(event) {
    event.preventDefault();
    this.setState({ display: true})
    this.editPhoneNumber();    
  }

  changeLogo(data, value) {
    const {logo} = this.state
    console.log(logo);
    if ((data.target.checked === true && value === "red") || value === "default") {
      this.setState({logo: "red"})
      console.log(logo);
    }
    else 
    {
      this.setState({logo: "blue"})
      console.log(logo);
    }
  }

  editPhoneNumber(){
    const {phoneNumber} = this.state;
    
    let firstThree = phoneNumber.slice(0,3);
    firstThree += ".";

    let secondThree = phoneNumber.slice(4,7);
    secondThree += ".";

    let lastFour = phoneNumber.slice(7, 11);
    
    let newPhoneNumber = firstThree + secondThree + lastFour;
    this.setState({phoneNumber: newPhoneNumber});
  }

 

  render() {
    const {firstName, lastName, jobTitle, email, phoneNumber, display, logo, button, editEmail} = this.state
    return (
      <div className="formContainer">
        <form className="form">
          <h1>Email Signature Generator</h1>
          <h4>First Name: </h4>
          <input
            name="firstName"
            placeholder="John" 
            value={firstName} 
            onChange={ (data) => this.valueUpdate(data)}
          />
          <br />

          <h4>Last Name: </h4>
          <input
            name="lastName"
            placeholder="Doe" 
            value={lastName} 
            onChange={ (data) => this.valueUpdate(data)}
          />
          <br />

          <h4>Job Title: </h4>
          <input
            name="jobTitle"
            placeholder="Dev Lead" 
            value={jobTitle} 
            onChange={ (data) => this.valueUpdate(data)}
          />
          <br />

          <h4>Email: </h4>
          <input            
            name="email"
            placeholder="john.doe@email.com" 
            value={email} 
            onChange={ (data) => this.valueUpdate(data)}
          />
          <br /> 

          <h4>Phone Number: </h4>
          <input
            maxLength= "10"
            type="text"
            name="phoneNumber"
            placeholder="502.666.6666" 
            value={phoneNumber} 
            onChange={ (data) => this.valueUpdate(data)}
          />
          <br />

          <div>
            Red 
            &nbsp;
            <input 
              type="radio" 
              name="button" 
              value="red" 
              onChange={(data) => {this.changeLogo(data, "red"); this.answeredAllFields();}}
            />

            &nbsp;

            Blue
            &nbsp;

            <input 
              type="radio" 
              name="button" 
              value="blue"
              onChange={(data) => {this.changeLogo(data); this.answeredAllFields();}} 
            /> 
            <br />
            <br />

          </div>

          <button onClick={(event) => this.submitForm(event)} disabled={button}>
            Submit
          </button>
          
        </form>

        {(display === true) &&
          <div style={{display: 'flex', backgroundColor: 'white', borderRadius:'20px', margin: '20px'}}>
            {(logo === "red" || logo === "default")&&
              <div>
                <img src={ require('../imgs/redInteraptLogo.png')} alt="red Interapt logo" />
              </div>
            }

            {(logo === "blue")&&
              <div>
                <img src={require('../imgs/blueInteraptLogoedit.png')} width="95px" hight="95px" alt="blue Interapt logo"/>
              </div>
            }
            
            <div style={{margin: '20px', lineHeight: '5px'}}>
              <div>                
                <p style={{color: (logo === 'red' || logo === 'default') ? 'rgb(255,42,84)' : 'lightblue' , fontWeight: '800', textTransform: 'uppercase', fontSize: '18px' }}>{firstName} {lastName}</p>
       
                <p><i>{jobTitle}</i></p>
                
                <a style={{color: 'rgb(0,0,0)'}} href={editEmail}>
                  <p>{email}</p>
                </a>
                
                <p>{phoneNumber}</p>

                <a style={{ color: (logo === 'red' || logo === 'default') ? 'rgb(255,42,84)' : 'lightblue' }} href="https://www.interapt.com">
                  <p>www.interapt.com</p>
                </a>
              </div>

              <div>
                <p>
                  <a href="https://www.facebook.com/interapt">
                    <img src={require('../imgs/facebookLogo.png')} alt="Facebook logo" />
                  </a>

                  <a style={{margin: '10px'}} href="https://plus.google.com/+Interapt">
                    <img src={require('../imgs/googleLogo.png')} alt="Google logo" />
                  </a>     

                  <a style={{margin: '5px'}} href="https://www.instagram.com/interapt/">
                    <img src={require('../imgs/instagramLogo.png')} alt="Instagram logo" />
                  </a>

                  <a style={{margin: '5px'}} href="https://www.linkedin.com/company/interapt/">
                <img src={require('../imgs/linkedinLogo.png')} alt="Linkedin logo" />
                  </a>

                  <a style={{margin: '5px'}} href="https://twitter.com/interapt">
                  <img src={require('../imgs/twitterLogo.png')} alt="Twitter logo" />
                  </a>

                  <a style={{margin: '5px'}} href="https://www.youtube.com/interapt">
                    <img src={require('../imgs/youtubeLogo.png')} alt="Youtube logo" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        }  
      </div>               
    );
  }
}

export default Form;

