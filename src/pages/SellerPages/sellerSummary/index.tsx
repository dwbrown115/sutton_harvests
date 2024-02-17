import { SalesDashNav } from "../../../components";

export default function sellerSummary() {
  return (
    <div>
      <div className="mx-10">
        <SalesDashNav />
        <div className="flex">
          <div>
            <h1>Sales Summary</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
