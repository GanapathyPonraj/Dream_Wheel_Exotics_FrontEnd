import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'
import { Button, Card, Col, Modal, Row, Table, Tag } from 'antd'
import { HomeFilled, CalendarFilled, CarFilled, EditOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';

import NavBar from '../Component/NavBar'
import Footer from '../Component/Footer';
import CarDetails from '../Component/CarDetails'

import { getAllBooking } from '../../app/bookingSlice';
import { getAllCarWithAvailability } from '../../app/carSlice';
import { addPicToUser, getUserDetails, saveUserData } from '../../app/userSlice';
import { useNavigate } from 'react-router-dom';

function AccountsPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Store Values
  const userDataFromStore = useSelector((store) => store.user.userData)
  const recentDataFromStore = useSelector((store) => store.bookingLogic.allBookings)
  const carDataFromStore = useSelector((store) => store.carDataStore.carData)
  const bookingDataDates = useSelector((store) => store.booking.bookingValue)
  const bookingLoading = useSelector((store) => store.bookingLogic)
  const userDataFromLS = useSelector((store) => store.user.userDataFromLS)
  const favouriteCars = userDataFromStore ? userDataFromStore.favoriteCars : ''

  //State Values
  const [recentData, setRecentData] = useState('')
  const [favCarData, setFavCarData] = useState('')
  const [loadPage, setLoadPage] = useState('dashboard')
  const [ImageModalOpen, setImageModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState()
  const [openPanel, setOpenPanel] = useState(false);


  //Constants
  const selectedDate = { pickupDate: bookingDataDates.pickupDate, dropOffDate: bookingDataDates.dropOffDate }

  const profileImages = ['one.png', 'two.png', 'three.png', 'four.png', 'five.png', 'six.png']

  const recentOrderColumn = [
    {
      title: 'Order Id',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 200
    },
    {
      title: 'Car Name',
      dataIndex: 'carName',
      key: 'carName',
      width: 200
    },
    {
      title: 'Pickup & Dropoff Location',
      dataIndex: 'location',
      key: 'location',
      width: 220,
      render: (text) => {
        const address = text.split(',')[0];
        return <div>{address}</div>;
      },
    },
    {
      title: 'PickUp Date',
      dataIndex: 'pickupDate',
      key: 'pickupDate',
      width: 100,
    },
    {
      title: 'DropOff Date',
      dataIndex: 'dropOffDate',
      key: 'dropOffDate',
      width: 100
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, { status }) => {
        let color = (status === 'Completed' ? 'green' : status === 'Scheduled' ? 'orange' : status === 'Cancelled' ? 'red' : '');
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>)
      }

    },
  ]

  //UseEffects
  useEffect(() => {
    dispatch(saveUserData())
  }, [])

  useEffect(() => {
    if (userDataFromLS) {
      dispatch(getUserDetails(userDataFromLS))
      dispatch(getAllBooking(userDataFromLS.token))
    }
  }, [dispatch, userDataFromLS])

  useEffect(() => {
    if (userDataFromStore) {
      setSelectedImage(userDataFromStore.profilePic)
    }
  }, [userDataFromStore])
  useEffect(() => {
    if (userDataFromLS) {
      dispatch(getAllBooking(userDataFromLS.token))

      if (carDataFromStore === '') {
        dispatch(getAllCarWithAvailability(selectedDate))
      }
      if (userDataFromStore === '') {
        dispatch(getUserDetails(userDataFromLS.token))

      }
    }
    else {
      navigate('/')
      setFavCarData(null)
      setRecentData(null)
    }
  }, [userDataFromLS])

  useEffect(() => {
    recentOrderDataLoaded(recentDataFromStore)
  }, [recentDataFromStore])

  useEffect(() => {
    updateFav()
  }, [favouriteCars])
  
  //Functions
  const recentOrderDataLoaded = (data1) => {
    if (data1) {
      var tempData = []
      tempData = (data1.map((data) => {
        return {
          key: data._id,
          orderId: data._id,
          carName: data.car ? data.car.carName : '',
          location: data.location,
          pickupDate: data.pickupDate,
          dropOffDate: data.dropOffDate,
          //Change
          status: 'Scheduled',
        }
      })
      )
      setRecentData(tempData)
    }
  }

  const updateFav = () => {
    if (userDataFromLS) {
      const userDetails = userDataFromStore ? userDataFromStore.favoriteCars : ''

      const carInfoFiltered = carDataFromStore ? carDataFromStore.map((data) => {
        if (userDetails.includes(data._id)) {
          return { ...data, fav: true }
        } else {
          return data
        }
      }).filter((data) => userDetails.includes(data._id)) : []
      setFavCarData(carInfoFiltered);
    }
  }

  //LogInModal
  const handleOkImageModal = () => {
    setImageModalOpen(false);
  };
  const handleCancelImageModal = () => {
    setImageModalOpen(false);
  };

  const imagesMapSelected = (data) => {
    if (userDataFromLS) {
      const userData = { userToken: userDataFromLS.token, picID: data }
      dispatch(addPicToUser(userData))
      setSelectedImage(data)
      setImageModalOpen(false)
    }
  }

  return (
    <div>
      <Modal centered width={'54vw'} open={ImageModalOpen} footer={null} onOk={handleOkImageModal} onCancel={handleCancelImageModal}>
        {profileImages.map((data) => {
          return <img src={data} alt={data} key={data} className='profileImageCard' onClick={() => imagesMapSelected(data)} />
        })}
      </Modal>
      <NavBar />
      <Row className='accountsPageOuter'>
        <Col span={2} xl={2} lg={2} xs={0}></Col>
        <Col span={20} xl={20} lg={20} xs={24}>
          <Row className='accountsPage'>
            {/* Account Info  */}
            {/* MobilePhone */}
            <Col span={0} xl={0} lg={0} xs={20}>
              <Button onClick={() => { setOpenPanel(!openPanel) }}>{openPanel ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}Account</Button>
              <SlidingPanel
                type={'left'}
                isOpen={openPanel}
                size={70}
              >
                <Card id='accountCard'>
                <Button id='menuSliderButton' onClick={() => { setOpenPanel(!openPanel) }}>{openPanel ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}</Button>
                  <div className='imageAccount' onClick={() => setImageModalOpen(true)}>
                    <EditOutlined className='imageAvatarEdit' />
                    <img src={selectedImage} alt={selectedImage} />
                  </div>
                  <h3>{userDataFromStore ? userDataFromStore.name : ''}</h3>
                  <h4>{userDataFromStore ? userDataFromStore.email : ''}</h4>
                  <div>
                    <div id='text' onClick={() => setLoadPage('dashboard')} > <HomeFilled /> Dashboard</div>
                    <div id='text' onClick={() => setLoadPage('orders')}><CalendarFilled /> Orders</div>
                    <div id='text' onClick={() => setLoadPage('favorites')}><CarFilled /> Favourite Cars</div>
                  </div>
                </Card>
              </SlidingPanel>
            </Col>
            {/* Laptops  */}
            <Col span={0} xl={5} lg={5} xs={0} >
                <Card id='accountCard'>
                  <div className='imageAccount' onClick={() => setImageModalOpen(true)}>
                    <EditOutlined className='imageAvatarEdit' />
                    <img src={selectedImage} alt={selectedImage} />
                  </div>
                  <h3>{userDataFromStore ? userDataFromStore.name : ''}</h3>
                  <h4>{userDataFromStore ? userDataFromStore.email : ''}</h4>
                  <div>
                    <div id='text' onClick={() => setLoadPage('dashboard')} > <HomeFilled /> Dashboard</div>
                    <div id='text' onClick={() => setLoadPage('orders')}><CalendarFilled /> Orders</div>
                    <div id='text' onClick={() => setLoadPage('favorites')}><CarFilled /> Favourite Cars</div>
                  </div>
                </Card>
            </Col>

            {(loadPage === 'dashboard') ?
              /* Dashboard */
              <Col span={19} xl={19} lg={19} xs={24}>
                <Card>
                  <h2>Recent Orders</h2>
                  {bookingLoading ? bookingLoading.allBookingloading ?
                    <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>
                    : <div className='recentOrderTable'>
                      <Table
                        id='accountTable'
                        columns={recentOrderColumn}
                        // dataSource={recentOrderData}
                        dataSource={recentData}
                        pagination={false}
                        scroll={{
                          x: 1000,
                          y: 200,
                        }}
                      >

                      </Table>
                    </div> : ''
                  }
                </Card>

                <Card id='accountFavCardOuter'>
                  <h2>Favourites</h2>
                  <div id='accountFavCardOuterCardScroll'>
                    {favCarData ?
                      favCarData.map((data) =>
                        <motion.div whileHover={{ scale: 1.02 }} onHoverStart={e => { }} onHoverEnd={e => { }}>
                          <Card className='accountFavCard'>
                            <Row>
                              <Col span={7} xl={7} lg={7} xs={24} id='image'><img src={data.carImage} alt={data.carName} /></Col>
                              <Col span={12} xl={12} lg={12} xs={24}>
                                <h2>{data.carName}</h2>
                                <Row>
                                  <Col span={12} xl={12} lg={12} xs={24}>
                                    <div><b>Seats</b>: {data.seats}</div>
                                    <div><b>Transmission</b>: {data.transmission}</div>
                                    <div><b>No. of Doors</b>: {data.doors}</div>
                                  </Col>
                                  <Col span={12} xl={12} lg={12} xs={24}>
                                    <div><b>Brand</b>: {data.brand}</div>
                                    <div><b>Type</b>: {data.carType}</div>
                                  </Col>
                                </Row>
                              </Col>
                              <Col span={5} xl={5} lg={5} xs={24} id='dailyRateColumn'>
                                <div>Daily Rate From</div>
                                <h1>$ {data.dailyRate}</h1>
                                <div><Button>Book now</Button></div>
                              </Col>
                            </Row>
                          </Card>
                        </motion.div>
                      ) : ''}
                  </div>
                </Card>
              </Col>
              :
              // OrderSection
              (loadPage === 'orders') ?
                <Col span={19} xl={19} lg={19} xs={24}>
                  <Card>
                    <h2>Recent Orders</h2>
                    <div className=''>
                      <Table
                        id='accountTable'
                        columns={recentOrderColumn}
                        // dataSource={recentOrderData}
                        dataSource={recentData}
                        pagination={false}
                        scroll={{
                          x: 1000,
                          // y: 200,
                        }}
                      >
                      </Table>
                    </div>
                  </Card>
                </Col>
                :
                (loadPage === 'favorites') ?
                  <Col span={15} xxl={19} xl={19} xs={24} className='fleetColumn' >
                    <Card>
                      <h2>Favourite Cars</h2>
                      <Row gutter={[24, 24]} className='topPicsCardInner' id='accountPage'>
                        {favCarData ?
                          favCarData.map((data) =>
                            <CarDetails data={data} key={data._id} showButton={false} userToken={userDataFromLS ? userDataFromLS.token : null} userId={userDataFromStore} />
                          ) : ''}
                      </Row>
                    </Card>
                  </Col>
                  : ''
            }
          </Row>
        </Col>
        <Col span={1}></Col>
      </Row>
      <Footer />
    </div>

  )
}

export default AccountsPage