"use client";

import * as React from "react";
import { ReactElement } from "react";
import dynamic from "next/dynamic";
import { useDependenciesData } from "@/hooks/useDependenciesData";
import { GraphData } from "@/types/dependenciesData";

// Dynamically import the Graph component (react-graph-vis) so it doesn't render on the server.
const Graph = dynamic(() => import("react-graph-vis"), { ssr: false });

// Define the scale factor constant.
const SCALE_FACTOR = 3;

interface GraphEvent {
  nodes: number[];
  edges: number[];
}

interface GraphSectionProps {
  index: number;
}

export default function GraphSection({ index }: GraphSectionProps): ReactElement {
  const { graphDataArr } = useDependenciesData();

  // Fallback: If the graph data at the current index is not available, use the first one.
  const graphData = graphDataArr[index] || graphDataArr[0];

  if (!graphData || !graphData.edges) {
    return <div>No graph data available.</div>;
  }

  // Options for the graph layout and styling.
  const options = React.useMemo(
    () => ({
      layout: {
        hierarchical: true,
      },
      edges: {
        color: "#000000",
      },
      height: "500px",
    }),
    []
  );

  // Normalize edge widths based on the maximum width.
  const maxWeight = Math.max(...graphData.edges.map((edge) => edge.width));
  const normalizedGraphData: GraphData = {
    ...graphData,
    edges: graphData.edges.map((edge) => ({
      ...edge,
      width: maxWeight > 0 ? (edge.width * SCALE_FACTOR) / maxWeight : 0,
    })),
  };

  console.log("================");
  console.log(normalizedGraphData);
  console.log("================");

  // Define event handlers for the graph.
  const events = React.useMemo(
    () => ({
      select: function (event: GraphEvent): void {
        const { nodes, edges } = event;
        // (Optional) Handle node/edge selection.
      },
    }),
    []
  );

  // Use a unique key that depends on both the active tab index and the graph's resultId.
  // This forces the Graph component to remount when the active tab changes.
  const graphKey = `graph-${index}-${graphData.resultId}`;

  return (
    <div>
      <Graph
        key={graphKey}
        graph={normalizedGraphData}
        options={options}
        events={events}
      />
    </div>
  );
}
