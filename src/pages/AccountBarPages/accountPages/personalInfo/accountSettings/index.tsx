import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

import { AccountBar, AccountSidebar } from "../../../../../components";
import { firebase_app, updateData } from "../../../../../firebase";

export default function accountSettings() {
  const auth = getAuth(firebase_app);
  const db = getFirestore(firebase_app);
  const user = auth.currentUser;

  const [editUserName, setEditUserName] = useState(false);
  const [userName, setUserName] = useState("");
  const [editName, setEditName] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editAccountType, setEditAccountType] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [editEmail, setEditEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [editPhoneNumber, setEditPhoneNumber] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("N/A");
  const [editAddress, setEditAddress] = useState(false);
  const [streetAddress, setStreetAddress] = useState("N/A");
  const [streetAddress2, setStreetAddress2] = useState("");
  const [city, setCity] = useState("N/A");
  const [state, setState] = useState("N/A");
  const [zipCode, setZipCode] = useState("N/A");

  async function grabUser() {
    if (user) {
      const collection = "Users";
      const id = auth.currentUser.uid;
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);
      try {
        const data = docSnap.data();
        if (data) {
          if (data["userName"]) {
            setUserName(data["userName"]);
            setFirstName(data["name"]);
            setMiddleName(data["middleName"]);
            setLastName(data["lastName"]);
            setAccountType(data["accountType"]);
            setEmail(data["email"]);
            setState(data["state"]);
            if (data["phoneNumber"]) {
              setPhoneNumber(data["phoneNumber"]);
            }
            if (data["streetAddress"]) {
              setStreetAddress(data["streetAddress"]);
              setStreetAddress2(data["streetAddress2"]);
              setCity(data["city"]);
              setZipCode(data["zipCode"]);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        grabUser();
      }
    });
  }, [user]);

  function handleEditUserNameForm(e: any) {
    e.preventDefault();
    setEditUserName(false);
    if (auth.currentUser) {
      updateData("Users", auth.currentUser.uid, { userName: userName });
    }
  }

  function handleEditUserName() {
    return (
      <div className="py-8 flex">
        <div className="w-1/3 font-semibold">Username</div>
        {editUserName ? (
          <form
            onSubmit={handleEditUserNameForm}
            className="flex flex-col w-1/3"
          >
            <input
              className="border border-black rounded-md px-4 py-2 w-full bg-gray-50"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <div className="mt-2 justify-between flex">
              <button
                type="button"
                className="rounded-xl px-4 py-3 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white  w-12/25 text-sm"
                onClick={() => {
                  setEditUserName(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl px-4 py-3 border border-gray-600 text-white bg-gray-600 hover:bg-transparent hover:text-gray-600 w-12/25 text-sm"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex w-full">
            <div className="">{userName}</div>
            <div
              className="text-blue hover:text-purple underline cursor-pointer ml-auto"
              onClick={() => {
                setEditUserName(true);
              }}
            >
              Edit
            </div>
          </div>
        )}
      </div>
    );
  }

  function handleEditNameForm(e: any) {
    e.preventDefault();
    setEditName(false);
    if (auth.currentUser) {
      updateData("Users", auth.currentUser.uid, {
        name: firstName,
        middleName: middleName,
        lastName: lastName,
      });
    }
  }

  function handleEditName() {
    return (
      <div className="py-8 flex">
        <div className="w-1/3 font-semibold">Name</div>
        {editName ? (
          <form onSubmit={handleEditNameForm} className="flex flex-col w-1/3">
            <div className="flex flex-col">
              <input
                className="border border-black rounded-md px-4 py-2 w-full bg-gray-50 mx-auto mb-2"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="border border-black rounded-md px-4 py-2 w-full bg-gray-50 mx-auto mb-2"
                type="text"
                placeholder="Middle Name"
                value={middleName}
                onChange={(e) => {
                  setMiddleName(e.target.value);
                }}
              />
              <input
                className="border border-black rounded-md px-4 py-2 w-full bg-gray-50 mx-auto mb-2"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="mt-2 justify-between flex">
              <button
                type="button"
                className="rounded-xl px-4 py-3 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white  w-12/25 text-sm"
                onClick={() => {
                  setEditName(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl px-4 py-3 border border-gray-600 text-white bg-gray-600 hover:bg-transparent hover:text-gray-600 w-12/25 text-sm"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex w-full">
            <div>
              {firstName} {middleName} {lastName}
            </div>
            <div
              className="text-blue hover:text-purple underline cursor-pointer ml-auto"
              onClick={() => {
                setEditName(true);
              }}
            >
              Edit
            </div>
          </div>
        )}
      </div>
    );
  }

  function handleEditAccountTypeForm(e: any) {
    e.preventDefault();
    setEditAccountType(false);
    if (auth.currentUser) {
      updateData("Users", auth.currentUser.uid, { accountType: accountType });
    }
  }

  function handleEditAccountType() {
    return (
      <div className="py-8 flex">
        <div className="w-1/3 font-semibold">Account Type</div>
        {editAccountType ? (
          <form
            onSubmit={handleEditAccountTypeForm}
            className="flex flex-col w-1/3"
          >
            <select
              className="border border-black rounded-md px-4 py-2 w-full bg-gray-50"
              value={accountType}
              onChange={(e) => {
                setAccountType(e.target.value);
              }}
            >
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
            </select>
            <div className="mt-2 justify-between flex">
              <button
                type="button"
                className="rounded-xl px-4 py-3 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white  w-12/25 text-sm"
                onClick={() => {
                  setEditAccountType(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl px-4 py-3 border border-gray-600 text-white bg-gray-600 hover:bg-transparent hover:text-gray-600 w-12/25 text-sm"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex w-full">
            <div>{accountType}</div>
            <div
              className="text-blue hover:text-purple underline cursor-pointer ml-auto"
              onClick={() => {
                setEditAccountType(true);
              }}
            >
              Edit
            </div>
          </div>
        )}
      </div>
    );
  }

  function handleEditEmailForm(e: any) {
    e.preventDefault();
    setEditEmail(false);
    if (auth.currentUser) {
      updateData("Users", auth.currentUser.uid, { email: email });
    }
  }

  function handleEditPhoneNumberForm(e: any) {
    e.preventDefault();
    setEditPhoneNumber(false);
    if (auth.currentUser) {
      updateData("Users", auth.currentUser.uid, { phoneNumber: phoneNumber });
    }
  }

  function handleEditContactInfo() {
    return (
      <div className="py-8 flex">
        <div className="w-1/3 font-semibold">Contact info</div>
        <div className="flex flex-col w-full">
          <div>
            {editEmail ? (
              <form
                onSubmit={handleEditEmailForm}
                className="flex flex-col w-1/3"
              >
                <input
                  className="border border-black rounded-md px-4 py-2 w-full bg-gray-50"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="mt-2 justify-between flex">
                  <button
                    type="button"
                    className="rounded-xl px-4 py-3 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white  w-12/25 text-sm"
                    onClick={() => {
                      setEditEmail(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl px-4 py-3 border border-gray-600 text-white bg-gray-600 hover:bg-transparent hover:text-gray-600 w-12/25 text-sm"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex w-full">
                <div className="flex flex-col w-full">
                  <div className="mb-1 text-sm text-gray-600">
                    Email Address
                  </div>
                  <div>{email}</div>
                </div>
                <div
                  className="text-blue hover:text-purple underline cursor-pointer ml-auto"
                  onClick={() => {
                    setEditEmail(true);
                  }}
                >
                  Edit
                </div>
              </div>
            )}
          </div>
          <hr className="h-px my-4" />
          <div>
            {editPhoneNumber ? (
              <form
                onSubmit={handleEditPhoneNumberForm}
                className="flex flex-col w-1/3"
              >
                <input
                  className="border border-black rounded-md px-4 py-2 w-full bg-gray-50"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                <div className="mt-2 justify-between flex">
                  <button
                    type="button"
                    className="rounded-xl px-4 py-3 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white  w-12/25 text-sm"
                    onClick={() => {
                      setEditPhoneNumber(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl px-4 py-3 border border-gray-600 text-white bg-gray-600 hover:bg-transparent hover:text-gray-600 w-12/25 text-sm"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex w-full">
                <div className="flex flex-col w-full">
                  <div className="mb-1 text-sm text-gray-600">Phone Number</div>
                  <div>{phoneNumber}</div>
                </div>
                <div
                  className="text-blue hover:text-purple underline cursor-pointer ml-auto"
                  onClick={() => {
                    setEditPhoneNumber(true);
                  }}
                >
                  Edit
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function handleEditAddressForm(e: any) {
    e.preventDefault();
    setEditAddress(false);
    if (auth.currentUser) {
      updateData("Users", auth.currentUser.uid, {
        streetAddress: streetAddress,
        streetAddress2: streetAddress2,
        city: city,
        state: state,
        zipCode: zipCode,
      });
    }
  }

  function handleEditAddress() {
    return (
      <div className="py-8 flex">
        <div className="w-1/3 font-semibold">Primary Address</div>
        {editAddress ? (
          <form
            onSubmit={handleEditAddressForm}
            className="flex flex-col w-1/2"
          >
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="border border-black rounded-md px-4 py-2 w-12/25 bg-gray-50 mb-2">
                  <div className="text-xs">Street address</div>
                  <input
                    className="focus:outline-none bg-gray-50 text-sm"
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(e) => {
                      setStreetAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="border border-black rounded-md px-4 py-2 w-12/25 bg-gray-50 mb-2">
                  <div className="text-xs">Street address 2</div>
                  <input
                    className="focus:outline-none bg-gray-50 text-sm"
                    type="text"
                    placeholder="Street Address 2"
                    value={streetAddress2}
                    onChange={(e) => {
                      setStreetAddress2(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="border border-black rounded-md px-4 py-2 w-12/25 bg-gray-50 mb-2">
                  <div className="text-xs">City</div>
                  <input
                    className="focus:outline-none bg-gray-50 text-sm"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <select
                  className="border border-black rounded-md px-4 py-2 w-12/25 bg-gray-50 mb-2"
                  placeholder="Select state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
              <div className="border border-black rounded-md px-4 py-2 w-12/25 bg-gray-50 mb-2">
                <div className="text-xs">Zip code</div>
                <input
                  className="focus:outline-none bg-gray-50 text-sm"
                  type="number"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-2 justify-between flex">
              <button
                type="button"
                className="rounded-xl px-4 py-3 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white  w-12/25 text-sm"
                onClick={() => {
                  setEditAddress(false);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl px-4 py-3 border border-gray-600 text-white bg-gray-600 hover:bg-transparent hover:text-gray-600 w-12/25 text-sm"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <div className="flex w-full">
            <div className="flex flex-col">
              <div className="mb-1 text-sm text-gray-600">
                Owner name, address
              </div>
              <div>
                <div className="mb-1">
                  {firstName} {middleName} {lastName}
                </div>
                <div className="mb-1">
                  {streetAddress} {streetAddress2}
                </div>
                <div className="mb-1">
                  {city}, {state} {zipCode}
                </div>
              </div>
            </div>
            <div
              className="text-blue hover:text-purple underline cursor-pointer ml-auto"
              onClick={() => {
                setEditAddress(true);
              }}
            >
              Edit
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <AccountBar />
      <div className="mx-10 mb-20">
        <div className="flex">
          <AccountSidebar />
          <div className="w-full">
            <div>
              <h1 className="text-3xl font-semibold pb-6">Account Info</h1>
            </div>
            <hr className="h-px" />
            {handleEditUserName()}
            <hr className="h-px" />
            {handleEditName()}
            <hr className="h-px" />
            {handleEditAccountType()}
            <hr className="h-px" />
            {handleEditContactInfo()}
            <hr className="h-px" />
            {handleEditAddress()}
            <hr className="h-px" />
          </div>
        </div>
      </div>
    </div>
  );
}
