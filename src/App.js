import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import loading from './assets/loading200.gif';
import intro from './assets/intro.jpg';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.png';
import img3 from './assets/img3.jpg';
import img4 from './assets/img4.png';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import img7 from './assets/img7.png';
import img8 from './assets/img8.png';
import car1 from './assets/car1.jpg';
import car2 from './assets/car2.jpg';
import car3 from './assets/car3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css';
import songmp3 from './assets/PERDMV.mp3';


const getCountdown = () => {
  const hour = 3600;
  const day = hour *  24;
  const month = day * 30;
  const wedd = 1678564800;
  const now = Math.floor(Date.now() / 1000);
  let totalLeft = wedd - now;
  const monthLeft = Math.floor(totalLeft / month);
  totalLeft = totalLeft - (monthLeft * month);
  const dayLeft = Math.floor(totalLeft / day);
  totalLeft = totalLeft - (dayLeft * day);
  const hourLeft = Math.floor(totalLeft / hour);
  return [monthLeft, dayLeft, hourLeft];
};

function App() {
  const [initialLoad, setInitialLoad] = useState(false);
  const [enter, setEnter] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState([0, 0, 0]);
  const [playing, setPlaying] = useState(false);
  const [inviteData, setInviteData] = useState('');
  const [confirmacionOk, setConfirmacionOk] = useState(false);
  let content;

  useEffect(() => {
    //get countdown
    setTimeLeft(getCountdown());
    //preload images
    const imageList = [intro, img1, img2, img3, img4, img5, img6, img7, img8, car1, car2, car3];
    imageList.forEach((image) => {
      new Image().src = image;
    });

    setTimeout(() => {
      setInitialLoad(true);
    }, 2000);
  }, []); // eslint-disable-line

  const playAudio = () => {
    const song = document.getElementById('song'); 
    song.play(); 
    setPlaying(true);
  };

  const pauseAudio = () => {
    const song = document.getElementById('song'); 
    song.pause(); 
    setPlaying(false);
  };

  const toggleAudio = () => {
    if(playing) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const editNames = (e) => {
    setInviteData(e.target.value);
  };

  const sendEmail = (body, callback) => {
    if(window.Email) {
      window.Email.send({
        Host: "smtp.elasticemail.com",
        Username: "wedd.dani.jorge@gmail.com",
        Password: "B6E151D762ABEC66E74C2A6E2F1A7D324AAD",
        To: 'kimgorgd@gmail.com',
        From: "wedd.dani.jorge@gmail.com",
        Subject: "[Confirmacion Asistencia] Boda Kim y Alex",
        Body: body,
      })
        .then(function (message) {
          callback();
          console.log('||--message', message);
        });
    } 
  };

  const submitInvites = () => {
    if(inviteData !== '') {
      let body = 'Confirmación asistencia a la boda:<br /><br />';
      body += inviteData;
      body += '<br />--------------------';
      sendEmail(body, () => {
        setConfirmacionOk(true);
      });
    } 
  };

  const enterInvite = () => {
    setEnter(true);
    playAudio();
    setTimeout(() => {
      setFadeIn(true);
    }, 200);
  };

  if(!initialLoad) {
    content = (
      <div className="App-loading">
        <img src={loading} alt="Loading..." style={{width: '30%', display: 'block', margin: '90px auto 0 auto'}} />
      </div>
    );
  }

  if(initialLoad && !enter) {
    content = (
      <div className="App-loading" style={{position: 'relative'}}>
        <img src={intro} alt=" " style={{width: '100%', display: 'block'}} />
        <button className="enter-button" onClick={enterInvite} style={{display: 'block', position: 'absolute', top: '60%', left: '50%'}}>Entrar</button>
      </div>
    );
  }

  if(initialLoad && enter) {
    content = (
      <div className={`App ${fadeIn ? 'fadeIn' : ''}`}>
        {/* Imagen */}
        <img src={img1} alt="Kim & Alex" style={{width: '100%', display: 'block'}} />
        <div style={{width: '100%', height: 16, display: 'block', backgroundColor: '#A49B7A'}}></div>
        {/* Quote */}
        <img src={img2} alt="Kim & Alex" style={{width: '100%', display: 'block'}} />
        {/* Versiculo */}
        <img src={img3} alt="Kim & Alex" style={{width: '100%', display: 'block'}} />
        <div style={{width: '100%', height: 12, display: 'block', backgroundColor: '#A49B7A'}}></div>
        {/* Fecha lugar contador */}
        <div style={{position: 'relative'}}>
          <img src={img4} alt=" " style={{width: '100%', display: 'block', position: 'absolute', left: '0%', top: '0%'}} />
          <img src={img5} alt=" " style={{width: '100%', display: 'block', position: 'absolute', left: '0%', bottom: '0%'}} />
          <div className="dat-time" style={{display: 'flex', justifyContent: 'center', color: '#737A62', fontFamily: 'Playfair', paddingTop: 164}}>
            <div>
              <div style={{fontSize: '23px', lineHeight: '21px', borderTop: '1px solid #737A62', borderBottom: '1px solid #737A62', padding: '4px 8px'}}>Sábado</div>
            </div>
            <div className="days">
              <div style={{fontSize: '56px', lineHeight: '14px', padding: '0 6px'}}>11</div>
            </div>
            <div>
              <div style={{fontSize: '23px', lineHeight: '21px', borderTop: '1px solid #737A62', borderBottom: '1px solid #737A62', padding: '4px 8px'}}>Marzo</div>
            </div>
          </div>
          {/* ceremonia */}
          <h2 style={{fontFamily: 'Playfair', color: '#6D5E1A', fontSize: 16, fontWeight: 400, paddingTop: 40}}>Ceremonia Religiosa</h2>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#737A62', fontSize: '14px', lineHeight: '16px', fontWeight:600, padding: '4px 0'}}>2:00pm</p>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#706F6F', fontSize: 12, lineHeight: '16px'}}>Iglesia San José de la montaña<br /><a style={{fontSize: 11}} href="https://maps.app.goo.gl/ddh4M9p8X3QhQwkv5?g_st=ic" target="_blank">Ver ubicación aquí</a></p>
          {/* recepción */}
          <h2 style={{fontFamily: 'Playfair', color: '#6D5E1A', fontSize: 16, fontWeight: 400, paddingTop: 40}}>Recepción</h2>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#737A62', fontSize: '14px', lineHeight: '16px', fontWeight:600, padding: '4px 0'}}>4:00pm</p>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#706F6F', fontSize: 12, lineHeight: '16px'}}>V Entertainment CR<br /><a style={{fontSize: 11}} href="https://maps.app.goo.gl/Ss3iJzv4ns3aKEF7A?g_st=ic" target="_blank">Ver ubicación aquí</a></p>
          {/* countdown */}
          <div className="counter" style={{display: 'flex', justifyContent: 'center', color: '#6D5E1A', padding: '40px 0 120px 0'}}>
            <div className="months">
              <div style={{fontFamily: 'Playfair', paddingBottom: '4px', fontSize: '36px'}}>{("0" + timeLeft[0]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>MESES</div>
            </div>
            <div className="days" style={{padding: '0 22px'}}>
              <div style={{fontFamily: 'Playfair', paddingBottom: '4px', fontSize: '36px'}}>{("0" + timeLeft[1]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>DÍAS</div>
            </div>
            <div className="hours">
              <div style={{fontFamily: 'Playfair', paddingBottom: '4px', fontSize: '36px'}}>{("0" + timeLeft[2]).slice(-2)}</div>
              <div style={{fontFamily: 'MontserratExtraLight', fontSize: 12, letterSpacing: '2px'}}>HORAS</div>
            </div>
          </div>
        </div>
        <div style={{width: '100%', height: 12, display: 'block', backgroundColor: '#A49B7A'}}></div>
        {/* Carousel */}
        <div> 
          <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            interval={3500}
          >
            <div>
                <img src={car1} alt=" " />
            </div>
            <div>
                <img src={car2} alt=" " />
            </div>
            <div>
                <img src={car3} alt=" " />
            </div>
          </Carousel>
        </div>
        {/* Codigo obsequio */}
        <div style={{position: 'relative'}}>
          <img src={img6} alt=" " style={{width: '40%', display: 'block', position: 'absolute', right: '0%', top: '0%'}} />
          <img src={img7} alt=" " style={{width: '40%', display: 'block', position: 'absolute', left: '0%', bottom: '0%'}} />
          <h2 style={{fontFamily: 'Playfair', color: '#6D5E1A', fontSize: 20, fontWeight: 400, paddingTop: 50, paddingBottom: 16}}>Código de vestimenta</h2>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#706F6F', fontSize: '14px', lineHeight: '22px', paddingBottom: 30}}>
            Vestimenta formal<br />
            No recomendable tacón aguja<br />
            Si te aconsejamos llevar abrigo
          </p>
          <h2 style={{fontFamily: 'Playfair', color: '#6D5E1A', fontSize: 20, fontWeight: 400, paddingTop: 20, paddingBottom: 16}}>Obsequios</h2>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#706F6F', fontSize: '14px', lineHeight: '22px', paddingBottom: 50}}>
            Nuestro mayor regalo será<br />
            su compañía, en este día tan especial.<br />
            Pero si desean hacernos un obsequio,<br />
            aceptamos las muestras de cariño en efectivo.<br />
            Pueden colocar su presente en un sobre<br />
            y depositarlo en un buzón el día de la boda,<br />
            o también a nuestros números de cuenta.
          </p>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#706F6F', fontSize: '14px', lineHeight: '22px', paddingBottom: 30}}>
            <strong>IBAN BAC COLONES</strong><br />
            <strong>CR91010200009311767054</strong><br />
            Alex Gerardo Elizondo Villalobos<br />
            ced. 206010229
          </p>
          <p style={{fontFamily: 'MontserratExtraLight', color: '#706F6F', fontSize: '14px', lineHeight: '22px', paddingBottom: 70}}>
            <strong>IBAN BAC DOLARES</strong><br />
            <strong>CR69010200009479995617</strong><br />
            Kimberly Gamboa Delgado<br />
            ced. 206340918
          </p>
        </div>
        {/* Asistencia*/}
        <div style={{position: 'relative'}}>
          <img src={img8} alt=" " style={{width: '100%', display: 'block', position: 'absolute', left: '0%', top: '0%'}} />
          <div style={{position: 'relative'}}>
            <h2 style={{fontFamily: 'Playfair', color: '#FFFFFF', fontSize: 20, fontWeight: 400, paddingTop: 12}}>CONFIRMAR ASISTENCIA</h2>
            <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, lineHeight: '18px', paddingTop: 8}}>Para el descanso de los niños y el disfrute<br />de los padres, este evento será solo para adultos.</p>
            <input type="text" className="input-confirm" name="invite-names" placeholder="Nombre(s) completo(s)" onChange={(e) => { editNames(e)}} style={{fontFamily: 'MontserratExtraLight', minWidth: '60%', marginTop: 10}}/>
            <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, lineHeight: '14px', paddingTop: 10}}>Confirmar asistencia con <strong>Andrea al 86870514</strong></p>
            <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, lineHeight: '14px', paddingTop: 6}}>antes del <strong>11 de febrero</strong></p>
            {!confirmacionOk && 
            <button className="confirm-button" onClick={submitInvites} style={{marginTop: 10}}>Confirmar</button>
            }
            {confirmacionOk && 
              <p style={{fontFamily: 'MontserratExtraLight', color: '#FFFFFF', fontSize: 12, marginTop: 10}}><strong>Confirmación enviada. Gracias!</strong></p>
            }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <audio autoPlay id="song">
        <source src={songmp3} type="audio/mpeg" />
      </audio>
      {content}
    </div>
  );
}

export default App;
