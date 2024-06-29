import { useState, useEffect } from 'react';
import { fetchdata,url } from '../../../redux/action';

const useAllEmails = () => {
    const [allEmails, setAllEmails] = useState([]);

    useEffect(() => {
        const temp = localStorage.getItem('id');
        const fetchAllEmails = async () => {
            try {
                const result = await fetch(`${url}/fetchAllEmails/${temp}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const response = await result.json();
                const data = response.data;
                setAllEmails(data);
            } catch (error) {
                console.error('Error fetching emails:', error);
                
            }
        };
        fetchAllEmails();
    }, []);

    return allEmails;
};

export default useAllEmails;
