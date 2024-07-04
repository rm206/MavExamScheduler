import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import './Contact.css'

export default function Contact() {
    return (
        <>
            <div class="fadeInUp-animation fadeInTitle">Contact Me!</div>
            <div className="info-container">
                <div className="info-box fadeInUp-animation">
                    <p>Thank you for showing interest in getting in touch with me. I am open to opinions, ideas and collaboration. If you find any inaccuracies or have any suggestions, please reach out to me!</p>

                    <div className="contact-links">
                        <a href="https://github.com/rm206" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className="icon" color="#4d4d4e" size="3x" />
                        </a>
                        <a href="https://www.linkedin.com/in/rishabh-mediratta/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} size="3x" />
                        </a>
                        <span className="email"><code>panicpark60 [at] gmail [dot] com</code></span>
                    </div>

                </div>
            </div>
        </>
    )
}
