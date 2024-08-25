import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostSearch from './PostSearch';

/**
 * PostManagement component for handling posts creation and display.
 * @returns {JSX.Element} - Rendered component.
 */
const PostManagement: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [successCount, setSuccessCount] = useState<number>(0);
    const [failCount, setFailCount] = useState<number>(0);
    const [queueSize, setQueueSize] = useState<number>(0);
    const [totalPosts, setTotalPosts] = useState<number>(0);

    let randomNumber = Math.floor(Math.random() * 100) + 1; // add number to each post to make it unique
    /**
     * Resets all state variables to their initial values.
     */
    const resetState = () => {
        setCount(0);
        setSuccessCount(0);
        setFailCount(0);
        setQueueSize(0);
    };

    /**
     * Creates a new post asynchronously and updates the state.
     */
    const createPost = async () => {
        setCount(count + 1);
        setQueueSize(queueSize + 1);

        const token = localStorage.getItem('token');


        try {
            const response = await axios.post('http://localhost:3000/api/post/create', {
                title: `New Post ${randomNumber}`,
                message: 'This is a new post.',
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 202) {
                setSuccessCount((prev) => prev + 1);
                fetchTotalPosts();
            }
        } catch (error) {
            setFailCount(failCount + 1);
        } finally {
            setQueueSize(prevQueueSize => Math.max(prevQueueSize - 1, 0));
        }
    };


    /**
     * Fetches the total number of posts from the backend.
     */
    const fetchTotalPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/post/count');
            setTotalPosts(response.data.count);
        } catch (error) {
            console.error('Error fetching total posts:', error);
        }
    };

    useEffect(() => {
        fetchTotalPosts();
    }, []);

    return (
        <div className="post-management-container">
            <div className="details-container">
                <h1>Post Management App</h1>
                <button onClick={resetState}>Reset State</button>
                <div className="stats-container">
                    <p>Total Attempts: {count}</p>
                    <p>Successful Posts: {successCount}</p>
                    <p>Failed Posts: {failCount}</p>
                    <p>Queue Size: {queueSize}</p>
                    <p>Total Posts in MongoDB: {totalPosts}</p>
                </div>
                <button onClick={createPost} >Create post</button>
                
            </div>
            <div className="search-container">
                <PostSearch />
            </div>
        </div>

    );
};

export default PostManagement;
