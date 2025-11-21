import React from 'react'
import Transition from '../../utils/transition'
import { SmoothScroll } from '../../components'
import "./Contact.css"

const Contact = () => {
    return (
        <div>
            <SmoothScroll />
            <section className='h-[60dvh] bg-black'></section>
            <section className="footer" data-scroll-section>
                <div className="footer-copy">
                    <div className="footer-copy-h1">
                        <a href="#">
                            <h1>Contact</h1>
                        </a>
                    </div>
                    <div className="footer-copy-text">
                        <p>Digital creative studio</p>
                        <br />
                        <p><a href="#">Whatsapp</a> • <a href="#">Instagram</a> • <a href="#">LinkedIn</a></p>
                        <br />
                        {/* <p>Toronto, CA {time}</p> */}
                    </div>
                </div>
            </section></div>
    )
}

export default Transition(Contact)