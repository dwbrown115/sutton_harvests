import { AccountBar, AccountSidebar } from "../../../components";

export default function sellerDashboard() {
  return (
    <div>
      <AccountBar />
      <div className="mx-10">
        <div className="flex">
          <AccountSidebar />
          <div>
            <h1>Sales Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
