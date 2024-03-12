import { Button, Col, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserData, updatePageLocation } from '../../app/userSlice';
import '../Page/HomePage.scss'


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

    useEffect(() => {
        if (userDataFromLS) {
            setLogInStatus(true)
        } else {
            setLogInStatus(false)
        }
    }, [userDataFromLS])

    useEffect(()=>{
        if (userData) {
            setUserName(userData)
        }
    },[userData])
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
    return (

        <div className='NavBarSticky'>
            {contextHolder}
            {pageStatus ?
                <Row className='NavBar'>
                    <Col span={5} offset={3} id='logo'>
                        Dream Wheel Exotics
                    </Col>
                    <Col span={8} offset={0} id='centerCol'>
                        <span onClick={() => Navigation('home')}>Home</span>
                        <span onClick={() => Navigation('fleet')}>Fleet</span>
                        {/* <span onClick={() => Navigation('booking')}>Booking</span> */}
                        <span onClick={() => Navigation('accounts')}>Account</span>
                        <span onClick={() => Navigation('about')}>About Us</span>
                        <span onClick={() => Navigation('contact')}>Contact</span>
                    </Col>
                    <Col span={5} id='end'>
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
                            // <div>
                            <Button onClick={() => Navigation('LogIn')}>LogIn</Button>
                            // /<Button>SignUp</Button></div>
                        }
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