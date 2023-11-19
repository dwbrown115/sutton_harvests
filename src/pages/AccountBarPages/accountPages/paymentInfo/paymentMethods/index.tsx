import { AccountBar, AccountSidebar } from "../../../../../components";

export default function paymentMethods() {
  return (
    <div>
      <AccountBar />
      <div className="mx-10">
        <div className="flex">
          <AccountSidebar />
          <div>
            <h1>Payment methods</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
