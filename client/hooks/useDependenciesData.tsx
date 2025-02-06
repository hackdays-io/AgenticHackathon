// client/hooks/useDependenciesData.tsx

import * as React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import { 
  DescriptionData, 
  GraphData, 
  DistributionData, 
  DependenciesData 
} from "@/types/dependenciesData";

interface DependenciesDataContextProps {
  descriptionDataArr: DescriptionData[];
  graphDataArr: GraphData[];
  distributionDataArr: DistributionData[];
  setDescriptionDataArr: React.Dispatch<React.SetStateAction<DescriptionData[]>>;
  setGraphDataArr: React.Dispatch<React.SetStateAction<GraphData[]>>;
  setDistributionDataArr: React.Dispatch<React.SetStateAction<DistributionData[]>>;
}

// -----------------------------------------------------------------------------
// Sample description data with metadata
// -----------------------------------------------------------------------------
const defaultDescriptionDataArr: DescriptionData[] = [
  {
    resultId: 1,
    name: "Too Many Yawns",
    description: "このアルゴリズムは、効率的な分配を目指しながらも公平性を加味しており、ユーザーのニーズに応じた最適な分配を行います。",
    metadata: { version: "1.0", author: "Team Alpha" }
  },
  {
    resultId: 2,
    name: "Community Pulse",
    description: "このアルゴリズムは、リアルタイムのコミュニティ活動の脈動を捉え、各メンバーの貢献度を即座に可視化します。",
    metadata: { version: "1.0", author: "Team Beta" }
  },
  {
    resultId: 3,
    name: "Collaboration Mapper",
    description: "ネットワークグラフを活用し、メンバー間の連携パターンとその相互作用を明確にすることで、より強固なコラボレーション環境を構築します。",
    metadata: { version: "1.0", author: "Team Gamma" }
  }
];

// -----------------------------------------------------------------------------
// Sample graph data with enriched nodes, edges, and graph-level metadata
// -----------------------------------------------------------------------------
const defaultGraphDataArr: GraphData[] = [
  // Graph for "Too Many Yawns"
  {
    resultId: 1,
    nodes: [
      { id: 1, label: "Yawn-A", title: "node 1 tooltip text", role: "contributor", contributionScore: 0.8, lastActive: "2025-02-01T00:00:00Z" },
      { id: 2, label: "Yawn-B", title: "node 2 tooltip text", role: "contributor", contributionScore: 0.6, lastActive: "2025-02-01T00:00:00Z" },
      { id: 3, label: "Yawn-C", title: "node 3 tooltip text", role: "contributor", contributionScore: 0.4, lastActive: "2025-02-01T00:00:00Z" },
      { id: 4, label: "Yawn-D", title: "node 4 tooltip text", role: "contributor", contributionScore: 0.7, lastActive: "2025-02-01T00:00:00Z" },
      { id: 5, label: "Yawn-E", title: "node 5 tooltip text", role: "contributor", contributionScore: 0.3, lastActive: "2025-02-01T00:00:00Z" }
    ],
    edges: [
      { from: 1, to: 2, width: 1, relationshipType: "dependency", timestamp: "2025-02-01T10:00:00Z" },
      { from: 1, to: 3, width: 2, relationshipType: "dependency", timestamp: "2025-02-01T10:01:00Z" },
      { from: 2, to: 4, width: 4, relationshipType: "dependency", timestamp: "2025-02-01T10:02:00Z" },
      { from: 2, to: 5, width: 5, relationshipType: "dependency", timestamp: "2025-02-01T10:03:00Z" }
    ],
    metadata: {
      created: "2025-02-01",
      description: "Graph for 'Too Many Yawns'"
    }
  },
  // Graph for "Community Pulse"
  {
    resultId: 2,
    nodes: [
      { id: 6, label: "Alice", title: "Alice's tooltip", role: "moderator", contributionScore: 0.9, lastActive: "2025-02-02T00:00:00Z" },
      { id: 7, label: "Bob", title: "Bob's tooltip", role: "contributor", contributionScore: 0.7, lastActive: "2025-02-02T00:00:00Z" },
      { id: 8, label: "Charlie", title: "Charlie's tooltip", role: "observer", contributionScore: 0.5, lastActive: "2025-02-02T00:00:00Z" }
    ],
    edges: [
      { from: 6, to: 7, width: 1, relationshipType: "interaction", timestamp: "2025-02-02T11:00:00Z" },
      { from: 7, to: 8, width: 3, relationshipType: "interaction", timestamp: "2025-02-02T11:05:00Z" }
    ],
    metadata: {
      created: "2025-02-02",
      description: "Graph for 'Community Pulse'"
    }
  },
  // Graph for "Collaboration Mapper"
  {
    resultId: 3,
    nodes: [
      { id: 9, label: "Dave", title: "Dave's tooltip", role: "developer", contributionScore: 0.85, lastActive: "2025-02-03T00:00:00Z" },
      { id: 10, label: "Eva", title: "Eva's tooltip", role: "designer", contributionScore: 0.65, lastActive: "2025-02-03T00:00:00Z" },
      { id: 11, label: "Frank", title: "Frank's tooltip", role: "contributor", contributionScore: 0.55, lastActive: "2025-02-03T00:00:00Z" },
      { id: 12, label: "Grace", title: "Grace's tooltip", role: "analyst", contributionScore: 0.45, lastActive: "2025-02-03T00:00:00Z" }
    ],
    edges: [
      { from: 9, to: 10, width: 1, relationshipType: "collaboration", timestamp: "2025-02-03T09:00:00Z" },
      { from: 9, to: 11, width: 2, relationshipType: "collaboration", timestamp: "2025-02-03T09:01:00Z" },
      { from: 11, to: 12, width: 3, relationshipType: "collaboration", timestamp: "2025-02-03T09:02:00Z" }
    ],
    metadata: {
      created: "2025-02-03",
      description: "Graph for 'Collaboration Mapper'"
    }
  }
];

