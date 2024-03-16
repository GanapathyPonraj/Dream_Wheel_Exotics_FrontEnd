import { Col, Row } from 'antd'
import React, { useState } from 'react'
import 'rc-texty/assets/index.css';
import ScrollTrigger from 'react-scroll-trigger';
import { motion } from 'framer-motion'


function Features() {
    const [scrollStatus, setScrollStatus] = useState(false);

    return (
        <Row>
            <Col span={18} offset={3}  className='featurePage'>
                <Row id='featurePageRowOne'>
                    <h2 id='featurePageRowOneA'>Why Choose Us?</h2>
                    <h2 id='featurePageRowOneB'>Our Features</h2>
                    <p>Discover a world of convenience, safety, and customization, paving the way<br /> for unforgettable adventures and seamless mobility solutions.</p>
                </Row>
                <Row>
                    <Col span={5} xl={5} lg={5} xs={11} id='featurePageRowTwo'>
                        <div id='featurePageOuter'>
                            <ScrollTrigger onEnter={() => setScrollStatus(true)} onExit={() => setScrollStatus(false)} >
                                <motion.div initial={{ x: '-3vw' }} animate={scrollStatus ? { x: 0 } : {}} transition={{ duration: 0.75, ease: 'easeInOut' }} >
                                    <h2>First Class Service</h2>
                                </motion.div>
                                <motion.div initial={{ y: 40, opacity: 0 }} animate={scrollStatus ? { y: 0, opacity: 1 } : {}}  transition={{ duration: 1, ease: 'easeOut' }}>
                                    <p>Where luxury meets exceptional care, creating unforgettable moments and exceeding your every expectation.</p>
                                </motion.div>
                            </ScrollTrigger>
                        </div>
                        <div id='featurePageOuter'>
                            <ScrollTrigger onEnter={() => setScrollStatus(true)} onExit={() => setScrollStatus(false)} >
                                <motion.div initial={{ x: '-3vw' }} animate={scrollStatus ? { x: 0 } : {}} transition={{ duration: 0.75, ease: 'easeInOut' }}>
                                    <h2>24/7 road assistance</h2>
                                </motion.div>
                                <motion.div initial={{ y: 40, opacity: 0 }} animate={scrollStatus ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease: 'easeOut' }} >
                                    <p>Reliable support when you need it most, keeping you on the move with confidence and peace of mind.</p>
                                </motion.div>
                            </ScrollTrigger>
                        </div>
                    </Col>
                    <Col span={14} xl={14} lg={14} xs={0} id='featurePageImageCol'>
                        <img src='Lambo.png' alt='lambo' />
                    </Col>
                    <Col span={5} xl={{span:5,offset:0}} lg={{span:5,offset:0}} xs={{span:11,offset:1}} id='featurePageRowThree'>
                        <div id='featurePageOuter'>
                            <ScrollTrigger onEnter={() => setScrollStatus(true)} onExit={() => setScrollStatus(false)} >
                                <motion.div initial={{ x: '3vw' }} animate={scrollStatus ? { x: 0 } : {}} transition={{ duration: 0.75, ease: 'easeInOut' }} >
                                    <h2>Quality at Minimum Expense</h2>
                                </motion.div>
                                <motion.div initial={{ y: 40, opacity: 0 }} animate={scrollStatus ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease: 'easeOut' }}>
                                    <p>Unlocking affordable brilliance with elevating quality while minimizing costs for maximum value.</p>
                                </motion.div>
                            </ScrollTrigger>
                        </div>
                        <div id='featurePageOuter'>
                            <ScrollTrigger onEnter={() => setScrollStatus(true)} onExit={() => setScrollStatus(false)} >
                                <motion.div initial={{ x: '3vw' }} animate={scrollStatus ? { x: 0 } : {}} transition={{ duration: 0.75, ease: 'easeInOut' }}>
                                    <h2>Free Pick-Up & Drop-Off</h2>
                                </motion.div>
                                <motion.div initial={{ y: 40, opacity: 0 }} animate={scrollStatus ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1, ease: 'easeOut' }} >
                                    <p>Enjoy free pickup and drop-off services, adding an extra layer of ease to your car rental experience.</p>
                                </motion.div>
                            </ScrollTrigger>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col span={3}></Col>
        </Row>
    )
}

export default Features