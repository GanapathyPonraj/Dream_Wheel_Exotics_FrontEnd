import { Button, Card, Col, Row, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";

import { addFavtoUser, removeFavFromUser } from '../../app/userSlice';
import { addFavCountToCar, removeFavCountToCar } from '../../app/carSlice';
import LazyLoad from 'react-lazyload';

function CarDetails(props) {
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [heartState, setheartState] = useState(props.data.fav)

    //Constants
    const carId = props.data._id
    const heartValue = props.data.fav

    //useEffect
    useEffect(() => {
        setheartState(heartValue)
    }, [heartValue])

    //Functions
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Please LogIn to Add Favourites',
        });
    };

    const addFavFunction = (data) => {
        if (props.userToken) {
            const tempData = { userToken: props.userToken, carId: carId }
            switch (data) {
                case 'add':
                    dispatch(addFavCountToCar({ carId: carId }))
                    dispatch(addFavtoUser(tempData))
                    setheartState(true)
                    break

                case 'remove':
                    dispatch(removeFavFromUser(tempData))
                    dispatch(removeFavCountToCar({ carId: carId }))
                    setheartState(false)
                    break

                default:
                    return null
            }
        }
        else {
            warning()
        }
    }

    return (
        <LazyLoad height={200} placeholder={<div>Loading...</div>}>
        <div>
            {contextHolder}
            <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={e => { }}
                onHoverEnd={e => { }}
            >
                <Card>
                    <div className='carDetailsImageOuter'><img src={props.data.carImage} alt='lambo' /></div>
                    <div id='topPicsCardInnerTitle' className='topPicsSpace'>
                        <span id='carName'>{props.data.carName}</span>
                        <span>
                            <img src={heartState ? 'heart-set.png' : 'heart-unset.png'} onClick={() => { heartState ? addFavFunction('remove') : addFavFunction('add') }} alt='heart' />
                            {props.data.favouriteCount}
                        </span>
                    </div>
                    <Row className='topPicsSpace'>
                        <span><img src='car-seat.png' alt='carseat' className='iconsSpace' />  {props.data.seats}</span>
                        <span><img src='gear-stick.png' alt='gear' className='iconsSpace' />  {props.data.transmission}</span>
                        <span><img src='car-door.png' alt='cardoor' className='iconsSpace' />  {props.data.doors}</span>
                        <span><img src='car-type.png' alt='cartype' className='iconsSpace' />  {props.data.carType}</span>
                    </Row>
                    {props.showButton ?
                        <Row id='topPicsBottom'>
                            <Col span={11}><div id='dailyRate'>Daily Rates From</div><div><h2>${props.data.dailyRate}</h2></div> </Col>
                            <Col span={8} offset={5}><Button onClick={() => props.fleetModal(props.data)}>Book Now</Button></Col>
                        </Row>
                        : <Row id='topPicsBottom1'><div id='dailyRate1'>Daily Rates From</div><div><h2>${props.data.dailyRate}</h2></div></Row>}

                </Card>
            </motion.div>
        </div>
        </LazyLoad>
    )
}

export default CarDetails