import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);

  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
  const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      if (authState?.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/books/secure/currentloans`;
        const requestOption = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-type": "application/json",
          },
        };
        const shelfCurrentLoansResponse = await fetch(url, requestOption);
        if (!shelfCurrentLoansResponse.ok) {
          throw new Error("Something went wrong!");
        }
        const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
        setShelfCurrentLoans(shelfCurrentLoansResponseJson);
      }
      setIsLoadingUserLoans(false);
    };

    fetchUserCurrentLoans().catch((error: any) => {
      setIsLoadingUserLoans(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [authState, checkout]);

  if (isLoadingUserLoans) {
    return <SpinnerLoading />;
  }
  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  async function returnBook(bookId: number) {
    const url = `${process.env.REACT_APP_API}/books/secure/return/?bookId=${bookId}`;
    const requestOption = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      },
    };
    const returnResponse = await fetch(url, requestOption);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setCheckout(!checkout);
  }

  async function renewLoan(bookId: number) {
    const url = `${process.env.REACT_APP_API}/books/secure/renew/loan/?bookId=${bookId}`;
    const requestOption = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-type": "application/json",
      },
    };

    const returnResponse = await fetch(url, requestOption);
    if (!returnResponse.ok) {
      throw new Error("Something went wrong!");
    }
    setCheckout(!checkout);
  }

  return (
    <div>
      {/* Desktop */}
      <div className="d-none d-lg-block mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5>Current Loans: </h5>
            {shelfCurrentLoans.map((loan) => (
              <div key={loan.book.id}>
                <div className="row mt-3 mb-3">
                  <div className="col-4 col-md-4 container">
                    {loan.book?.img ? (
                      <img src={loan.book?.img} width="226" height="349" alt="Book" />
                    ) : (
                      <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} width="226" height="349" alt="Book" />
                    )}
                  </div>
                  <div className="card col-3 col-md-3 container d-flex">
                    <div className="card-body">
                      <div className="mt-3">
                        <h4>Loan Options</h4>
                        {loan.daysLeft > 0 && <p className="text-secondary">Due in {loan.daysLeft} days.</p>}
                        {loan.daysLeft === 0 && <p className="text-success">Due Today.</p>}
                        {loan.daysLeft < 0 && <p className="text-danger">Past due by {loan.daysLeft} days.</p>}
                        <div className="list-group mt-3">
                          <button className="list-group-item list-group-item-action" aria-current="true" data-bs-toggle="modal" data-bs-target={`#modal${loan.book.id}`}>
                            Manage Loan
                          </button>
                          <Link to={"search"} className="list-group-item list-group-item-action">
                            Search more books?
                          </Link>
                        </div>
                      </div>
                      <hr />
                      <p className="mt-3">Help other find their adventure by reviewing your loan.</p>
                      <Link className="btn btn-primary" to={`/checkout/${loan.book.id}`}>
                        Leave a review
                      </Link>
                    </div>
                  </div>
                </div>
                <hr />
                <LoansModal loan={loan} mobile={false} returnBook={returnBook} renewLoan={renewLoan} />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new book
            </Link>
          </>
        )}
      </div>
      {/* Mobile */}
      <div className="container d-lg-none mt-2">
        {shelfCurrentLoans.length > 0 ? (
          <>
            <h5 className="mb-3">Current Loans: </h5>
            {shelfCurrentLoans.map((loan) => (
              <div key={loan.book.id}>
                <div className="d-flex justify-content-center align-items-center">
                  {loan.book?.img ? (
                    <img src={loan.book?.img} width="226" height="349" alt="Book" />
                  ) : (
                    <img src={require("./../../../Images/BooksImages/book-luv2code-1000.png")} width="226" height="349" alt="Book" />
                  )}
                </div>
                <div className="card d-flex mt-5 mb-3">
                  <div className="card-body container">
                    <div className="mt-3">
                      <h4>Loan Options</h4>
                      {loan.daysLeft > 0 && <p className="text-secondary">Due in {loan.daysLeft} days.</p>}
                      {loan.daysLeft === 0 && <p className="text-success">Due Today.</p>}
                      {loan.daysLeft < 0 && <p className="text-danger">Past due by {loan.daysLeft} days.</p>}
                      <div className="list-group mt-3">
                        <button className="list-group-item list-group-item-action" aria-current="true" data-bs-toggle="modal" data-bs-target={`#mobilemodal${loan.book.id}`}>
                          Manage Loan
                        </button>
                        <Link to={"search"} className="list-group-item list-group-item-action">
                          Search more books?
                        </Link>
                      </div>
                    </div>
                    <hr />
                    <p className="mt-3">Help other find their adventure by reviewing your loan.</p>
                    <Link className="btn btn-primary" to={`/checkout/${loan.book.id}`}>
                      Leave a review
                    </Link>
                  </div>
                </div>

                <hr />
                <LoansModal loan={loan} mobile={true} returnBook={returnBook} renewLoan={renewLoan} />
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 className="mt-3">Currently no loans</h3>
            <Link className="btn btn-primary" to={`search`}>
              Search for a new book
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
