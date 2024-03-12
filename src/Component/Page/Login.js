import { Button, Card, Col, Form, Input, InputNumber, Row, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { SignUpUserToApp, logInUserToApp, saveUserData } from '../../app/userSlice';
import { useNavigate } from 'react-router-dom';
import NavBar from '../Component/NavBar';

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginform] = Form.useForm();
    const [SignUpform] = Form.useForm();
    const [loginPageStatus, setLoginPageStatus] = useState(true)
    const { Option } = Select;

    useEffect(() => {
        loginform.resetFields()
    }, [])

    const onFinish = async (values) => {
        try {
            await dispatch(logInUserToApp(values))
            message.success('Successfully Logged In')
            loginform.resetFields()
            if (props.location === 'bookingPage') {
                dispatch(saveUserData())
                props.modalClose()
            } else {
                navigate('/')
            }

        } catch (error) {
            message.error(error.message)
        }
    }

    const onFinishSignUp = async (values) => {
        const data = {
            name: values.name,
            contactNumber: values.contactNumber,
            email: values.email,
            password: values.password
        }
        try {
            await dispatch(SignUpUserToApp(data))
            SignUpform.resetFields()
            navigate('/')
        } catch (error) {
            message.error(error.message)
        }
    }
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
                defaultValue="1"
            >
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div>
            {/* <Row className='LogInHeader'>
                <Col span={18} offset={3}>
                    <h1 className='loginHeaderText' onClick={()=>navigate('/')}>Dream Wheel Exotics</h1>
                </Col>
            </Row> */}
            {props.location === 'bookingPage'?'':
            <NavBar />}
            <Row className='LogInPage'>
                <Col span={18} offset={3} id='LogInPageRow'>
                    {loginPageStatus ?
                        <Card id='loginCard'>
                            <h1>Welcome Back</h1>
                            <Form name="login"
                                form={loginform}
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                onFinish={onFinish}>
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
                                    <Input placeholder='Please Input Your E-Mail'></Input>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}>
                                    <Input.Password placeholder='Please Input Your Password' />
                                </Form.Item>
                                <Form.Item className='lastLineButton'
                                >
                                    <Button type="primary" htmlType="submit" >
                                        Continue
                                    </Button>
                                </Form.Item>
                                <div id='lastLine'>Don't have an account? <b id='endText' onClick={() => setLoginPageStatus(false)}>Sign up</b></div>
                            </Form>
                        </Card>

                        // Signup 
                        : <Card id='SignUpCard'>
                            <h1>Create Your Account</h1>
                            <Form name="SignUp"
                                form={SignUpform}
                                initialValues={{
                                    prefix: '1',
                                    remember: true,
                                }}
                                onFinish={onFinishSignUp}>

                                <Form.Item
                                    name="name"
                                    tooltip="What do you want others to call you?"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your nickname!',
                                            whitespace: true,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (/\d/.test(getFieldValue('name'))) {
                                                    return Promise.reject(new Error('Names cant contain numbers'));
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                >
                                    <Input placeholder='Full Name' />
                                </Form.Item>
                                <Form.Item
                                    name="contactNumber"
                                    className='signupSelect'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone number!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('contactNumber').toString().length === 10) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Please enter a valid phone Number!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <InputNumber
                                        placeholder='Contact Number'
                                        addonBefore={prefixSelector}
                                        type='number'
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Form.Item>
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

                                    <Input placeholder='E-mail'></Input>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}>

                                    <Input.Password placeholder='Password' />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The new password that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder='Confirm Password' />
                                </Form.Item>
                                <Form.Item className='lastLineButton'
                                >
                                    <Button type="primary" htmlType="submit">
                                        Continue
                                    </Button>
                                </Form.Item>
                                <div id='lastLine'>Already have an account? <b id='endText' onClick={() => setLoginPageStatus(true)}>Log In</b></div>
                            </Form>
                        </Card>
                    }
                </Col>
            </Row>

        </div>
    )
}

export default Login