import { useState } from "react";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { AccountBar, AccountSidebar } from "../../../../../components";
import { firebase_app } from "../../../../../firebase";
import { logOut } from "../../../../../firebase";

export default function securitySettings() {
  const auth = getAuth(firebase_app);
  const router = useNavigate();
  const user = auth.currentUser;

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleUpdatePasswordForm(e: any) {
    e.preventDefault();
    if (auth.currentUser?.email) {
      const email = auth.currentUser.email;
      const credential = EmailAuthProvider.credential(email, oldPassword);
      await reauthenticateWithCredential(user!, credential)
        .then(async () => {
          if (newPassword === confirmNewPassword) {
            await updatePassword(user!, newPassword)
              .then(() => {
                // alert("Password updated successfully!");
                logOut();
                router("/signin");
              })
              .catch((error) => {
                setError(error.message);
              });
          } else {
            setError("Passwords do not match!");
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }

  function handleUpdatePassword() {
    return (
      <div className="py-8 flex">
        <div className="w-1/3 font-semibold">Password</div>
        {editPassword ? (
          <form
            onSubmit={handleUpdatePasswordForm}
            className="flex flex-col w-1/3"
          >
            <div>Update password your current password</div>
            <div className="text-red mt-3">{error}</div>
            <input
              className="border border-black rounded-md px-4 py-2 mt-4 w-full bg-gray-50"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              required
              value={oldPassword}
              id="oldPassword"
              placeholder="Current password:"
            />
            <input
              className="border border-black rounded-md px-4 py-2 mt-4 w-full bg-gray-50"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              required
              value={newPassword}
              id="newPassword"
              placeholder="New password:"
            />
            <input
              className="border border-black rounded-md px-4 py-2 mt-4 w-full bg-gray-50"
              type="password"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              value={confirmNewPassword}
              id="confirmNewPassword"
              placeholder="Confirm new password:"
            />
            <div className="mt-4 justify-between flex">
              <button
                type="button"
                className="rounded-xl px-4 py-3 border border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white  w-12/25 text-sm"
                onClick={() => {
                  setEditPassword(false);
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
            <div>Update password your current password</div>
            <div
              className="text-blue hover:text-purple underline cursor-pointer ml-auto"
              onClick={() => {
                setEditPassword(true);
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
      <div className="mx-10">
        <div className="flex">
          <AccountSidebar />
          <div className="w-full">
            <div>
              <h1 className="text-3xl font-semibold text-gray-700	 pb-6">
                Sign in and Security
              </h1>
            </div>
            <hr className="h-px" />
            {handleUpdatePassword()}
            <hr className="h-px" />
          </div>
        </div>
      </div>
    </div>
  );
}
