import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {Card, Icon, Avatar, Typography, Row, Col } from 'antd';
import moment from 'moment';
import Axios from 'axios';

const { Meta } = Card;
const { Title } = Typography;

function SubscriptionPage() {

    const [Video, setVideo] = useState([])

    const variable = {
        userFrom: localStorage.getItem('userId')
    }

    useEffect(() => {
        Axios.post('/api/video/getSubscriptionVideos', variable)
            .then(response => {
                if(response.data.success) {
                    console.log(response.data);
                    setVideo(response.data.videos);
                } else {
                    alert('비디오 가져오기를 실패 했습니다.');
                }
            })
    }, []);


    const renderCards = Video.map((video, index) => {

    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor((video.duration - minutes * 60));

    return( <Col key={index} lg={6} md={8} xs={24}>

        <a href={`/video/${video._id}`}>
            <div style={{position: 'relative'}}>
                <img style={{width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
            </div>
        </a>
        <br />
        <Meta
            avatar={<Avatar src={video.writer.image} />}
            title={video.title}
            description=""
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{marginLeft: '3rem'}}>{video.view} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
    </Col>)


    })




    

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2} > Recommended </Title>
            <hr />
            <Row gutter={[32, 16]}>

                {Video && renderCards}
                

            </Row>
        </div>
    )
}
export default SubscriptionPage
