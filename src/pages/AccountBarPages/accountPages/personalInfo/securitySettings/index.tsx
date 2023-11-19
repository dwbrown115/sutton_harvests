import { AccountBar, AccountSidebar } from "../../../../../components";

export default function securitySettings() {
  return (
    <div>
      <AccountBar />
      <div className="mx-10">
        <div className="flex">
          <AccountSidebar />
          <div>
            <h1>Security Settings</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
