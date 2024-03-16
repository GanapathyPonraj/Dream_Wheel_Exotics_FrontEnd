import { Col, List, Row } from 'antd'
import React from 'react'
import { TwitterOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import '../Page/HomePage.scss'

function Footer() {

    const Linkdata = ['About', 'Blog', 'Careers', 'News', 'Partners']

    return (
        <Row className='footer'>
            <Col span={5} offset={3} xl={{span:5,offset:3}} lg={{span:5,offset:3}} xs={{span:21,offset:2}} id='firstRow'>
                <h2>About Dream Wheels Exotics</h2>
                <p>Where quality meets affordability. We understand the importance of a smooth and enjoyable journey without the burden of excessive costs. That's why we have meticulously crafted our offerings to provide you with top-notch vehicles at minimum expense.</p>
            </Col>
            <Col span={4} offset={1} xl={{span:4,offset:1}} lg={{span:4,offset:1}} xs={{span:8,offset:2}}id='Loactions'>
                <h2>Locations</h2>
                <div><svg xmlns="http://www.w3.org/2000/svg" height="12" width="9" viewBox="0 0 384 512"><path fill="#ffffff" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>    1171 Kenaston Street,Ottawa,K1B 4A6</div>
                <div><svg xmlns="http://www.w3.org/2000/svg" height="12" width="9" viewBox="0 0 384 512"><path fill="#ffffff" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>    2464 Sheffield Rd,Ottawa,K1B 4E5</div>
                <div><svg xmlns="http://www.w3.org/2000/svg" height="12" width="9" viewBox="0 0 384 512"><path fill="#ffffff" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>    650 Beacon Hill South,Ottawa,K1J 7V8</div>
            </Col>
            <Col span={5} xxl={{span:5,offset:0}} xl={{span:5,offset:0}} lg={{span:5,offset:0}} xs={{span:6,offset:1}}  id='linkTab'>
                <h2>Quick Links</h2>
                <List
                    size='small'
                    dataSource={Linkdata}
                    bordered={false}
                    renderItem={(item) => <List.Item>{item}</List.Item>}>
                </List>
            </Col>
            <Col span={5} xxl={{span:5,offset:1}} xl={{span:3,offset:1}}  xs={{span:4,offset:1}} id='socialTab'>
                <h2>Social Network</h2>
                <div className='footerIcon'><TwitterOutlined /><FacebookOutlined /><InstagramOutlined /></div>
            </Col>
            <Col span={2}></Col>
        </Row>
    )
}

export default Footer