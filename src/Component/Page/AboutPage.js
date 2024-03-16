import React from 'react'
import NavBar from '../Component/NavBar'
import { Col, Row } from 'antd'
import Footer from '../Component/Footer';

function AboutPage() {
    return (
        <div>
            <NavBar />
            <div className='aboutPageBackground'></div>
            <Row className='aboutPageInnerNew'>
                <Col span={3}></Col>
                <Col span={18} id='text'>
                    <h1>About Us</h1>
                    <p>Welcome to Dream Wheels Exotics, where we turn dreams into realities, and aspirations into experiences. For over a decade, we've been on a mission to make the exhilaration of driving a supercar accessible to everyone. Our passion for performance, luxury, and customer satisfaction has fueled our journey since day one.</p>
                    <Row id='contentRow' className='contentRowFirstOne'>
                        <Col span={12} xl={12} lg={12} xs={24}>
                            <h1>Our Mission</h1>
                            <p>At Dream Wheels Exotics, we're dedicated to making supercar thrills accessible to all. With a decade of expertise, our fleet of 55+ meticulously maintained vehicles ensures every client finds their dream ride. We're committed to exceeding expectations, with 3745 satisfied customers and 4255 completed orders. Join us for an unforgettable journey, where dreams become realities with every exhilarating drive.</p>
                        </Col>
                        <Col span={12}  xl={12} lg={12} xs={0}>
                            <div id='Image'><img src='https://qph.cf2.quoracdn.net/main-qimg-bd7a4e7b5e4aa805c30d69460fefec1b-lq' alt='carFleet' /></div>
                            </Col>
                    </Row>
                    <Row id='contentRow1'>
                        <Col span={12}  xl={12} lg={12} xs={0}>
                            <div id='Image'><img src='https://images-cdn.redletterdays.co.uk/common/client/Images/Product/Large/en-GB/RLD/10251420-rld-6.jpg' alt='supercars' /></div>
                        </Col>
                        <Col span={12}  xl={12} lg={12} xs={24}>
                            <h1>Founding Story</h1>
                            <p>Inspired by a shared passion for supercars and a desire to make luxury accessible to all, Dream Wheels Exotics was born over a decade ago. Our founders, driven by a vision of democratizing the thrill of high-performance driving, embarked on a journey to turn dreams into realities. What started as a humble endeavor fueled by ambition and a relentless pursuit of excellence has evolved into a premier destination for exotic car rentals. Through perseverance, dedication, and unwavering commitment to customer satisfaction, Dream Wheels Exotics has become synonymous with luxury, reliability, and unforgettable experiences. Today, our founding spirit continues to guide us as we empower individuals from all walks of life to indulge in the extraordinary and live life to the fullest. Welcome to the dream that started it all.</p>
                        </Col>
                    </Row>
                    <Row id='contentRow'>
                        <Col span={12}  xl={12} lg={12} xs={24}>
                            <h1>Our Commitment to Quality</h1>
                            <p>At Dream Wheels Exotics, quality is at the heart of everything we do. From the moment you select your dream car to the second you return the keys, we spare no effort in ensuring your experience exceeds expectations. Our vehicles undergo rigorous maintenance and inspection processes, meticulously cared for by our expert technicians. We're proud to uphold the highest standards of excellence in the industry, earning recognition for our commitment to reliability, safety, and customer satisfaction. At Dream Wheels Exotics, we're not just renting cars; we're delivering peace of mind and unparalleled luxury with every journey</p>
                        </Col>
                        <Col span={12}  xl={12} lg={12} xs={0}>
                            <div id='Image'><img src='https://media.istockphoto.com/id/1317137029/photo/man-greeting-a-mechanic-with-a-handshake-at-an-auto-repair-shop.jpg?s=612x612&w=0&k=20&c=KnlTKOS8DdDQiFifRGSaBwFrTMNXhOuVV7LJuiB-I9U=' alt='carService'/></div>
                        </Col>
                    </Row>
                    <Row id='contentRow1'>
                        <Col span={12}  xl={12} lg={12} xs={0}>
                            <div id='Image'><img src='https://airtv.co.uk/wp-content/uploads/2022/10/Supercar-Airport-Air-TV-copy.jpg' alt ='imageOfPEople'/></div>
                        </Col>
                        <Col span={12}  xl={12} lg={12} xs={24}>
                            <h1>Meet the Team</h1>
                            <p>At Dream Wheels Exotics, our team is the driving force behind our success. Comprised of passionate individuals with diverse backgrounds and expertise, we share a common love for luxury cars and a dedication to exceptional service. Meet the faces behind the wheels – from our seasoned car enthusiasts who meticulously maintain our fleet to our friendly customer service representatives who ensure every client's experience is unforgettable. Together, we're united by our commitment to making dreams come true, one exhilarating drive at a time. Get to know the individuals who bring the Dream Wheels Exotics experience to life.</p>
                        </Col>

                    </Row>
                </Col>
                <Col span={3}></Col>
                <div className='aboutPageFooter'> 
                <Footer />
                </div>
            </Row>
        </div>
    )
}

export default AboutPage