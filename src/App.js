import React, {useEffect, useState}  from "react";
import "./style.css";
import { Dropdown } from 'semantic-ui-react';
import GitHubButton from 'react-github-btn';
import 'semantic-ui-css/semantic.min.css';
import Axios from 'axios';


const App = () => {

  const KEY = "90ff367b18d766348e8b06101d8bd380";

  const tempreatureUnits = [
    {key: 'Celsius', text: 'Celsius [°C]', value: 'Celsius'},
    {key: 'Fahrenheit', text: 'Fahrenheit [°F]', value: 'Fahrenheit'},
    {key: 'Kelvin', text: 'Kelvin [K]', value: 'Kelvin'},
    {key: 'Rankine', text: 'Rankine [°Ra]', value: 'Rankine'},
    {key: 'Réamur', text: 'Réamur [°Re]', value: 'Réamur'},
  ]

  const [value1, setValue1] = useState('Celsius');
  const [value2, setValue2] = useState('Select Unit');
  const [valueConvert, setValueConvert] = useState(0);

  useEffect(() => {
    getUserCurrentLocation();
  }, []);

  const getUserCurrentLocation = () => {
    if(navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const getCurrentLocationWeather = async () => {
          const {data} = await Axios.post(
            'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather',{},
            {
              params: {
                lon: position.coords.longitude,
                lat: position.coords.latitude,
                appid: KEY,
                units: 'metric',
                lang: 'en'

              },
            }
          );
          setValueConvert(data.main.temp);
        };
        getCurrentLocationWeather();
      }, showError);
    } else {
      alert("not support")
    }
  }
  const showError = (error) => {
    let errorText = "Unknown error";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorText = "user denied"
        break;
        case error.POSITION_UNAVAILABLE:
       errorText = "location unavailable"
       break;
       case error.TIMEOUT:
         errorText = "timed out"
         break;
         case error.UNKNOWN_ERROR:
           errorText = "unknown error"
           break;
    }
    alert(errorText);
  }
  const swapOperation = () => {
    setValue1(value2);
    setValue2(value1);
  }
  const calculatedValue = () => {
    let convertedValue = 0;

    if(value1 === 'Celsius' && value2 === 'Celsius') {
      convertedValue = Number(valueConvert);
    } 
    if(value1 === 'Celsius' && value2 === 'Fahrenheit') {
      convertedValue = 1.8 * Number(valueConvert) + 32; 
    }
    if (value1 === 'Celsius' && value2 === 'Kelvin') {
      convertedValue = Number(valueConvert) + 273;
    }
    if ( value1 === 'Celsius' && value2 === 'Rankine') {
      convertedValue = (Number(valueConvert) + 273.15) * 1.8;
    }
    if ( value1 === 'Celsius' && value2 === 'Réaumur') {
      convertedValue = Number(valueConvert) * 0.8;
    }

    if(value1 === 'Fahrenheit' && value2 === 'Fahrenheit') {
      convertedValue = Number(valueConvert);
    } 
    if(value1 === 'Fahrenheit' && value2 === 'Celsius') {
      convertedValue =  (Number(valueConvert) - 32) * 5 / 9; 
    }
    if (value1 === 'Fahrenheit' && value2 === 'Kelvin') {
      convertedValue = (Number(valueConvert) + 459.67) * 5 / 9;
    }
    if ( value1 === 'Fahrenheit' && value2 === 'Rankine') {
      convertedValue = Number(valueConvert) + 459.67;
    }
    if ( value1 === 'Fahrenheit' && value2 === 'Réaumur') {
      convertedValue = (Number(valueConvert) - 32) * 4 / 9;
    }

    if(value1 === 'Kelvin' && value2 === 'Kelvin') {
      convertedValue = Number(valueConvert);
    } 
    if(value1 === 'Kelvin' && value2 === 'Celsius') {
      convertedValue =  Number(valueConvert) - 273.15
    }
    if (value1 === 'Kelvin' && value2 === 'Fahrenheit') {
      convertedValue = (Number(valueConvert) * 9 / 5) - 459.67;
    }
    if ( value1 === 'Kelvin' && value2 === 'Rankine') {
      convertedValue = Number(valueConvert) * 9 / 5;
    }
    if ( value1 === 'Kelvin' && value2 === 'Réaumur') {
      convertedValue = (Number(valueConvert) - 273.15) * 4 / 5;
    }

   
    if(value1 === 'Rankine' && value2 === 'Rankine') {
      convertedValue = Number(valueConvert);
    } 
    if(value1 === 'Rankine' && value2 === 'Celsius') {
      convertedValue =  (Number(valueConvert) - 491.67) * 5 / 9;
    }
    if (value1 === 'Rankine' && value2 === 'Fahrenheit') {
      convertedValue = Number(valueConvert) - 459.67;
    }
    if ( value1 === 'Rankine' && value2 === 'Kelvin') {
      convertedValue = Number(valueConvert) * 9 / 5;
    }
    if ( value1 === 'Rankine' && value2 === 'Réaumur') {
      convertedValue = (Number(valueConvert) - 491.67) * 4 / 9;
    }

    if(value1 === 'Réaumur' && value2 === 'Réaumur') {
      convertedValue = Number(valueConvert);
    } 
    if(value1 === 'Réaumur' && value2 === 'Celsius') {
      convertedValue =  Number(valueConvert)  * 5 / 9;
    }
    if (value1 === 'Réaumur' && value2 === 'Fahrenheit') {
      convertedValue = (Number(valueConvert) * 9 / 4) + 32;
    }
    if ( value1 === 'Réaumur' && value2 === 'Kelvin') {
      convertedValue = (Number(valueConvert) * 5 / 4) + 273.15;
    }
    if ( value1 === 'Réaumur' && value2 === 'Rankine') {
      convertedValue = (Number(valueConvert)  * 4 / 9) + 491.67;
    }


     return convertedValue;
     }


  return(
    <div>
      <div className="ui raised very padded container segment" style={{marginTop: "10px", width:"930px"}}>
       <GitHubButton data-icon="octicon-star" data-size="large" data-show-count="true" href="https://github.com/gonzalote99">
         giving start
        
         </GitHubButton>
         <h2 className="ui header block aligned icon center">
         <div className="ui pointing below label">
        click swapp
           </div>
           <i style={{cursor: "pointer"}} className="circular exchange icon" onClick={() => swapOperation()} ></i>
           temperature converter
           </h2>
           <div className="ui message">
            <div className="header">
              note
              </div>
              <p>
              enable location permission
                </p>
             </div>
             <div className="ui placeholder segment">
             <div className="ui two column stackable very relaxed grid">
             <div className="ui vertical divider">
             {value1 === "Select Unit" ? "" : value1} To {value2 === "Select Unit" ? "" : value2}
               </div>
               <div className="middle aligned column">
                 <div className="ui form">
                  <div className="field">
                     <div className="ui pointing below label">
                      current location celsius
                       </div>
                       <div className="ui input focus">
                        <input type="number" onChange={(e) => setValueConvert(e.target.value)} value={valueConvert} placeholder="value to convert" />
                         </div>
                    </div>
                    <div className="field">
                    <Dropdown
                    onChange={(event, data) => setValue1(data.value)}
                    button 
                    className="icon"
                    floating
                    labeled
                    icon="caret down"
                    options={tempreatureUnits}
                    search
                    text={value1}

                    />
                      </div>
                   </div>
                 </div>
                 <div className="middle aligned column">
                 <div className="ui form">
                  <div className="field">
                  <div className="ui label big">
                   {calculatedValue()}
                    </div>

                    </div>
                    <div className="field">
                    <Dropdown
                    onChange={(event, data) => setValue2(data.value)}
                    button 
                    className="icon"
                    floating
                    labeled
                    icon="caret down"
                    options={tempreatureUnits}
                    search
                    text={value2}

                    />
                      </div>
                    </div>
                    </div>

               </div>
               </div>

         <div className="ui bottom left attached label">developer for me<a href="https://github.com/gonzalote99">gonzalote99</a>
           </div>
        </div>

      </div>

  );

} 

export default App;