import React, { useState } from 'react'
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, message } from 'antd'
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, PhoneOutlined, MailOutlined, EnvironmentFilled } from '@ant-design/icons';
import emailjs from '@emailjs/browser';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer } from 'react-leaflet/MapContainer'
import { Marker, TileLayer } from 'react-leaflet'
import Footer from '../Component/Footer';
import NavBar from '../Component/NavBar';

function ContactPage() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [mapPositionFromSelect, setmapPositionFromSelect] = useState([[45.421001, -75.625580],[45.438275, -75.595290],[45.409321, -75.608589]])

    //Constants
    const icon9 = L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
        iconSize: [22, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    const prefixSelector = (
        <Form.Item name="prefix" noStyle initialValue={'+1'}>
            <Select
                style={{
                    width: 70,
                }}>
                <Select.Option value="+1">+1</Select.Option>
            </Select>
        </Form.Item>
    );

    //Functions
    const onFinishContactUs = (values) => {
        const contactDataToSend = {
            user_name: values.firstName + ' ' + values.lastName,
            user_email: values.email,
            user_contact: values.phone,
            user_subject: values.subject ? values.subject : '',
            user_message: values.introduction ? values.introduction : ''
        }
        emailjs.send(process.env.REACT_APP_EMAIL_SERVICE, process.env.REACT_APP_EMAIL_TEMPLATE_ID, contactDataToSend, process.env.REACT_APP_EMAIL_PUBLIC_KEY).then(
            (result) => {
                messageApi.open({
                    type: 'success',
                    content: 'Your Message has been sent Successfully',
                });
            }, (error) => {
                messageApi.open({
                    type: 'warning',
                    content: 'Your Message has not been sent',
                });
            }
        );
        form.resetFields()

    }

    const passValueToMap = (data) => {
        // switch (data) {
        //     case '1171':
        //         setmapPositionFromSelect([45.421001, -75.625580])
        //         break
        //     case '2464':
        //         setmapPositionFromSelect([45.438275, -75.595290])
        //         break
        //     case '650':
        //         setmapPositionFromSelect([45.409321, -75.608589])
        //         break
        //     default:
        //         setmapPositionFromSelect([45.421001, -75.625580])
        //         break
        // }
    }


    return (
        <div>
            {contextHolder}
            <NavBar />
            <Row>
                <Col span={3}></Col>
                <Col span={18} className='contactPage' >
                    <div id='header'>
                        <h1>Get in Touch</h1>
                        <h2>We Would love to hear from you</h2>
                        <p>Whether its a feedack or a inquiry our team of experts are available 24/7 to assist you with your questions.</p>
                    </div>
                    <Row>
                        <Col span={12} xl={12} lg={12} xs={0} >
                            <img src='https://media.licdn.com/dms/image/D4E12AQGH_fxsp_cPxA/article-cover_image-shrink_720_1280/0/1693210735671?e=1713398400&v=beta&t=Q5MJ8hp4C9G9GHL664UntaRSyJsvP3Z8vDKWFsf5Kh0' alt='carRentalContact' style={{ height: 'auto', width: '150%', marginLeft: '-13vw' }} />
                        </Col>
                        <Col span={12} xl={12} lg={12} xs={24}>
                            <Card id='contactCard'>
                                <h1>Contact Form</h1>
                                <p>Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible.</p>
                                <div>
                                    <Form form={form} name="contactUsOnly" onFinish={onFinishContactUs} layout="vertical" autoComplete="off">
                                        <h3>First Name</h3>
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
                                        <h3>Last Name</h3>
                                        <Form.Item
                                            name="lastName"
                                            rules={[
                                                {
                                                    required: false,
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
                                        <h3>Contact Number</h3>
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
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        </Form.Item>
                                        <h3>E-mail</h3>
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
                                        <h3>Subject</h3>
                                        <Form.Item name='subject' >
                                            <Input.TextArea />
                                        </Form.Item>
                                        <h3>Additional Request</h3>
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
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <Row id='contactPageBottom'>
                        <Col span={12} xl={12} lg={12} xs={24} id='leftColumnContactPage'>
                            <div>
                                <h1>Our Locations</h1>
                                <div id='text' onClick={(() => passValueToMap('1171'))}><EnvironmentFilled /> 1171 Kenaston Street,Ottawa,K1B 4A6</div>
                                <div id='text' onClick={(() => passValueToMap('2464'))}><EnvironmentFilled /> 2464 Sheffield Rd,Ottawa,K1B 4E5</div>
                                <div id='text' onClick={(() => passValueToMap('650'))}><EnvironmentFilled /> 650 Beacon Hill South,Ottawa,K1J 7V8</div>

                            </div>
                            <div id='connect'>
                                <h1>Connect with Us</h1>
                                <p id='text'>Stay updated on our latest news, promotions, and more by following us on social media.</p>
                                <div className='footerIcon'><TwitterOutlined /><FacebookOutlined /><InstagramOutlined /></div>
                            </div>
                        </Col>
                        <Col span={11} offset={1} xl={{span:11,offset:1}} lg={{span:11,offset:1}} xs={{span:24,offset:0}} id='stepsDateCardLeft'>
                            <Card>
                                <div id="map">
                                    <MapContainer center={mapPositionFromSelect[0]} zoom={13} scrollWheelZoom={true} style={{ with: '100%', height: '400px' }}>
                                        <TileLayer
                                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                                        <Marker position={mapPositionFromSelect[0]} icon={icon9} iconSize={[25, 41]} iconAnchor={[12, 41]}>
                                        </Marker>
                                        <Marker position={mapPositionFromSelect[1]} icon={icon9} iconSize={[25, 41]} iconAnchor={[12, 41]}>
                                        </Marker>
                                        <Marker position={mapPositionFromSelect[2]} icon={icon9} iconSize={[25, 41]} iconAnchor={[12, 41]}>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </Card>
                        </Col>
                        <Col span={12} id='rightColumnContactPage' >
                            <div>
                                <h1>Business Hours</h1>
                                <p id='text'> <b>Monday - Friday:</b> 9:00 AM - 5:00 PM (EST) <br /><b>Saturday:</b> 10:00 AM - 6:00 PM (EST) <br /> <b>Sunday:</b> 10:00 AM - 4:00 PM (EST)</p>
                            </div>
                        </Col>
                        <Col span={12} id='rightColumnContactPage' >
                            <div id='one'>
                                <h1>Contact Information</h1>
                                <p id='text'><PhoneOutlined /> : +1 324 235 4235</p>
                                <p id='text'><MailOutlined /> : support@dreamwheelexotics.com</p>
                            </div>
                        </Col>
                        <Row id='wereHereContactPage'>
                            <Col span={24}>
                                <h1>We're Here for You</h1>
                                <p>No matter the time or day, our dedicated team is here to provide you with exceptional service and support. Don't hesitate to reach out – we look forward to hearing from you!</p>
                            </Col>
                        </Row>

                    </Row>
                </Col>
                <Col span={3}></Col>

            </Row>
            <Footer className='contactPageFooter'/>
        </div>
    )
}

export default ContactPage