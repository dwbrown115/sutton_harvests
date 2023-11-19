import { AccountBar, AccountSidebar } from "../../../../../components";

export default function accountSettings() {
  return (
    <div>
      <AccountBar />
      <div className="mx-10">
        <div className="flex">
          <AccountSidebar />
          <div>
            <h1>Account Settings</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
