/* eslint-disable react/prop-types */
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/customers/profile', {
                    withCredentials: true,
                });
                setUser(data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null); 
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const isAdmin = () => user?.role === 'admin';
    const isActive = () => user?.status === 'active';

    return (
        <UserContext.Provider value={{ user, setUser, loading, error, isAdmin, isActive }}>
            {children}
        </UserContext.Provider>
    );
}


export default UserContextProvider;