"use client";

import { useDependenciesData } from "@/hooks/useDependenciesData";
import * as React from "react";
import { ReactElement } from "react";

interface DistributionSectionProps {
  index: number;
}

export default function DistributionSection({
  index,
}: DistributionSectionProps): ReactElement {
  const { distributionDataArr } = useDependenciesData();

  const data = distributionDataArr
    ? distributionDataArr?.[index]?.distributionData
    : undefined;

  return (
    <div>
      {data && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2 w-36">{item.name}</td>
                <td className="border border-gray-300 p-2">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
