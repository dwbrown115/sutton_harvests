import { AccountBar, AccountSidebar } from "../../../../components";

export default function Account() {
  return (
    <div>
      <AccountBar />
      <div className="mx-10">
        <div className="flex">
          <AccountSidebar />
          <div>
            <h1>Account</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
