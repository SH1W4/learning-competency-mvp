/**
 * Domain model for the M2 vertical slice (evidence → AI → human review).
 * Source of truth for semantics: docs/product/USE_CASE.md and docs/architecture/EVIDENCE_PIPELINE.md.
 */

export type CriterionId = "C1" | "C2" | "C3" | "C4";
export type ActivityId = "A1" | "A2" | "A3" | "A4";

/** The four evidence classes accepted by the MVP (USE_CASE.md §4). */
export type EvidenceType = "briefing" | "analysis_artifact" | "analysis_result" | "communication";

/** Trust model (EVIDENCE_PIPELINE.md). N4 requires an authenticated external mechanism — not produced by M2. */
export type TrustLevel = "N1_SELF_DECLARED" | "N2_EVIDENCE_PRESENTED" | "N3_EVIDENCE_ANALYZED" | "N4_SOURCE_VERIFIED";

/** Development states for the vertical slice (USE_CASE.md §6). */
export type CompetencyStateValue = "NOT_STARTED" | "IN_DEVELOPMENT" | "UNDER_REVIEW" | "DEMONSTRATED";

/** Where a piece of information came from. Every important field must answer this. */
export type Origin = "evidence" | "ai" | "reviewer" | "consensus" | "system";

export interface Criterion {
  id: CriterionId;
  title: string;
  observables: string[];
}

export interface Competency {
  id: string;
  statement: string;
  criteria: Criterion[];
}

export interface Activity {
  id: ActivityId;
  title: string;
  objective: string;
  expectedEvidence: EvidenceType[];
  criteria: CriterionId[];
}

export interface Trail {
  id: string;
  title: string;
  competencyId: string;
  activities: Activity[];
}

export type ContentFormat = "markdown" | "text" | "ipynb" | "csv" | "url";

/** What a person submits (input to M2.1). */
export interface EvidenceSubmission {
  type: EvidenceType;
  activityId: ActivityId;
  submittedBy: string;
  /** Where the evidence came from (file path, repo URL, upload id…). */
  sourceRef: string;
  format: ContentFormat;
  /** Raw content. Stays off-chain. */
  content: string;
  /** Other evidence this one depends on (e.g. a result → the notebook that produced it). */
  relatedEvidenceIds?: string[];
  submittedAt?: string;
  synthetic?: boolean;
}

export interface Provenance {
  sourceRef: string;
  submittedBy: string;
  submittedAt: string;
  activityId: ActivityId;
  /** sha256 of the raw content — lets anyone check later that the evidence was not altered. */
  contentHash: string;
  ingestedAt: string;
  synthetic: boolean;
}

/** Evidence after ingestion (M2.1). Required metadata per USE_CASE.md §4. */
export interface Evidence {
  evidence_id: string;
  type: EvidenceType;
  source_ref: string;
  activity_id: ActivityId;
  submitted_by: string;
  submitted_at: string;
  content_ref: string;
  format: ContentFormat;
  content: string;
  related_evidence_ids: string[];
  trust_level: TrustLevel;
  provenance: Provenance;
}

/** Pointer into the original evidence, so extracted values can be traced back (M2.2). */
export interface SourceLocator {
  evidence_id: string;
  /** e.g. "line:3", "cell:2", "section:Limitações". */
  locator: string;
  excerpt: string;
}

export interface ExtractedField {
  name: string;
  value: string | number | boolean | string[];
  origin: "evidence";
  source: SourceLocator;
}

/** Stable internal representation of the evidence (normalize step). */
export interface NormalizedEvidence {
  evidence_id: string;
  type: EvidenceType;
  segments: Array<{ locator: string; kind: "heading" | "text" | "code" | "table" | "output"; text: string }>;
}

export interface ExtractionResult {
  evidence_id: string;
  type: EvidenceType;
  fields: ExtractedField[];
  /** Things the extractor looked for and did not find — observable absence, not a judgment. */
  missing: string[];
}

export type SignalSupport = "supports" | "partially_supports" | "does_not_support";

export interface EvidenceRef {
  evidence_id: string;
  /** Extracted field name the signal relies on (optional but encouraged). */
  field?: string;
}

/** Reviewer actions (USE_CASE.md §5). */
export type ReviewAction = "accept" | "correct" | "reject" | "request_more_evidence";

export interface ReviewDecision {
  signal_id: string;
  criterion_id: CriterionId;
  action: ReviewAction;
  /** Required for "correct": the reviewer's own support assessment. */
  corrected_support?: SignalSupport;
  /** Required for reject / request_more_evidence / correct. */
  note?: string;
  /** Evidence the reviewer relied on. Required when the final assessment is "supports". */
  evidence_refs?: EvidenceRef[];
}

export interface Reviewer {
  id: string;
  name: string;
  role: string;
}

export interface ReviewRecord {
  review_id: string;
  reviewer: Reviewer;
  reviewed_at: string;
  interpretation_id: string;
  decisions: ReviewDecision[];
  /** Explicit confirmation required to move to DEMONSTRATED (USE_CASE.md §6). */
  confirm_demonstrated: boolean;
  summary_note?: string;
}

export interface StateTransition {
  from: CompetencyStateValue;
  to: CompetencyStateValue;
  at: string;
  by: Origin;
  actor: string;
  reason: string;
}

export interface CompetencyState {
  subject: string;
  competency_id: string;
  value: CompetencyStateValue;
  history: StateTransition[];
}
