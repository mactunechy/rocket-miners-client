import React, { useContext, useState } from 'react';
import AuthenticatedNavbar from '../components/AuthenticatedNavbar';
import Form from '../components/Forms/Form';
import * as Yup from 'yup';
import { useApi } from '../hooks/useApi';
import { createTransaction } from '../api/transaction';
import FormField from '../components/Forms/FormField';
import SubmitButton from '../components/Forms/SubmitButton';
import { Link } from 'react-router-dom';
import FormTextArea from '../components/Forms/FormTextArea';
import { authContext } from '../components/AuthContext';
import moment from 'moment';

const transactionSchema = Yup.object({
    bitcoinAddress: Yup.string().required().label('Bitcoin Address'),
    transactionId: Yup.string().required().label('Transaction ID'),
    comment: Yup.string().label('Comment'),
    depositAmount: Yup.number()
        .required()
        .min(50, 'Minimum Deposit is $50')
        .label('Amount'),
});

function Deposit() {
    const { loading, error, request, data } = useApi(createTransaction);
    const { user } = useContext(authContext);

    const handleSubmit = async (values) => {
        let payload = {
            ...values,
            maturityDate: moment(new Date()).add(14, 'days'),
            maturityAmount: values.depositAmount * 1.1,
            user: user._id,
        };
        await request(payload);
        window.scrollTo(0, 0);
    };

    return (
        <div className="container">
            <AuthenticatedNavbar />
            <div
                className="justify-content-center align-items-center row mx-0"
                style={{ minHeight: ' 100vh', width: '100%', marginTop: 100 }}
            >
                <div className="col-md-6 col-sm-10">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Deposit Bitcoin</h3>
                        </div>
                        <div className="card-body">
                            {error && <p className="text-danger">{error}</p>}
                            {data && (
                                <p className="text-success">
                                    Your deposit is being processed, check in a
                                    few minutes
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
                                    depositAmount: '',
                                    transactionId: '',
                                    comment: '',
                                    user: user.id,
                                    transactionStatus: 'PENDING',
                                }}
                                handleSubmit={handleSubmit}
                                validationSchema={transactionSchema}
                            >
                                <FormField
                                    name="depositAmount"
                                    placeholder="Amount in US DOLLAR"
                                    label="Amount"
                                    type="number"
                                />

                                <div className="alert alert-default border border-info">
                                    <p className="">
                                        Now send the equivalent bitcoin to this
                                        address
                                    </p>
                                    <p className="text-info">
                                        1T2VYKULMoBkUdFmh9EFV3qqUuy6C3znY
                                    </p>
                                </div>

                                <FormField
                                    name="bitcoinAddress"
                                    placeholder="Enter the bitcoin address you used to send"
                                    label="Bitcoin Address"
                                />
                                <FormField
                                    name="transactionId"
                                    placeholder="Enter the transaction ID of the deposit you made"
                                    label="Transaction ID"
                                    helpText="You can get the transaction ID from the transaction history in you bitcoin wallet"
                                />
                                <FormTextArea
                                    name="comment"
                                    placeholder="Optional comment"
                                    label="Comment"
                                    type="text"
                                />
                                <SubmitButton
                                    title="Complete Deposit"
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

export default Deposit;
