import React, { useContext, useEffect } from 'react';
import AuthenticatedNavbar from '../components/AuthenticatedNavbar';
import Form from '../components/Forms/Form';
import * as Yup from 'yup';
import { useApi } from '../hooks/useApi';
import {
    createTransaction,
    getOne,
    updateTransaction,
} from '../api/transaction';
import FormField from '../components/Forms/FormField';
import SubmitButton from '../components/Forms/SubmitButton';
import { Link, useParams } from 'react-router-dom';
import FormTextArea from '../components/Forms/FormTextArea';
import { authContext } from '../components/AuthContext';

function Withdraw() {
    const { loading, error, request, data } = useApi(updateTransaction);
    const getTransactionApi = useApi(getOne);
    const { user } = useContext(authContext);
    const { _id } = useParams();

    const handleSubmit = async (values) => {
        await request({
            ...values,
            withdrawnAmount:
                getTransactionApi.data?.withdrawnAmount - values.amount * -1,
            amount: values.amount * -1,
            maturityAmount:
                getTransactionApi.data?.maturityAmount - values.amount,
            _id: getTransactionApi.data?.id,
        });
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        getTransactionApi.request(_id);
    }, [_id]);

    const transactionSchema = Yup.object({
        bitcoinAddress: Yup.string().required().label('Bitcoin Address'),
        comment: Yup.string().label('Comment'),
        amount: Yup.number()
            .required()
            .min(20, 'Minimum Withdrawal is $20')
            .max(
                getTransactionApi.data?.maturityAmount,
                `Max withdrawal from this deposit is ${getTransactionApi.data?.maturityAmount} `
            )
            .label('Amount'),
    });

    return (
        <div>
            <AuthenticatedNavbar />
            <div
                className="justify-content-center align-items-center row mx-0"
                style={{ minHeight: ' 100vh', width: '100%', marginTop: 100 }}
            >
                <div className="col-md-6 col-sm-10">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Withdraw Bitcoin</h3>
                        </div>
                        <div className="card-body">
                            {error && <p className="text-danger">{error}</p>}
                            {data && (
                                <p className="text-success">
                                    Your withdrawal is being processed, check in
                                    a few minutes
                                    <Link
                                        to="/dashboard"
                                        className="text-dark font-weight-bold underline"
                                    >
                                        {' '}
                                        Back to dashboard
                                    </Link>
                                </p>
                            )}
                            <Form
                                initialValues={{
                                    bitcoinAddress: '',
                                    amount: '',
                                    comment: '',
                                    user: user.id,
                                    transactionStatus: 'PENDING - WITHDRAWAL',
                                }}
                                handleSubmit={handleSubmit}
                                validationSchema={transactionSchema}
                            >
                                <div className="alert alert-default border border-info">
                                    <p className="">
                                        Your withdrawal will be debited to
                                        deposit number{' '}
                                        <span className="font-weight-bold">
                                            {getTransactionApi.data?._id}
                                        </span>
                                    </p>
                                    <p className="text-danger">
                                        Maximum possible withdrawal : $
                                        {getTransactionApi.data?.maturityAmount}
                                    </p>
                                </div>
                                <FormField
                                    name="amount"
                                    placeholder="Amount in US DOLLAR"
                                    label="Amount"
                                    type="number"
                                />
                                <FormField
                                    name="bitcoinAddress"
                                    placeholder="Enter the bitcoin address you used to send"
                                    label="Bitcoin Address"
                                />
                                <FormTextArea
                                    name="comment"
                                    placeholder="Optional comment"
                                    label="Comment"
                                    type="text"
                                />
                                <SubmitButton
                                    title="Complete Withdrawal"
                                    loading={loading}
                                />
                                <span className="ml-3">
                                    {' '}
                                    <Link to="/dashboard">Cancel</Link>
                                </span>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Withdraw;
