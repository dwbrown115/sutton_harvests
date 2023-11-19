import { NavLink } from "react-router-dom";

export default function accountSidebar() {
  const style = ({ isActive }: { isActive: boolean }) =>
    isActive ? "px-5 py-2.5 bg-sidebarGray" : "px-5 py-2.5 hover:underline";
  return (
    <div className="flex flex-col mr-8 w-1/6">
      <div className="flex flex-col">
        <div>Personal Information</div>
        <div className="flex flex-col">
          <NavLink className={style} to="/account/settings">
            Account Settings
          </NavLink>
          <NavLink className={style} to="/account/security-settings">
            Security Settings
          </NavLink>
          <NavLink className={style} to="/account/addresses">
            Addresses
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col">
        <div>Payment Information</div>
        <div className="flex flex-col">
          <NavLink className={style} to="/account/payment-methods">
            Payment Methods
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col">
        <div>Sales Information</div>
        <div className="flex flex-col">
          <NavLink className={style} to="/account/sales-dashboard">
            Seller Dashboard
          </NavLink>
          <NavLink className={style} to="/account/sales">
            Seller Account
          </NavLink>
        </div>
      </div>
    </div>
  );
}
