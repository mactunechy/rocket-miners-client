import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import AuthenticatedNavbar from '../components/AuthenticatedNavbar';
import { useApi } from '../hooks/useApi';
import { getAll, updateTransaction } from '../api/transaction';
import CryptoPrice from 'crypto-price';
import { authContext } from '../components/AuthContext';

function Dashboard() {
    const getTransactionsApi = useApi(getAll);
    const updateTransactionApi = useApi(updateTransaction);
    const [btcPrice, setBtcPrice] = useState(1);
    const [balance, setBalance] = useState(0);
    const [btcBalance, setBtcBalance] = useState(0);
    const { user } = useContext(authContext);

    const getBtcPrice = async () => {
        const price = await CryptoPrice.getCryptoPrice('USD', 'BTC');
        if (price?.price) setBtcPrice(parseFloat(price.price));
    };

    useEffect(() => {
        getTransactionsApi.request(user._id);
        getBtcPrice();
        calculateTotal();
    }, [user]);
    useEffect(() => {
        getBtcPrice();
        calculateTotal();
    }, [getTransactionsApi]);

    //! TODO: Fix calculation
    const calculateTotal = () => {
        let balance = getTransactionsApi.data?.reduce(
            (total, currentTransaction) => {
                if (!currentTransaction.maturityAmount) return total;
                return total + currentTransaction.maturityAmount;
            },
            0
        );
        let btcBalance = balance / btcPrice;

        setBalance(balance);
        setBtcBalance(btcBalance);
    };

    const handleReInvest = async (transaction) => {
        if (transaction.maturityAmount <= 0) return;
        const yes = window.confirm(
            'Are you sure you want to reinvest, this process is ireversible?'
        );
        if (!yes) return;

        await updateTransactionApi.request({
            _id: transaction._id,
            maturityAmount: transaction.maturityAmount * 1.1,
            maturityDate: moment(new Date()).add(14, 'days'),
            transactionStatus: 'PENDING',
        });

        getTransactionsApi.request(user._id);
    };
    return (
        <div>
            <AuthenticatedNavbar />
            <div className="container mt-5">
                <div className="card" style={{ marginTop: 150 }}>
                    <div className="card-header bg-primary">
                        <h4 className="card-title">Account Information</h4>
                    </div>
                    <div className="card-body">
                        <div className="row justify-content-between">
                            <div className="col-md-6">
                                <h3 className="mb-0">
                                    Balance <small>(maturity Balance)</small>:
                                </h3>
                                <h2 className="mt-0">
                                    ${balance?.toFixed(2)}USD
                                </h2>
                                <h3 className="mb-0">
                                    {btcBalance.toFixed(5) || '0,0000'} bitcoins
                                </h3>
                                <p>
                                    price delivered by blockchain.com at 1btc =
                                    ${btcPrice}USD
                                </p>
                            </div>
                            <div className="col-md-6 align-items-center ">
                                <Link
                                    to="/deposit"
                                    className="btn btn-lg btn-info"
                                >
                                    Deposit
                                </Link>
                                {/* <Link
                                    to="/withdraw"
                                    className="btn btn-lg btn-danger"
                                >
                                    Withdraw
                                </Link> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h4 className="card-title">Transaction History</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive table-bordered table-hover">
                            <table className=" table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Deposited (BTC/USD)</th>
                                        <th scope="col">Deposit Date</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Maturity (BTC/USD)</th>
                                        <th scope="col">Maturity Date</th>
                                        <th scope="col">Withdrawn (BTC/USD)</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {getTransactionsApi.loading && (
                                        <tr>
                                            <td colSpan={8}>
                                                <h3 className="text-center">
                                                    Loading...
                                                </h3>
                                            </td>
                                        </tr>
                                    )}
                                    {getTransactionsApi.data?.length === 0 ? (
                                        <tr>
                                            <td colSpan={8}>
                                                <h3 className="text-center">
                                                    You haven't made any
                                                    transaction,{' '}
                                                    <Link
                                                        to="/deposit"
                                                        className="text-info"
                                                    >
                                                        Deposit Bitcoin
                                                    </Link>
                                                </h3>
                                            </td>
                                        </tr>
                                    ) : (
                                        getTransactionsApi.data?.map(
                                            (transaction, index) => {
                                                console.log(
                                                    moment(new Date()).diff(
                                                        transaction.maturityDate,
                                                        'days'
                                                    )
                                                );

                                                return (
                                                    <tr
                                                        key={transaction._id}
                                                        className={` table-${
                                                            transaction.amount <
                                                            0
                                                                ? 'danger'
                                                                : 'success'
                                                        }`}
                                                    >
                                                        <th scope="row">
                                                            {index + 1}
                                                        </th>
                                                        <td>
                                                            {
                                                                transaction.depositAmount
                                                            }
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                transaction.createdAt
                                                            ).format('ll')}
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.transactionStatus
                                                            }
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.maturityAmount
                                                            }
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                transaction.maturityDate
                                                            ).format('ll')}
                                                        </td>
                                                        <td>
                                                            {
                                                                transaction.withdrawnAmount
                                                            }
                                                        </td>
                                                        <td className="py-0">
                                                            {moment(
                                                                new Date()
                                                            ).diff(
                                                                transaction.maturityDate,
                                                                'days'
                                                            ) >= 0 ? (
                                                                <div className="btn-group">
                                                                    <button
                                                                        className="btn btn-info btn-sm"
                                                                        onClick={() =>
                                                                            handleReInvest(
                                                                                transaction
                                                                            )
                                                                        }
                                                                    >
                                                                        ReInvest
                                                                    </button>
                                                                    <Link
                                                                        to={`withdraw/${transaction._id}`}
                                                                        className="btn btn-danger btn-sm"
                                                                    >
                                                                        Withdraw
                                                                    </Link>
                                                                </div>
                                                            ) : (
                                                                transaction.transactionStatus
                                                            )}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
