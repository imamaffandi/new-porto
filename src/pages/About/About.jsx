import React from 'react'
import Transition from '../../utils/transition'
import "./About.css"

const About = () => {
    return (
        <div><section className="footer" data-scroll-section>
            <div className="footer-copy">
                <div className="footer-copy-h1">
                    <a href="#">
                        <h1>Contact</h1>
                    </a>
                </div>
                <div className="footer-copy-text">
                    <p>Digital creative studio</p>
                    <br />
                    <p><a href="#">Twitter</a> • <a href="#">Instagram</a> • <a href="#">LinkedIn</a></p>
                    <br />
                    {/* <p>Toronto, CA {time}</p> */}
                </div>
            </div>
        </section></div>
    )
}

export default Transition(About)