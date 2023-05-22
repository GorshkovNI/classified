import React, {useEffect, useState} from "react";
import axios from 'axios';
export const FeedbackForm = ()=>{
    const[topic,setTopic] = useState('');
    const[email,setEmail] = useState('');
    const[message,setMessage] = useState('');


    const handlerChangeTopic = (event)=>{
        setTopic(event.target.value)
    }
    const handlerChangeEmail = (event)=>{
        setEmail(event.target.value)
    }
    const handlerChangeMessage = (event)=>{
        setMessage(event.target.value)
    }
    const handleSubmit =(event)=>{
            event.preventDefault();
            axios.post('http://localhost:8080/feedback/feedback', {
              email: email,
              text: message,
              topic: topic
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
          }
        
    
    return(
        <form className="container" style={{ width: '26rem' }} onSubmit={handleSubmit}>
                <div className="form-outline mb-4 ">
                    <input type="text" id="form4Example1" value={topic} name="topic" className="form-control" onChange={handlerChangeTopic}/>
                    <label className="form-label" htmlFor="form4Example1" style={{ marginLeft: '0px' }}>Topic</label>
                    <div className="form-notch"><div className="form-notch-leading" style={{ width: '9px' }}></div>
                        <div className="form-notch-middle" style={{ width: '42.4px' }}>
                        </div>
                        <div className="form-notch-trailing">
                        </div>
                    </div>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" value={email} id="form4Example2" name="email" className="form-control" onChange={handlerChangeEmail}/>
                    <label className="form-label" htmlFor="form4Example2" style={{ marginLeft: '0px' }}>Email address</label>
                    <div className="form-notch"><div className="form-notch-leading" style={{ width: '9px' }}>
                    </div>
                        <div className="form-notch-middle" style={{ width: '88.8px' }}>
                        </div>
                        <div className="form-notch-trailing">
                        </div>
                    </div>
                </div>
                <div className="form-outline mb-4">
                    <textarea value={message} className="form-control" name="message" id="form4Example3" rows="4" onChange={handlerChangeMessage}></textarea>
                    <label className="form-label" htmlFor="form4Example3" style={{ marginLeft: '0px' }}>Message</label>
                    <div className="form-notch">
                        <div className="form-notch-leading" style={{ width: '9px' }}>
                        </div>
                        <div className="form-notch-middle" style={{ width: '60px' }}>
                        </div>
                        <div className="form-notch-trailing">
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Send <i className="bi bi-send"></i></button>
            </form>
    )
}