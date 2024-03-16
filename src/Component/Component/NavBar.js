import { Button, Card, Col, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserData, updatePageLocation } from '../../app/userSlice';
import '../Page/HomePage.scss'
import 'react-sliding-side-panel/lib/index.css';
import { UpCircleFilled, DownCircleFilled } from '@ant-design/icons';

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user.userData)
    const userDataFromLS = useSelector((store) => store.user.userDataFromLS)
    const pageLoadStatusFromStore = useSelector((store) => store.user.pageLocation)
    const [logInStatus, setLogInStatus] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const [pageStatus, setPageStatus] = useState(true)
    const [userName, setUserName] = useState('')
    const [openPanel, setOpenPanel] = useState(false);

    useEffect(() => {
        if (userDataFromLS) {
            setLogInStatus(true)
        } else {
            setLogInStatus(false)
        }
    }, [userDataFromLS])

    useEffect(() => {
        if (userData) {
            setUserName(userData)
        }
    }, [userData])
    useEffect(() => {
        if (pageLoadStatusFromStore === 'LogIn') {
            setPageStatus(false)
        } else {
            setPageStatus(true)
        }
    }, [pageLoadStatusFromStore])


    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please LogIn to Access Your Account',
        });
    };

    const Navigation = (data) => {
        switch (data) {
            case 'home':
                dispatch(updatePageLocation('home'))
                return navigate('/')
            case 'fleet':
                dispatch(updatePageLocation('fleet'))
                return navigate('/fleet')
            case 'booking':
                return navigate('/booking')
            case 'accounts':
                dispatch(updatePageLocation('accounts'))
                if (userDataFromLS) {
                    return navigate('/Accounts')
                }
                else {
                    warning()
                }
                break
            case 'about':
                dispatch(updatePageLocation('about'))
                return navigate('/About')
            case 'contact':
                dispatch(updatePageLocation('contact'))
                return navigate('/Contacts')
            case 'LogIn':
                dispatch(updatePageLocation('LogIn'))
                return navigate('/LogIn')
            case 'LogOut':
                localStorage.removeItem('user')
                dispatch(logoutUserData())
                setLogInStatus(false)
                return 'done'
            default:
                return null
        }

    }

    const navDetails = () => {
        return (
            <Row className='navBarTopRow'>
                <Col span={8} offset={0} xs={{ span: 24, offset: 0 }} xl={{ span: 12, offset: 1 }} lg={{ span: 12, offset: 1 }} id='centerCol'>
                    <span onClick={() => Navigation('home')}>Home</span>
                    <span onClick={() => Navigation('fleet')}>Fleet</span>
                    {/* <span onClick={() => Navigation('booking')}>Booking</span> */}
                    <span onClick={() => Navigation('accounts')}>Account</span>
                    <span onClick={() => Navigation('about')}>About Us</span>
                    <span onClick={() => Navigation('contact')}>Contact</span>
                </Col>
                <Col span={5} id='end' xs={{ span: 24, offset: 0 }} xl={{ span: 9, offset: 2 }} lg={{ span: 9, offset: 2 }}>
                    {logInStatus ?
                        <div id='outer'>
                            {userName ?
                                <div id='inner'>
                                    <img src={userName.profilePic} alt={userName.profilePic} />
                                    <span>Welcome {userName.name}</span>
                                </div>
                                : ''}

                            <Button onClick={() => Navigation('LogOut')}>Log Out</Button>
                        </div>
                        :
                        <Button onClick={() => Navigation('LogIn')}>LogIn</Button>
                    }
                </Col>
            </Row>
        )
    }

    return (

        <div className='NavBarSticky'>
            {contextHolder}
            {pageStatus ?
                <Row className='NavBar'>
                    <Col span={5} offset={3} xs={{ span: 24, offset: 0 }} xl={{ span: 5, offset: 3 }} lg={{ span: 5, offset: 3 }} id='logo'>
                            <div>
                            <t onClick={() => Navigation('home')}>Dream Wheel Exotics</t>
                            <Button onClick={() => { setOpenPanel(!openPanel) }} className='ShowNavBarPhone'>{openPanel ? <UpCircleFilled /> : <DownCircleFilled />}</Button>
                            </div>
                            <div id='navBarHideAndShow'className={openPanel?'showNavBar':'hideNavBar'}>
                                {navDetails()}
                            </div>
                    </Col>
                    <Col span={13} className='hideNavBarPhone'>
                        {navDetails()}
                    </Col>
                    <Col span={3}></Col>
                </Row> :
                <Row className='LogInHeader'>
                    <Col span={18} offset={3}>
                        <h1 className='loginHeaderText' onClick={() => Navigation('home')}>Dream Wheel Exotics</h1>
                    </Col>
                </Row>}
        </div>
    )
}

export default NavBar