import React, { useState } from 'react';
import axios from 'axios';

/**
 * PostSearch component for searching posts by title.
 * @returns {JSX.Element} - Rendered component.
 */
const PostSearch: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    /**
     * Handles search input change and fetches search results.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     */
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query) {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`http://localhost:3000/api/post/search?q=${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="post-search-container">
            <input
                type="text"
                placeholder="Search posts by title"
                value={searchQuery}
                onChange={handleSearch}
            />
            <ul>
                {searchResults.map((post) => (
                    <li key={post._id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default PostSearch;
