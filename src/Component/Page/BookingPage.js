import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { Button, Card, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, message } from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons';
import NavBar from '../Component/NavBar'
import BookingForm from '../Component/BookingForm'
import Footer from '../Component/Footer'
import { saveContact } from '../../app/reducer'
import { getUserDetails, saveUserData, updatePageLocation } from '../../app/userSlice'
import { createBooking } from '../../app/bookingSlice'
import '../Page/HomePage.scss'
import Login from './Login'


function BookingPage() {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    //State Values
    const [isEditModalOpen, setisEditModalOpen] = useState(false)
    const [isLogInModalOpen, setisLogInModalOpen] = useState(false)
    const [PaymentRadiovalue, setPaymentRadiovalue] = useState(1)
    const [contactFormStatus,setcontactFormStatus] = useState(false)
    //Store Values
    const bookingData = useSelector((store) => store.booking.bookingValue)
    const selectedVehicleData = useSelector((store) => store.selectedVehicle.selectedVehicleState)
    const finalPriceDetails = useSelector((store) => store.selectedVehicle.priceDetails)
    const userDataFromLS = useSelector((store) => store.user.userDataFromLS)

    //useEffects
    useEffect(() => {
        dispatch(updatePageLocation('booking'))
        dispatch(saveUserData())
    }, [])
    useEffect(() => {
        if (userDataFromLS) {
            dispatch(getUserDetails(userDataFromLS))
        }
    }, [dispatch, userDataFromLS])

    // Basic Functions
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please LogIn to Continue Booking',
        });
    };
    const warningContactNotSaved = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please Confirm Contact Information',
        });
    };
    const ConatctSaved = () => {
        messageApi.open({
            type: 'success',
            content: 'Contact Information Saved Successfully',
        });
    };
    const ReservationSuccess = () => {
        messageApi.open({
            type: 'success',
            content: 'Your Reservation has been made Successfully',
        });
    };
    const onChangePaymentRadioValue = (e) => {
        setPaymentRadiovalue(e.target.value)
    }
    const prefixSelector = (
        <Form.Item name="prefix" noStyle initialValue={'+1'}>
            <Select
                style={{
                    width: 70,
                }}
            // defaultValue={"+1"}
            >
                <Select.Option value="+1">+1</Select.Option>
            </Select>
        </Form.Item>
    );

    //Edit Modal
    const handleEditModalOk = () => {
        setisEditModalOpen(true)
    }
    const handleEditModalCancel = () => {
        setisEditModalOpen(false)
    }

    //LogInModal
    const handleOkLoginModal = () => {
        setisLogInModalOpen(true);
    };
    const handleCancelLoginModal = () => {
        setisLogInModalOpen(false);
    };

    //Functions
    const reserveNow = async () => {
        if (userDataFromLS) {
            if(contactFormStatus){
            const reserveData = {
                location: bookingData.location,
                pickupDate: moment(bookingData.pickupDate).format('YYYY-MM-DD'),
                dropOffDate: moment(bookingData.dropOffDate).format('YYYY-MM-DD'),
                pickupTime: bookingData.pickupTime,
                dropOffTime: bookingData.dropOffTime,
                car: selectedVehicleData._id,
                user: userDataFromLS.token,
                costPerDay: finalPriceDetails.perDay,
                costForTotalDays: finalPriceDetails.total,
                taxes: finalPriceDetails.taxes,
                paymentTotal: finalPriceDetails.totalWithTax
            }
            try {
                await dispatch(createBooking(reserveData))
                ReservationSuccess()
                navigate('/Accounts')
            }
            catch (error) {
                message.error(error.message)
            }}else{
                warningContactNotSaved()
            }
        }
        else {
            warning()
            setisLogInModalOpen(true)
        }
    }
    const onFinishContactForm = (values) => {
        setcontactFormStatus(true)
        dispatch(saveContact(values))
        ConatctSaved()
    };

    return (
        <div>
            {contextHolder}
            <NavBar />
            <Modal centered width={'60vw'} footer={null} onOk={handleOkLoginModal} onCancel={handleCancelLoginModal} open={isLogInModalOpen} className='fleetModal'>
                <Login location={'bookingPage'} modalClose={handleCancelLoginModal} />
            </Modal>
            <Row className='bookingPageNew'>
                <Col span={18} offset={3} id='headerSpace'>

                    {/* Edit date Selector */}
                    <Modal footer={null} onOk={handleEditModalOk} onCancel={handleEditModalCancel} open={isEditModalOpen} className='EditModal'>
                        <BookingForm formLocation={'fleetPageModal'} formLocationAdditional={'FleetPageModal'} modalData={selectedVehicleData} />
                    </Modal>

                    {/* Header  */}
                    <Row>
                        <Col span={2} id='iconCol'>
                            <LeftCircleOutlined className='bookingIcon' onClick={() => navigate('/fleet')} />
                        </Col>
                        <Col span={22} xl={22} lg={22} xs={24}>
                            <h1 id='header'>Review & Reserve</h1>
                            <div id='headerContent'>Review your selections and secure your bookings with ease - reserve your dream ride today.</div>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={8} xl={8} lg={8} xs={24}>

                            {/* Rental Details  */}
                            <Card id='RentalCard'>
                                <div id='editHeader'><h2>Rental Details</h2><span onClick={() => setisEditModalOpen(true)}>Edit</span></div>
                                <h3>Dates & Times</h3>
                                <div id='text'><b>Pickup</b>  - {moment(bookingData.pickupDate).format("dddd, Do MMMM")} @ {moment.utc(bookingData.pickupTime, 'HH.mm').format('h:mm A')}</div>
                                <div id='text'><b>DropOff</b> - {moment(bookingData.dropOffDate).format("dddd, Do MMMM")} @ {moment.utc(bookingData.dropOffTime, 'HH.mm').format('h:mm A')}</div>
                                <h3>Pick-up & Return Location</h3>
                                <p id='text'><b>{bookingData.location}</b></p>
                                <h3>Additional Details</h3>
                                <p id='text'><b>Renter Age: </b>25+</p>
                            </Card>

                            <Card id='VehicleCard'>

                                {/* Vehicle Details  */}
                                <div id='editHeader'><h2>Vehicle Details</h2><span onClick={() => navigate('/fleet')}>Edit</span></div>
                                <Row id='vehicleDetailsRow'>
                                    <Col span={12}>
                                        <div id='text'><b>Name</b>        - {selectedVehicleData.carName}</div>
                                        <div id='text'><b>Type</b>         - {selectedVehicleData.carType}</div>
                                        <div id='text'><b>No.Of Seats</b>  - {selectedVehicleData.seats}</div>
                                        <div id='text'><b>Transmission</b> - {selectedVehicleData.transmission}</div>
                                    </Col>
                                    <Col span={12}>
                                        <img src={selectedVehicleData.carImage} alt={selectedVehicleData.carName} />
                                    </Col>
                                </Row>

                                {/* Price Details  */}
                                <h2 id='priceHeader'>Price Details</h2>
                                <div id='priceDetails'>
                                    <Row>
                                        <Col span={12}>
                                            <div id='text'><b>PerDay</b> </div>
                                            <div id='text'><b>Sub Total(x {finalPriceDetails.NoOfDates})</b> </div>
                                            <div id='text'><b>Taxes</b>  </div>
                                            <div id='text'><b>Total</b>   </div>
                                        </Col>
                                        <Col span={1} id='middleSection'>
                                            <div>-</div>
                                            <div>-</div>
                                            <div>-</div>
                                            <div>-</div>
                                        </Col>
                                        <Col span={11} id='rightColumnPrice'>
                                            <div id='text'>$ {finalPriceDetails.perDay}</div>
                                            <div id='text'>$ {finalPriceDetails.total}</div>
                                            <div id='text'>$ {finalPriceDetails.taxes}</div>
                                            <div id='text'>$ {finalPriceDetails.totalWithTax}</div>
                                        </Col>
                                    </Row>
                                    <p id='footer'>*Rates, taxes and fees do not reflect rates, taxes and fees applicable to non-included optional coverages or extras added later.</p>
                                </div>
                            </Card>

                        </Col>
                        <Col span={14} offset={2} xl={{span:14,offset:2}} lg={{span:14,offset:2}} xs={{span:24,offset:0}}>

                            {/* Conatct Form */}
                            <Card id='ContactCard'>
                                <h2 id='header'>Contact Details</h2>
                                <Form form={form} name="validateOnly" onFinish={onFinishContactForm} layout="vertical" autoComplete="off">
                                    <Row>
                                        <Col span={10}>
                                            <h2 id='title'>First Name</h2>
                                            <Form.Item
                                                name="firstName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your First Name!',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (/\d/.test(getFieldValue('firstName'))) {
                                                                return Promise.reject(new Error('Names cant contain numbers'));
                                                            }
                                                            return Promise.resolve();
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12} offset={2}>
                                            <h2 id='title'>Last Name</h2>
                                            <Form.Item
                                                name="lastName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please input your Last Name!',
                                                    },
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (!value || getFieldValue('firstName') === value) {
                                                                return Promise.reject(new Error('First and Last Names cant be the same'));
                                                            }
                                                            return Promise.resolve();
                                                        },
                                                    }),
                                                    ({ getFieldValue }) => ({
                                                        validator(_, value) {
                                                            if (/\d/.test(getFieldValue('lastName'))) {
                                                                return Promise.reject(new Error('Names cant contain numbers'));
                                                            }
                                                            return Promise.resolve();
                                                        },
                                                    }),
                                                ]}
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <h2 id='title'>Contact Number</h2>
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone number!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('phone').toString().length === 10) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Please enter a valid phone Number!'));
                                                },
                                            }),
                                        ]}
                                    >
                                        <InputNumber
                                            addonBefore={prefixSelector}
                                            type='number'
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                    <h2 id='title'>E-mail</h2>
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <h2 id='title'>Additional Request</h2>
                                    <Form.Item name='introduction' >
                                        <Input.TextArea />
                                    </Form.Item>
                                    <Form.Item>
                                        <div id='confirmContact'>
                                            <Button type="primary" htmlType="submit">
                                                Confirm Contact
                                            </Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </Card>

                            {/* Payment Details  */}
                            <Card id='ContactCard' >
                                <h2 id='header'>Payment Details</h2>
                                <Radio.Group onChange={onChangePaymentRadioValue} value={PaymentRadiovalue}>
                                    <Radio value={1} style={{'marginRight':'3vw'}}>Pay at Store Later</Radio>
                                    <Radio value={2}>Pay Now</Radio>
                                </Radio.Group>
                                {PaymentRadiovalue === 1 ? '' :
                                    <div className='fade-in-animation '>
                                        <h2 className='comingSoon'>Coming Soon</h2>
                                        <h3 id='title' className='PaymentCard'>CardHolder Name</h3>
                                        <Input disabled/>
                                        <h3 id='title' className='PaymentCard'>Card Number</h3>
                                        <Input disabled/>
                                        <h3 id='title' className='PaymentCard'>CVV</h3>
                                        <Input disabled/>
                                    </div>
                                }
                                <div id='confirmContact' className='PaymentCard'><Button type='primary' onClick={reserveNow}>Reserve Now</Button></div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Footer />
        </div>
    )
}

export default BookingPage