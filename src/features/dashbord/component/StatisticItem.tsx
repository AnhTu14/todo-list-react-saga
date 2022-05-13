import * as React from "react";

export interface StatisticItemProps {
  label: string;
  value: string | number;
}

export default function StatisticItem({ label, value }: StatisticItemProps) {
  return (
    <div className="card bg-gradient-danger card-img-holder text-white">
      <div className="card-body">
        <h2 className="mb-3">{value}</h2>
        <h4 className="font-weight-normal mb-3">
          {label}
          <i className="mdi mdi-chart-line mdi-24px float-right"></i>
        </h4>
      </div>
    </div>
  );
}
