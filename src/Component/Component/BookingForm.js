import { Button, DatePicker, Form, Select, TimePicker, message } from 'antd'
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveBookingDetails } from '../../app/reducer';
import { getAllCarWithAvailability } from '../../app/carSlice';

function BookingForm(props) {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var moment = require('moment');
    const format = 'h:mm';
    const [messageApi, contextHolder] = message.useMessage();

    //Store Values
    const bookingData = useSelector((store) => store.booking.bookingValue)

    //State Values
    const [dropOddDateDisabler, setdropOffDateDisabler] = useState(bookingData.pickupDate);
    const [dropOffDateDisablerModal, setdropOffDateDisablerModal] = useState(bookingData.pickupDate);
    const [pickupDateSelected, setpickupDateSelected] = useState(bookingData.pickupDate);
    const [dropOffDateSelected, setdropOffDateSelected] = useState(bookingData.dropOffDate)
    const [pickupDateSelectedModal, setpickupDateSelectedModal] = useState(moment(bookingData.pickupDate));
    const [datesButtonDisabled, setdatesButtonDisabled] = useState(true)
   
    //Constants
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Please select time!',
            },
        ],
    };

    //useEffects
    useEffect(() => {
        setpickupDateSelected(bookingData.pickupDate)
    }, [bookingData.pickupDate])
    useEffect(() => {
        setdropOffDateSelected(bookingData.dropOffDate)
    }, [bookingData.dropOffDate])
    useEffect(() => {
        setdatesButtonDisabled(true)
        setpickupDateSelected(bookingData.pickupDate)
        setdropOffDateSelected(bookingData.dropOffDate)
    }, [props.modalData])


    // BasicFunctions
    const confirmLocation = (values) => {
        form.submit()
    }

    const onFinishBookingDates = (fieldsValue) => {
        const values = {
            'location': fieldsValue['location'],
            'pickupDate': fieldsValue['PickUpDatePicker'].format('YYYY-MM-DD'),
            'pickupTime': fieldsValue['PickUpTimePicker'].format('HH:mm'),
            'dropOffDate': fieldsValue['DropOffDatePicker'].format('YYYY-MM-DD'),
            'dropOffTime': fieldsValue['DropOffTimePicker'].format('HH:mm'),
        }
        const selectedDateBookingTop = { pickupDate: values.pickupDate, dropOffDate: values.dropOffDate }
        if (props.formLocation === 'fleetPageTopSection') {
            dispatch(getAllCarWithAvailability(selectedDateBookingTop))
        }
        if (props.formLocation === 'fleetPageModal') {
            messageApi.open({
                type: 'success',
                content: 'Vehicle Is Available',
            });
            dispatch(getAllCarWithAvailability(selectedDateBookingTop))
            setdatesButtonDisabled(true)
        }
        if (props.formLocation === 'homePage') {
            navigate('/fleet')
        }
        dispatch(saveBookingDetails(values))
    }

    //Dates Functions
    const pickupDateSelectedFunction = (date) => {
        const nextDay = dayjs(date).add(1, 'day')
        setpickupDateSelected(date)
        setdropOffDateSelected(nextDay)
        setdropOffDateDisabler(date)
    }

    const DropOffDateSelectedFunction = (date) =>{
       var valueDropOffSelected = date
    }
    const pickupDateSelectedModalFunction = (date) => {
        const nextDayModal = dayjs(date).add(1, 'day')
        const currentMoment = moment(nextDayModal.format('YYYY-MM-DD'));

        setdatesButtonDisabled(false)
        setpickupDateSelected(date)
        setpickupDateSelectedModal(date)
        setdropOffDateDisablerModal(date)
        setdropOffDateDisabler(date)

        if (props.modalData.bookedDates && props.modalData.bookedDates.length>0) {
            return props.modalData.bookedDates.some((data) => {
                const pickupDateMoment = moment(data.pickupDate);
                const dropOffDateMoment = moment(data.dropOffDate);
                if (!(currentMoment.isBetween(pickupDateMoment, dropOffDateMoment) || currentMoment.isSame(pickupDateMoment) || currentMoment.isSame(dropOffDateMoment))) {
                    setdropOffDateSelected(nextDayModal)
                } else {
                    setdropOffDateSelected(date)
                }
            })
        }else{
            setdropOffDateSelected(nextDayModal)
        }     
    }

    //Regular Dates Picker Disablers
    const pickUpdisabledDate = (current) => {
        return current < dayjs().subtract(1, 'day')
    }
    const dropOffdisabledDate = (current) => {
        return current <= dropOddDateDisabler || current < dayjs()
    }

    //Regular Dates Picker Disablers For Modals
    const pickUpdisabledDateModal = (current) => {
        const currentMoment = moment(current.format('YYYY-MM-DD'));
        if (current < (dayjs().subtract(1, 'day'))) {
            return true
        }
        if (props.modalData.bookedDates) {
            return props.modalData.bookedDates.some((data) => {
                const pickupDateMoment = moment(data.pickupDate);
                const dropOffDateMoment = moment(data.dropOffDate);
                if (currentMoment.isBetween(pickupDateMoment, dropOffDateMoment) || currentMoment.isSame(pickupDateMoment) || currentMoment.isSame(dropOffDateMoment)) {
                    return true
                }
            })
        }
    }
    const dropOffdisabledDateModal = (current) => {
        var pickupDatesList = []
        let nextNearestDate = null;
        let minDiff = Infinity;
        const currentMoment = moment(current.format('YYYY-MM-DD'));
        pickupDatesList = props.modalData.bookedDates ? props.modalData.bookedDates.map((data) => data.pickupDate) : ''

        if(currentMoment <= pickupDateSelectedModal){
            return true
        }
        if (currentMoment <= dropOffDateDisablerModal) {
            return true
        }
        if (pickupDatesList.length > 0 && pickupDateSelectedModal) {
            pickupDatesList.forEach(date => {
                const date1 = moment(pickupDateSelectedModal.format('YYYY-MM-DD'))
                const date2 = moment(date, 'YYYY-MM-DD')
                const diff = date2.diff(date1, 'days');
                if (diff > 0 && diff < minDiff) {
                    minDiff = diff;
                    nextNearestDate = date;
                }
            });
            if (moment(current.format('YYYY-MM-DD')).isAfter(nextNearestDate)) {
                return true
            }

        }
        if (props.modalData.bookedDates) {
            return props.modalData.bookedDates.some((data) => {
                const pickupDateMoment = moment(data.pickupDate);
                const dropOffDateMoment = moment(data.dropOffDate);
                if (currentMoment.isBetween(pickupDateMoment, dropOffDateMoment) || currentMoment.isSame(pickupDateMoment) || currentMoment.isSame(dropOffDateMoment)) {
                    return true
                }
            })
        }

    }

    return (

        <div className={props.formLocation === 'fleetPageTopSection' ? 'bookingFormOuterTop' : 'bookingFormOuter'}>
            {contextHolder}
            <Form
                form={form}
                className={props.formLocation === 'fleetPageTopSection' ? 'formBookingTop' : 'formBooking'}
                name="time_related_controls"
                onFinish={onFinishBookingDates}
                fields={[
                    {
                        name: ['location'],
                        value: bookingData.location
                    },
                    {
                        name: ['PickUpDatePicker'],
                        value: dayjs(props.formLocationAdditional === 'FleetPageModal' ? pickupDateSelected : pickupDateSelected)
                    },
                    {
                        name: ['PickUpTimePicker'],
                        value: dayjs(bookingData.pickupTime, format)
                    },
                    {
                        name: ['DropOffDatePicker'],
                        value: dayjs(dropOffDateSelected)
                    },
                    {
                        name: ['DropOffTimePicker'],
                        value: dayjs(bookingData.dropOffTime, format)
                    }
                ]}>
                <div id='formBookinTopDivision'><h2>Pickup Location</h2>
                    <Form.Item name='location' className='locationForm' initialValue="1171 Kenaston Street,Ottawa,K1B 4A6">
                        <Select placeholder="Please select a location" >
                            <Select.Option value="1171 Kenaston Street,Ottawa,K1B 4A6">1171 Kenaston Street,Ottawa,K1B 4A6</Select.Option>
                            <Select.Option value="2464 Sheffield Rd,Ottawa,K1B 4E5">2464 Sheffield Rd,Ottawa,K1B 4E5</Select.Option>
                            <Select.Option value="650 Beeacon Hill South,Ottawa,K1J 7V8">650 Beeacon Hill South,Ottawa,K1J 7V8</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
                <div id='formBookinTopDivision'><h2>Pickup Date & Time</h2>
                    <div id='datePicker'>
                        <Form.Item name="PickUpDatePicker"  {...config}>
                            <DatePicker allowClear={false} disabledDate={props.formLocationAdditional === 'FleetPageModal' ? pickUpdisabledDateModal : pickUpdisabledDate} onChange={(date) => { props.formLocationAdditional === 'FleetPageModal' ? pickupDateSelectedModalFunction(date) : pickupDateSelectedFunction(date) }} />
                        </Form.Item>
                        <Form.Item name="PickUpTimePicker" {...config} className='second'>
                            <TimePicker use12Hours minuteStep={30} format="h:mm A" />
                        </Form.Item>
                    </div>
                </div>
                <div id='formBookinTopDivision'> <h2>Dropoff Date & Time</h2>
                    <div id='datePicker'>
                        <Form.Item name="DropOffDatePicker"  {...config}>
                            <DatePicker  allowClear={false} disabledDate={props.formLocationAdditional === 'FleetPageModal' ? dropOffdisabledDateModal : dropOffdisabledDate} onChange={(date) => { props.formLocationAdditional === 'FleetPageModal' ? setdatesButtonDisabled(false) :  DropOffDateSelectedFunction(date) }}/>
                        </Form.Item>
                        <Form.Item name="DropOffTimePicker"  {...config} className='second'>
                            <TimePicker use12Hours minuteStep={30} format="h:mm A" />
                        </Form.Item>
                    </div>
                </div>
                <div className='submitButton'>
                    <Form.Item >
                        {props.formLocation === 'fleetPageModal' ?
                            <Button type="primary" htmlType="submit" className='submit' disabled={datesButtonDisabled}>
                                Confirm Dates
                            </Button>
                            : props.formLocation === 'bookingPage' ?
                                <Button type="primary" htmlType="submit" className='submit' onClick={confirmLocation}>
                                    Confirm Time & Location
                                </Button>
                                :
                                <Button type="primary" htmlType="submit" className='submit'>
                                    Submit
                                </Button>
                        }
                    </Form.Item>
                </div>
            </Form>
        </div>
    )
}

export default BookingForm