import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Collapse, Row } from 'antd'
import { CarOutlined, CalendarOutlined, CreditCardOutlined, CustomerServiceOutlined } from '@ant-design/icons';

import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NavBar from '../Component/NavBar'
import BookingForm from '../Component/BookingForm';
import CustomerReview from '../Component/CustomerReview';
import Footer from '../Component/Footer';
import Features from '../Component/Features';
import CarDetails from '../Component/CarDetails';
import './HomePage.scss'

import { getAllCarWithAvailability } from '../../app/carSlice';
import { getUserDetails, saveUserData, updatePageLocation } from '../../app/userSlice';

function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //States
    const [scrollStatus, setScrollStatus] = useState(false);
    const [topPicsCarIdData, setTopPicsCarIdData] = useState()
    //Store Values
    const bookingDataDates = useSelector((store) => store.booking.bookingValue)
    const carInfoFromStore = useSelector((store) => store.carDataStore.carData)
    const userData = useSelector((store) => store.user.userData)
    const userDataFromLS = useSelector((store) => store.user.userDataFromLS)
    const userLoginStatus = useSelector((store) => store.user.userLogIn)

    //Constants
    const selectedDate = { pickupDate: bookingDataDates.pickupDate, dropOffDate: bookingDataDates.dropOffDate }
    const myStyle1 = {
        backgroundImage: "url(/bugatti.png)",
        height: "94vh",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
    };
    const middleSectionData = [{ number: '4255', name: 'Completed Orders' }, { number: '3745', name: 'Happy Customers' }, { number: '55', name: 'Vehicle Fleet' }, { number: '10', name: 'Years Expereince' }]
    const topPicsCarId = useMemo(() => [1051, 1016, 1045, 1052], []);

    //Data for FAQ section
    const itemsLeft = [
        { key: '1', label: 'How do I get started with Car Rental?', children: 'Browse our selection online or in-person, then make a reservation with our team . Bring required documents, pick up your rental, and enjoy your dream drive with us! ' },
        { key: '2', label: 'Can I rent a car with a debit card?', children: 'Yes, you can rent a car with a debit card at Dream Wheels Exotics. We accept major debit cards for payment, along with the required documentation.' },
        { key: '3', label: 'What kind of Car Rental do I need?', children: "The type of car rental you need depends on your specific preferences and requirements. Whether it's a luxury sedan for a business trip, a convertible for a leisurely weekend getaway, or a high-performance sports car for an adrenaline-filled adventure, we have the perfect vehicle to suit your needs at Dream Wheels Exotics." },
    ]
    const itemsRight = [
        { key: '1', label: 'What is a rental car security deposit?', children: "A rental car security deposit is a temporary hold placed on your credit or debit card at the time of renting a vehicle. It serves as a security measure for the rental company in case of any damages, fines, or additional charges incurred during the rental period. Once the rental is returned in satisfactory condition and all fees are settled, the deposit is typically released back to the cardholder." },
        { key: '3', label: 'Can I cancel or modify my reservation?', children: "Yes, you can typically cancel or modify your reservation with Dream Wheels Exotics, but it's important to review our specific cancellation and modification policies outlined in your rental agreement or on our website. Depending on the terms, there may be certain deadlines or fees associated with cancellations or modifications, so we recommend contacting us as soon as possible if you need to make any changes to your reservation. Our team will be happy to assist you further." },
        { key: '4', label: 'Is it possible to extend my rental period?', children: "Yes, it's often possible to extend your rental period with Dream Wheels Exotics, subject to availability and our rental extension policies. We recommend contacting us as soon as you know you need to extend your rental so we can check availability and make the necessary arrangements. Additional charges may apply for extended rental periods. Our team will be happy to assist you with any questions or requests regarding rental extensions." }
    ]

    //Four Easy steps Data
    const stepDetails = [
        { title: '1. Choose a vehicle', icon: <CarOutlined />, detail: 'Unlock unparalleled adventures and memorable journeys with our vast fleet of vehicles tailored to suit every need, taste, and destination.' },
        { title: '2. Pick location & date', icon: <CalendarOutlined />, detail: 'Pick your ideal location and date, and let us take you on a journey filled with convenience, flexibility, and unforgettable experiences.' },
        { title: '3. Make a Booking', icon: <CreditCardOutlined />, detail: 'Secure your reservation with ease, unlocking a world of possibilities and embarking on your next adventure with confidence.' },
        { title: '4. Sit back & relax', icon: <CustomerServiceOutlined />, detail: 'Hassle-free convenience as we take care of every detail, allowing you to unwind and embrace a journey filled comfort.' },
    ]

    //useEffects

    useEffect(() => {
        dispatch(updatePageLocation('home'))
        dispatch(getAllCarWithAvailability(selectedDate))
        dispatch(saveUserData())
        updateFav()
    }, []);

    useEffect(() => {
        dispatch(getAllCarWithAvailability(selectedDate))
        dispatch(saveUserData())
        updateFav()
    }, [userLoginStatus])

    useEffect(() => {
        if (userDataFromLS) {
            dispatch(getUserDetails(userDataFromLS))
        }
    }, [dispatch, userDataFromLS])

    useEffect(() => {
        updateFav()
    }, [carInfoFromStore])

    useEffect(() => {
        updateFav()
    }, [userData])


    //Functions

    const addFavtoCarData = (carInformation, userInformation) => {
        const updatedCarInfo = carInformation ? carInformation.map(obj => {
            if (userInformation) {
                if (userInformation.includes(obj._id)) {
                    return {
                        ...obj,
                        fav: true
                    };
                } else {
                    return obj;
                }
            }
        }) : '';
        return updatedCarInfo
    }

    const updateFav = () => {
        const newValue = carInfoFromStore ? carInfoFromStore.filter((carData) => {
            return topPicsCarId.includes(carData.carId)
        }) : ''
        if (userDataFromLS) {
            if (userData) {
                const carInfoUpdated = addFavtoCarData(newValue, userData.favoriteCars)
                setTopPicsCarIdData(carInfoUpdated)
            }
        } else {
            setTopPicsCarIdData(newValue)
        }
    }

    return (
        <div>
            <NavBar />
            {/* Homepage */}
            <Row className='homePageRow' style={myStyle1}>
                <Col span={18} offset={3} xl={{ span: 18, offset: 3 }} id='homeBody'>
                    {/* Section 1 */}
                    <Row id='firstRowHomePage'>
                        <h2>Unleash Your Ultimate <br /> Drive with Us</h2>
                        <Button onClick={() => navigate('/fleet')}>View Our Fleet</Button>
                    </Row>
                    {/* Section 2 */}
                    <Row>
                        <Col span={7} offset={17} xxl={{ span: 7, offset: 17 }} xl={{ span: 7, offset: 16 }} lg={{ span: 7, offset: 16 }}>
                            <Card className='homepageBookingForm'>
                                <BookingForm formLocation={'homePage'} />
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* Middle Section */}
            <Row className='middleSection' >
                <Col span={18} offset={3}>
                    <Row>
                        <Col span={12} id='leftColumn'>
                            <p>We offer customers a wide range of commercial cars and luxury cars on occasion.</p>
                        </Col>
                        <Col span={12} id='rightColumn'>
                            <p>At Dream Wheels Exotics, our mission is to provide unparalleled experiences by offering the world's most luxurious and exhilarating exotic car rentals. We strive to exceed the expectations of our clients by delivering impeccable service, meticulously maintained vehicles, and unforgettable journeys that ignite passion and elevate dreams. With a commitment to excellence and a dedication to customer satisfaction, we aim to redefine the standard of luxury car rental, making every drive an extraordinary adventure.</p>
                        </Col>
                    </Row>
                    <Row className='middleCardRow' >
                        {middleSectionData.map((data) =>
                            <ScrollTrigger onEnter={() => setScrollStatus(true)} onExit={() => setScrollStatus(false)} >
                                <Card className='middleCard'>
                                    <div id='one'>
                                        {scrollStatus ? <CountUp decimals={0} start={1} end={data.number} duration={3} delay={0} /> : '0'}
                                    </div>
                                    <div>{data.name}</div>
                                </Card>
                            </ScrollTrigger>
                        )}
                    </Row>
                </Col>
            </Row>

            {/* Top Picks */}
            <Row className='topPicsCard'>
                <Col span={18} offset={3} xxl={{ span: 18, offset: 3 }} xl={{ span: 24, offset: 0 }}>
                    <h1>Our Top Pics of the Month</h1>
                    <Row className='topPicsCardInner'>
                        {topPicsCarIdData ? topPicsCarIdData.map((data) =>
                            <CarDetails data={data} key={data._id}showButton={false} userId={userData ? userData : " "} userToken={userDataFromLS ? userDataFromLS.token : ''} />
                        ) : ''}
                    </Row>
                </Col>
                <Col span={3} xxl={3} xl={0}></Col>
            </Row>

            {/* Features */}
            <Features />

            {/* Steps */}
            <h1 style={{ textAlign: 'center', color: '#1790fc' }}>Four Easy Steps</h1>
            <Row className='stepsCard'>
                <Col span={18} offset={3} >
                    {stepDetails.map((data) =>
                        <Card>
                            <ScrollTrigger onEnter={() => setScrollStatus(true)} onExit={() => setScrollStatus(false)} >
                                <motion.div initial={{ y: 30, opacity: 0 }} animate={scrollStatus ? { y: 0, opacity: 1 } : {}}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.5,
                                        duration: 1.5, ease: 'easeOut'
                                    }}
                                >
                                    <div id='icon'>{data.icon}</div>
                                </motion.div>
                            </ScrollTrigger>
                            <h2>{data.title}</h2>
                            <p>{data.detail}</p>
                        </Card>
                    )}
                </Col>
                <Col span={3} className='stepsCardCol'></Col>
            </Row>

            {/* Customer Review  */}
            <CustomerReview />

            {/* FAQ */}
            <Row>
                <Col span={18} offset={3} className='faqSectionOuter'>
                    <div><h1>FAQ</h1></div>
                    <Row className='faqSection'>
                        <Col span={11} >
                            <Collapse ghost expandIconPosition={'end'} accordion items={itemsLeft} />
                        </Col>
                        <Col span={11} offset={1}>
                            <Collapse ghost expandIconPosition={'end'} accordion items={itemsRight} />
                        </Col>
                    </Row>
                </Col>
                <Col span={3}></Col>
            </Row>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default HomePage