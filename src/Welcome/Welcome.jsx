import React from 'react'
import './Welcome.css'

export default function Welcome() {
    return (
        <>
            <div class="fadeInUp-animation fadeInTitle">Welcome To Mav Exam Scheduler!</div>
            <div className="info-container">
                <div className="info-box fadeInUp-animation">
                    <h2>About This Website</h2>
                    <p>Looking at big PDF master plans like <a href="https://cdn.web.uta.edu/-/media/project/website/administration/registrar/documents/exam-schedules/spring2024-master.ashx" target="_blank">this</a> to find your exam schedule is <h2 className='emoji'>🤢</h2> </p>
                    <p>Mav Exam Scheduler is designed to streamline your exam scheduling process. The aim is to provide an efficient and user-friendly platform to manage your academic calendar.</p>
                    <p>Simply go to Search, choose a semester/course (or both!) and easily add your examss to your personal calendar with schedule and venue!</p>
                </div>
                <div className="info-box fadeInUp-animation">
                    <h2>Disclaimer</h2>
                    <p>While I, the author and builder, have made every effort to ensure the accuracy and reliability of the information provided, I cannot guarantee its completeness or correctness. Users are strongly advised to double-check with their instructor or refer to the master plan to ensure they have the most current and accurate information. I am not responsible for any errors or omissions, or for any outcomes related to the use of this information. </p>
                </div>
            </div>
        </>
    )
}