// -----------------------------------------------------------------------------
// Sample distribution data with additional metadata and strategy
// -----------------------------------------------------------------------------
const defaultDistributionDataArr: DistributionData[] = [
  // Distribution for "Too Many Yawns"
  {
    resultId: 1,
    distributionData: [
      { name: "Yawn-A", value: 110 },
      { name: "Yawn-B", value: 50 },
      { name: "Yawn-C", value: 30 },
      { name: "Yawn-D", value: 30 },
      { name: "Yawn-E", value: 10 },
    ],
    strategy: "weighted",
    metadata: { calculatedAt: "2025-02-01T12:00:00Z" }
  },
  // Distribution for "Community Pulse"
  {
    resultId: 2,
    distributionData: [
      { name: "Alice", value: 70 },
      { name: "Bob", value: 90 },
      { name: "Charlie", value: 40 },
    ],
    strategy: "weighted",
    metadata: { calculatedAt: "2025-02-02T12:00:00Z" }
  },
  // Distribution for "Collaboration Mapper"
  {
    resultId: 3,
    distributionData: [
      { name: "Dave", value: 80 },
      { name: "Eva", value: 60 },
      { name: "Frank", value: 50 },
      { name: "Grace", value: 30 },
    ],
    strategy: "weighted",
    metadata: { calculatedAt: "2025-02-03T12:00:00Z" }
  }
];

const DependenciesDataContext = createContext<DependenciesDataContextProps | undefined>(undefined);

export const DependenciesDataProvider = ({ children }: { children: ReactNode }) => {
  const [descriptionDataArr, setDescriptionDataArr] = useState<DescriptionData[]>(defaultDescriptionDataArr);
  const [graphDataArr, setGraphDataArr] = useState<GraphData[]>(defaultGraphDataArr);
  const [distributionDataArr, setDistributionDataArr] = useState<DistributionData[]>(defaultDistributionDataArr);

  return (
    <DependenciesDataContext.Provider value={{
      descriptionDataArr,
      setDescriptionDataArr,
      graphDataArr,
      setGraphDataArr,
      distributionDataArr,
      setDistributionDataArr
    }}>
      {children}
    </DependenciesDataContext.Provider>
  );
};

export const useDependenciesData = () => {
  const context = useContext(DependenciesDataContext);
  if (!context) {
    throw new Error("useDependenciesData must be used within a DependenciesDataProvider");
  }
  return context;
};

// -------------------------------------------------------------------------
// Inference Model (Fund Distribution Calculation)
// This function calculates the distribution of a given total budget among members 
// based on each member's contributionScore from the DependenciesGraph.
/*
  Explanation:
  - The function `calculateDistribution` takes three parameters:
      1. `graph`: The DependenciesGraph that contains an array of nodes.
      2. `totalBudget`: The overall amount (e.g., 10,000 USDC) to be distributed.
      3. `distributionConcept`: A description of the distribution method (here, weighted by contributionScore).
  
  - It calculates the sum of all `contributionScore` values.
  - For each node, it computes the proportion of the total budget that the node should receive.
  - The result is an object where the keys are the member names (labels) and the values are the allocated amounts.
*/
// -------------------------------------------------------------------------
export const calculateDistribution = (
  graph: GraphData,
  totalBudget: number,
  distributionConcept: string
): { [key: string]: number } => {

  const totalScore = graph.nodes.reduce((acc, node) => acc + (node.contributionScore || 0), 0);

  const distribution: { [key: string]: number } = {};
  graph.nodes.forEach((node) => {
    const score = node.contributionScore || 0;
    distribution[node.label] = totalScore > 0 ? (score / totalScore) * totalBudget : 0;
  });

  return distribution;
};
