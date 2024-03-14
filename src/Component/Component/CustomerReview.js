import React from 'react'
import { Card, Space, Rate, Row, Col } from 'antd'
import '../Page/HomePage.scss'

function CustomerReview() {

    //Constants
    const Reviews = [
        { Name: 'Emily Johnson', image: 'https://www.dotcomwomen.com/wp-content/uploads/2022/01/supercars-for-girls.jpg', Rating: 4.8, Review: '"Absolutely amazing experience! The Lamborghini Huracan was a dream to drive, and the team at DreamWheels made the rental process so easy. I highly recommend this company for anyone looking to add a little excitement to their day."' },
        { Name: 'Michael J', image: 'https://www.japantimes.co.jp/uploads/imported_images/uploads/2023/03/np_file_217769.jpeg', Rating: 4.5, Review: '"I rented the Rolls-Royce Wraith for my wedding, and it was the perfect choice. The car was stunning, and the service from DreamWheels was exceptional. They even added a personal touch with a congratulations card for us. Thank you so much!"' },
        { Name: 'Sarah Chang', image: 'https://media.istockphoto.com/id/1406233756/photo/smiling-young-woman-choosing-eyeglasses-in-optical-store.jpg?s=612x612&w=0&k=20&c=bPuslHvx5Mlnk3uvw9u9i2zjeMorGp9LVu7pOKxWMtA=', Rating: 5, Review: '"Ive rented from other exotic car rental companies before, but DreamWheels is in a league of its own. Their selection of cars is unbeatable, and the staff really goes above and beyond to make sure you have a great experience. Ill definitely be renting from them again."' },
        { Name: 'David Thompson', image: 'https://apsupercarrental.com/wp-content/uploads/2022/07/1024x650.jpg', Rating: 4, Review: '"I surprised my husband with a weekend rental of the Ferrari 488 GTB, and it was the highlight of his year. The car was in immaculate condition, and we felt like celebrities driving it around town. DreamWheels exceeded all our expectations."' },
        { Name: 'Jennifer Rodriguez', image: 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', Rating: 4.5, Review: '"If youre looking for an unforgettable experience, look no further than DreamWheels Exotic Rentals. The staff was incredibly friendly and helpful, and the McLaren 720S we rented was out of this world. We had a blast driving it and cant wait to come back for more."' },
        { Name: 'Christopher Lee', image: 'https://st2.depositphotos.com/2931363/6569/i/450/depositphotos_65699901-stock-photo-black-man-keeping-arms-crossed.jpg', Rating: 5, Review: '"Absolutely amazing experience! The team at DreamWheels Exotic Rentals went above and beyond to ensure we had the perfect car for our special occasion. The Lamborghini Huracan we rented was in pristine condition and drove like a dream. Highly recommend!"' },
        { Name: 'Samantha Nguyen', image: 'https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg', Rating: 4.7, Review: '"Ive rented from other luxury car rental companies in the past, but none compare to DreamWheels. The level of service and attention to detail is simply unmatched. The Ferrari 488 GTB I rented was in perfect condition, and the staff made the whole rental process easy and stress-free. Cant wait to rent from them again!"' },
        { Name: 'Daniel Garcia', image: 'https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg', Rating: 5, Review: '"If youre looking for the ultimate driving experience, look no further than DreamWheels Exotic Rentals. I recently rented the Rolls-Royce Wraith for a weekend trip, and it was an absolute joy to drive. The car was in impeccable condition, and the staff was extremely helpful and accommodating. I highly recommend this company for anyone looking to rent an exotic car."' },
        { Name: 'Olivia Smith', image: 'https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg', Rating: 4, Review: '"DreamWheels Exotic Rentals is hands down the best luxury car rental company in the area. The selection of cars is incredible, and the staff is friendly, professional, and knowledgeable. I rented the Bentley Continental GT for a business trip, and it made a huge impression on my clients. I will definitely be renting from them again!"' },
        { Name: 'Ethan Wilson', image: 'https://st3.depositphotos.com/12985790/17379/i/450/depositphotos_173795806-stock-photo-man-pointing-away-with-finger.jpg', Rating: 4.5, Review: '"I cannot recommend DreamWheels Exotic Rentals enough. The service was exceptional, and the Porsche 911 I rented was an absolute blast to drive. I was blown away by the quality of the car and the level of service from the staff. If youre looking for an unforgettable driving experience, look no further than DreamWheels."' },
    ]

    //Functions
    const Slider = ({ children }) => {
        return (
            <div className="container">
                <div className="content">{children}</div>
                <div className="content">{children}</div>
            </div>
        )
    }

    const data = Reviews.map((data) => {
        return (
            <Card className='reviewCardInner'>
                <img src={data.image} alt={data.Name} style={{ height: '100%', width: '100%' }}></img>
                <h2>{data.Name}</h2>
                <span><b>Rating  </b>  <Rate value={data.Rating}></Rate></span>
                <h3>{data.Review}</h3>
            </Card>
        )
    })

    
    return (
        <div>
            <Card className='reviewCardOuter1'>
                <h1>What our Clients Say About Us</h1>
                <Row>
                    <Col span={22} >
                        <Space size={20} className='reviewCardOuter1Col' >
                            <Slider >
                                {data}
                            </Slider>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default CustomerReview