import {   useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextsProvider';
import axiosClient from '../axios-client';

const PaymentGuard = ({ children }) => {
    const {  setUser,  setPaymentInfo } = useStateContext();

    useEffect(() => {
        axiosClient
            .get("/user")
            .then(({ data }) => {
                setUser(data);
            })
            .catch(() => {
            });
    }, []);

    useEffect(() => {
        axiosClient
            .get("/UserPayment")
            .then(({ data }) => {
                setPaymentInfo(data);
            })
    }, [setUser]);


    if (!setPaymentInfo) {
        return <Navigate to="/payment" />;
    }

    return children;
};

export default PaymentGuard;
