// Metadata for description data
export type DescriptionMetadata = {
  version?: string;
  author?: string;
};

// Enhanced description data type
export type DescriptionData = {
  resultId: number;
  name: string;
  description: string;
  metadata?: DescriptionMetadata;
};

// Enhanced graph node type with additional metadata fields
export type GraphNode = {
  id: number;
  label: string;
  title: string;
  role?: string;
  contributionScore?: number;  // A score between 0 and 1 (for example)
  lastActive?: string;         // ISO date string (e.g., "2025-02-01T00:00:00Z")
};

// Enhanced graph edge type with additional metadata fields
export type GraphEdge = {
  from: number;
  to: number;
  width: number;
  relationshipType?: string;
  timestamp?: string; // ISO date string
};

// Graph-level metadata type
export type GraphMetadata = {
  created?: string;      // e.g., "2025-02-01"
  description?: string;
};

// Enhanced graph data type that includes nodes, edges, and metadata
export type GraphData = {
  resultId: number;
  nodes: GraphNode[];
  edges: GraphEdge[];
  metadata?: GraphMetadata;
};

// Distribution data item type (each member's distribution)
export type DistributionDataItem = {
  name: string;
  value: number;
};

// Distribution metadata type
export type DistributionMetadata = {
  calculatedAt?: string; // ISO date string
};

// Enhanced distribution data type with strategy and metadata
export type DistributionData = {
  resultId: number;
  distributionData: DistributionDataItem[];
  strategy?: string; // e.g., "weighted", "equal", etc.
  metadata?: DistributionMetadata;
};

// Bundle of all dependencies data
export type DependenciesData = {
  descriptionDataArr: DescriptionData[];
  graphDataArr: GraphData[];
  distributionDataArr: DistributionData[];
};
