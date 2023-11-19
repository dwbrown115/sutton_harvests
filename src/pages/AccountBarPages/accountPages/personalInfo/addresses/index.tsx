import { AccountBar, AccountSidebar } from "../../../../../components";

export default function addresses() {
  return (
    <div>
      <AccountBar />
      <div className="mx-10">
        <div className="flex">
          <AccountSidebar />
          <div>
            <h1>Addresses</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
