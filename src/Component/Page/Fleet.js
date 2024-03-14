import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Checkbox, Col, Collapse, Form, Input, Modal, Row, Select } from 'antd'
import dayjs from 'dayjs';
import LazyLoad from 'react-lazy-load';


import BookingForm from '../Component/BookingForm'
import CarDetails from '../Component/CarDetails';
import NavBar from '../Component/NavBar'
import Footer from '../Component/Footer';

import { saveSelectedVehicle, updatePriceDetails } from '../../app/vehicleReducer';
import { getAllCarWithAvailability } from '../../app/carSlice';
import { getUserDetails, saveUserData } from '../../app/userSlice';


function Fleet() {
    const emptyFleetData = {
        carId: '1001',
        brand: 'Jeep',
        carName: 'Jeep Renegade',
        favouriteCount: 74,
        seats: '5',
        transmission: 'Manual',
        doors: 4,
        carType: 'SUV',
        dailyRate: 265,
        carIamge: '',
        fav: true
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    //Store Values
    const bookingDataDates = useSelector((store) => store.booking.bookingValue)
    const userData = useSelector((store) => store.user.userData)
    const userDataFromLS = useSelector((store) => store.user.userDataFromLS)
    const carInfo = useSelector((store) => store.carDataStore.carData)
    const carLoading = useSelector((store) => store.carDataStore)

    //State Values
    const [modalContent, setModalContent] = useState(emptyFleetData)
    const [isFleetModalOpen, setIsFleetModalOpen] = useState(false);
    const [topPicsSectiondata1, settopPicsSectiondata1] = useState(carInfo)
    const [carDatawithFavValues, setcarDatawithFavValues] = useState('')
    const [sortButtonValue, setSortButtonValue] = useState('None')
    const [filterButtonValues, setFilterButtonValues] = useState()

    const selectedDate = { pickupDate: dayjs(bookingDataDates.pickupDate).format('YYYY-MM-DD'), dropOffDate: dayjs(bookingDataDates.dropOffDate).format('YYYY-MM-DD') }
    const priceTotal = modalContent.dailyRate * dayjs(bookingDataDates.dropOffDate).diff(dayjs(bookingDataDates.pickupDate), 'day')
    const difference = dayjs(bookingDataDates.dropOffDate).diff(dayjs(bookingDataDates.pickupDate), 'day')

    //useEffect
    useEffect(() => {
        dispatch(getAllCarWithAvailability(selectedDate))
        dispatch(saveUserData())
        addingFavFromUser()
    }, [])

    useEffect(() => {
        if (userDataFromLS) {
            dispatch(getUserDetails(userDataFromLS))
        }
    }, [dispatch, userDataFromLS])

    useEffect(() => {
        addingFavFromUser()
    }, [carInfo, userData])

    useEffect(() => {
        carDetailsCall()
    }, [topPicsSectiondata1])

    //Functions
    const formReset = () => {
        form.resetFields()
        filterButtonPress({})

    }

    const showFleetModal = (data) => {
        setModalContent(data)
        setIsFleetModalOpen(true);
    };
    const handleOk = () => {
        setIsFleetModalOpen(false);
    };
    const handleCancel = () => {
        setIsFleetModalOpen(false);
    };

    const addingFavFromUser = () => {
        if (userDataFromLS) {
            const userDetails = userData.favoriteCars
            const updatedCarInfo = carInfo ? carInfo.map(obj => {
                if (userDetails) {
                    if (userDetails.includes(obj._id)) {
                        return {
                            ...obj,
                            fav: true
                        };
                    } else {
                        return obj;
                    }
                }
            }) : '';
            setcarDatawithFavValues(updatedCarInfo)
            if (filterButtonValues) {
                if (Object.keys(filterButtonValues).length > 0) {
                    const updatedValuesWithFilter = filterProducts(updatedCarInfo, removeEmptyArrayProperties(filterButtonValues))
                    settopPicsSectiondata1(updatedValuesWithFilter)
                    if (sortButtonValue !== 'None') {
                        sortFunction(sortButtonValue)
                    }
                }
            }
            else if (sortButtonValue !== 'None') {
                settopPicsSectiondata1(updatedCarInfo)
                sortFunction(sortButtonValue)
            }
            else {
                settopPicsSectiondata1(updatedCarInfo)
            }
        } else {
            settopPicsSectiondata1(carInfo)
            if (filterButtonValues) {
                filterButtonPress(filterButtonValues)
            }
        }
    }

    const filterButtonPress = (values) => {
        const updatedValues = removeEmptyArrayProperties(values)
        setFilterButtonValues(updatedValues)

        if (userDataFromLS) {
            const filteredProducts = filterProducts(carDatawithFavValues, updatedValues);
            settopPicsSectiondata1(filteredProducts);
            if (sortButtonValue !== 'None') {
                sortFunction(sortButtonValue)
            }
        }
        else {
            const filteredProducts = filterProducts(carInfo, removeEmptyArrayProperties(values));
            settopPicsSectiondata1(filteredProducts);
            if (sortButtonValue !== 'None') {
                sortFunction(sortButtonValue)
            }
        }
    };

    function filterProducts(products, filters) {
        // console.log(products);
        return products.filter(product => {
            for (const [category, filterValues] of Object.entries(filters)) {
                if (Array.isArray(filterValues) && !filterValues.includes(product[category])) {
                    return false;
                }
            }
            if (filters.minPrice || filters.maxPrice) {
                const price = parseFloat(product.dailyRate);
                if (filters.minPrice && price < filters.minPrice) {
                    return false;
                }
                if (filters.maxPrice && price > filters.maxPrice) {
                    return false;
                }
            }
            return true;
        });
    }

    function removeEmptyArrayProperties(obj) {
        return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined && value.length !== 0));
    }

    const saveSelectedVehicleFunction = (data) => {
        const difference = dayjs(bookingDataDates.dropOffDate).diff(dayjs(bookingDataDates.pickupDate), 'day')
        const priceTotal = data.dailyRate * difference
        const priceDetails = {
            total: priceTotal,
            perDay: data.dailyRate,
            taxes: (priceTotal * 0.13).toFixed(2),
            totalWithTax: ((priceTotal * 0.13) + priceTotal).toFixed(2),
            NoOfDates: difference
        }
        dispatch(saveSelectedVehicle(data))
        dispatch(updatePriceDetails(priceDetails))
        navigate('/booking')
    }

    const carDetailsCall = () => {
        return topPicsSectiondata1 ? topPicsSectiondata1.map((data) =>
            <div>
                {/* <LazyLoad height={400} placeholder={<div>Loading...</div>}> */}
                    <CarDetails data={data} key={data._id} showButton={true} userId={userData} userToken={userDataFromLS ? userDataFromLS.token : null} fleetModal={showFleetModal} />
                {/* </LazyLoad> */}

            </div>) : ''
    }

    const sortButtonPress = (value) => {
        setSortButtonValue(value)
        sortFunction(value)
    }

    const sortFunction = (value) => {
        if (value === 'None') {
            // console.log('came in sort function',filterButtonValues,value);
            setSortButtonValue(value)
            if (filterButtonValues) {
                // console.log('came insisde');
                if (userDataFromLS) {
                    const dataOfFilter = filterProducts(carDatawithFavValues, filterButtonValues)
                    settopPicsSectiondata1(dataOfFilter)
                } else {
                    const dataOfFilter = filterProducts(carInfo, filterButtonValues)
                    settopPicsSectiondata1(dataOfFilter)
                }

            }
            else {
                settopPicsSectiondata1(carDatawithFavValues)
            }
        }
        if (value === 'PriceHL') {
            settopPicsSectiondata1(prevData => {
                const sortedArray = [...prevData].sort((a, b) => b.dailyRate - a.dailyRate);
                return sortedArray;
            });
        }
        if (value === 'PriceLH') {
            settopPicsSectiondata1(prevData => {
                const sortedArray = [...prevData].sort((a, b) => a.dailyRate - b.dailyRate);
                return sortedArray;
            });
        }
        if (value === 'Alphabet') {
            settopPicsSectiondata1(prevData => {
                const sortedArray = [...prevData].sort((a, b) => a.carName.localeCompare(b.carName));
                return sortedArray;
            });
        }
    };

    return (
        <div>
            <NavBar />
            <Row className='fleetOuter'>

                {/* Filter */}
                <Col span={3} offset={3} xxl={{ span: 3, offset: 3 }} xl={{ span: 4, offset: 1 }} id='fleetFilter'>
                    <Form name='filter' form={form} onFinish={filterButtonPress}>
                        <Collapse expandIconPosition={'end'} ghost defaultActiveKey={['1']} collapsible={false} items={[
                            {
                                key: '1',
                                label: 'Car Type',
                                children:
                                    <Form.Item name='carType'>
                                        <Checkbox.Group>
                                            <Checkbox value='SuperCars'>Super Cars</Checkbox>
                                            <Checkbox value='SUV'>SUV</Checkbox>
                                            <Checkbox value='LuxurySedan'>Luxury Sedans</Checkbox>
                                            <Checkbox value='Sedan'>Sedan</Checkbox>
                                            <Checkbox value='HatchBack'>HatchBack</Checkbox>
                                        </Checkbox.Group>
                                    </Form.Item>
                            }
                        ]} />
                        <Collapse expandIconPosition={'end'} ghost defaultActiveKey={['2']} items={[
                            {
                                key: '2',
                                label: 'Seating Capacity',
                                children:
                                    <Form.Item name='seats'>
                                        <Checkbox.Group>
                                            <Checkbox value='2'>2</Checkbox>
                                            <Checkbox value='4'>4</Checkbox>
                                            <Checkbox value='5'>5</Checkbox>
                                            <Checkbox value='7'>7</Checkbox>
                                        </Checkbox.Group>
                                    </Form.Item>
                            }
                        ]} />
                        <Collapse expandIconPosition={'end'} ghost defaultActiveKey={['3']} items={[
                            {
                                key: '3',
                                label: 'Transmission',
                                children:
                                    <Form.Item name='transmission'>
                                        <Checkbox.Group>
                                            <Checkbox value='Automatic'>Automatic</Checkbox>
                                            <Checkbox value='Manual'>Manual</Checkbox>
                                        </Checkbox.Group>
                                    </Form.Item>
                            }
                        ]} />
                        <Collapse expandIconPosition={'end'} ghost defaultActiveKey={['4']} items={[
                            {
                                key: '4',
                                label: 'Brand',
                                children:
                                    <Form.Item name='brand' className='brandCheckbox'>
                                        <Checkbox.Group style={{ display: 'flex' }}>
                                            <Row>
                                                <Checkbox value='Ferrari'>Ferrari</Checkbox>
                                                <Checkbox value='Bentley'>Bentley</Checkbox>
                                                <Checkbox value='BMW'>BMW</Checkbox>
                                                <Checkbox value='Audi'>Audi</Checkbox>
                                                <Checkbox value='Lamborghini'>Lamborghini</Checkbox>
                                                <Checkbox value='Porsche'>Porsche</Checkbox>
                                                <Checkbox value='Jeep'>Jeep</Checkbox>
                                                <Checkbox value='McLaren'>McLaren</Checkbox>
                                                <Checkbox value='RangeRover'>Range Rover</Checkbox>
                                                <Checkbox value='Ford'>Ford</Checkbox>
                                                <Checkbox value='RollsRoyce'>Rolls Royce</Checkbox>
                                                <Checkbox value='Dodge'>Dodge</Checkbox>
                                                <Checkbox value='Bugatti'>Bugatti</Checkbox>
                                            </Row>
                                        </Checkbox.Group>
                                    </Form.Item>
                            }
                        ]} />
                        <Collapse expandIconPosition={'end'} ghost defaultActiveKey={['5']} items={[
                            {
                                key: '5',
                                label: 'Price Range',
                                children:
                                    <div>
                                        <Form.Item name='minPrice' >
                                            <Input type='number' placeholder='Min ($)' style={{ marginBottom: '9px' }}></Input>
                                        </Form.Item>
                                        <Form.Item name='maxPrice' >
                                            <Input type='number' placeholder='Max ($)'></Input>
                                        </Form.Item>
                                    </div>
                            }
                        ]}
                        ></Collapse>
                        <Button type="primary" htmlType="submit">Filter</Button>
                        <Button style={{ fontSize: 12 }} onClick={formReset}>Clear</Button>
                    </Form>
                </Col>

                {/* Main Content  */}
                <Col span={15} xxl={15} xl={18} className='fleetColumn'>
                    <Card id='bookingCardOuter'>
                        <BookingForm formLocation={'fleetPageTopSection'} />
                    </Card>

                    {/* Sort Function  */}
                    <Row id='SortButton'>
                        <p>SORT BY :  </p>
                        <Select
                            defaultValue="None"
                            style={{
                                width: 120,
                            }}
                            onChange={sortButtonPress}
                            options={[
                                {
                                    value: 'None',
                                    label: 'None',
                                },
                                {
                                    value: 'PriceHL',
                                    label: 'Price: High to Low',
                                },
                                {
                                    value: 'PriceLH',
                                    label: 'Price: Low to High',
                                },
                                {
                                    value: 'Alphabet',
                                    label: 'Alphabetically',
                                },

                            ]}
                        />
                    </Row>

                    {/* Car Card  */}
                    <Row gutter={[32, 32]} className='topPicsCardInner'>
                        {carLoading ? carLoading.getAllCarloading ?
                            <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
                            : carDetailsCall()
                            : ''}
                    </Row>

                </Col>

                <Col span={3}></Col>
            </Row>

            {/* Modal */}
            <Modal centered width={'60vw'} footer={null} onOk={handleOk}
                onCancel={handleCancel} open={isFleetModalOpen} className='fleetModal'>
                <Row>
                    <Col span={15} offset={1} className='modal'>
                        <Row className='modalImage'>
                            <img src={modalContent.carImage} alt='Range' />
                        </Row>
                        <div id='title'>{modalContent.carName}</div>
                        <Row id='icons'>
                            <span><img src='car-seat.png' alt='carseat' className='iconsSpace' />  {modalContent.seats}</span>
                            <span><img src='gear-stick.png' alt='gear' className='iconsSpace' />  {modalContent.transmission}</span>
                            <span><img src='car-door.png' alt='cardoor' className='iconsSpace' />  {modalContent.doors}</span>
                            <span><img src='car-type.png' alt='cartype' className='iconsSpace' />  {modalContent.carType}</span>
                        </Row>
                        <h2>DESCRIPTION</h2>
                        <p>{modalContent.description}</p>
                        <h2>REQUIREMENTS</h2>
                        <div>
                            <p>To reserve an exotic car with Dream Wheels Exotics, ensure you're at least 25 years old, possess a valid driver's license, proof of insurance, and a major credit card. Additionally, a security deposit is required, the amount of which varies depending on the vehicle. Contact our team for more details on booking requirements and to secure your dream ride.</p>
                        </div>
                    </Col>
                    <Col span={8} offset={0} className='fleetFormOuter'>

                        <Card className='fleetForm'>
                            <BookingForm formLocation={'fleetPageModal'} formLocationAdditional={'FleetPageModal'} modalData={modalContent} />
                        </Card>

                        <div id='priceSpace'>
                            <h2>PRICE DETAILS</h2>
                            <Row id='fleetModalPriceDetails'>
                                <Col span={16} id='leftColumn'>
                                    <div>Per Day</div>
                                    <div>Sub Total ( x {difference} days)</div>
                                    <div>Taxes</div>
                                    <div>Total</div>
                                </Col>
                                <Col span={8} id='rightColumn'>
                                    <div>${modalContent.dailyRate.toFixed(0)}</div>
                                    <div>${priceTotal.toFixed(0)}</div>
                                    <div>${((priceTotal) * 0.13).toFixed(0)}</div>
                                    <div>${((priceTotal) * 0.13 + priceTotal).toFixed(0)}</div>
                                </Col>
                            </Row>
                            <p>*Rates, taxes and fees do not reflect rates, <br />taxes and fees applicable to non-included <br />optional coverages or extras added later.</p>
                        </div>


                        <div className='fleetFormText'>
                            <h2>FREE CANCELATION</h2><p>Full refund before pickup</p>
                            <div id='distance'><span>Distance Included</span><span>Unlimited</span></div>
                            <div>
                                <h2>INSURANCE & PROTECTION</h2>
                                <p> Insurance via Economical</p>
                            </div>
                            <Row id='modalConfirm'>
                                <Button onClick={() => saveSelectedVehicleFunction(modalContent)}>Confirm Vehicle</Button>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Modal>

            <Footer />

        </div >
    )
}
export default Fleet